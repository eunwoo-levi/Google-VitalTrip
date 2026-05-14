import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView, { WebViewMessageEvent, WebViewNavigation } from 'react-native-webview';

import { APPLE_AUTH_ENDPOINT, WEB_URL } from '@/constants/config';
import { useNativeLocation } from '@/hooks/useNativeLocation';

// Overrides navigator.geolocation before page scripts run
const GEOLOCATION_INJECT_SCRIPT = `
(function() {
  window.__rnWebView = true;

  var geo = {
    getCurrentPosition: function(success, error) {
      if (window.__nativeCoords) {
        success({ coords: window.__nativeCoords, timestamp: Date.now() });
        return;
      }
      window.__geoPendingSuccess = success;
      window.__geoPendingError = error;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'REQUEST_LOCATION' }));
      setTimeout(function() {
        if (window.__geoPendingError) {
          window.__geoPendingError({ code: 1, message: 'Location unavailable' });
          window.__geoPendingSuccess = null;
          window.__geoPendingError = null;
        }
      }, 8000);
    },
    watchPosition: function(success, error) {
      window.__geoWatchCallback = success;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'REQUEST_LOCATION' }));
      return 1;
    },
    clearWatch: function() {
      window.__geoWatchCallback = null;
    },
  };

  try {
    Object.defineProperty(navigator, 'geolocation', {
      get: function() { return geo; },
      configurable: true,
    });
  } catch (e) {}
})();
true;
`;


export default function VitalTripWebView() {
  const webViewRef = useRef<WebView>(null);
  const [currentUrl, setCurrentUrl] = useState(WEB_URL);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [appleAvailable, setAppleAvailable] = useState(false);
  const { coords } = useNativeLocation();

  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync().then(setAppleAvailable);
    }
  }, []);

  // Push native GPS into WebView whenever coords update
  useEffect(() => {
    if (!coords || !webViewRef.current) return;

    const script = `
      window.__nativeCoords = ${JSON.stringify({
        latitude: coords.latitude,
        longitude: coords.longitude,
        accuracy: coords.accuracy,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
      })};
      if (window.__geoPendingSuccess) {
        window.__geoPendingSuccess({ coords: window.__nativeCoords, timestamp: Date.now() });
        window.__geoPendingSuccess = null;
        window.__geoPendingError = null;
      }
      if (window.__geoWatchCallback) {
        window.__geoWatchCallback({ coords: window.__nativeCoords, timestamp: Date.now() });
      }
      true;
    `;
    webViewRef.current.injectJavaScript(script);
  }, [coords]);

  // Android hardware back button
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      webViewRef.current?.goBack();
      return true;
    });
    return () => handler.remove();
  }, []);

  const handleGoogleSignIn = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `${WEB_URL}/api/auth/loginGoogle?source=native`,
      'vitaltrip://',
    );
    if (result.type === 'success') {
      const deepLink = new URL(result.url);
      const params = deepLink.search;
      webViewRef.current?.injectJavaScript(
        `window.location.href = '${WEB_URL}/auth/callback${params}'; true;`,
      );
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Calls /api/auth/apple on the Next.js backend with the Apple identity token.
      // The backend needs to verify the token and create a session.
      const identityToken = JSON.stringify(credential.identityToken);
      const user = JSON.stringify(credential.user);
      const fullName = JSON.stringify(credential.fullName);
      const email = JSON.stringify(credential.email);

      const script = `
        fetch('${APPLE_AUTH_ENDPOINT}', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identityToken: ${identityToken},
            user: ${user},
            fullName: ${fullName},
            email: ${email},
          }),
        })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            if (data.success) window.location.href = '/';
          })
          .catch(console.error);
        true;
      `;
      webViewRef.current?.injectJavaScript(script);
    } catch (error: unknown) {
      if ((error as { code?: string }).code !== 'ERR_CANCELED') {
        console.error('Apple Sign In error:', error);
      }
    }
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(event.nativeEvent.data) as { type: string };

      if (data.type === 'REQUEST_LOCATION' && coords) {
        const script = `
          window.__nativeCoords = ${JSON.stringify({
            latitude: coords.latitude,
            longitude: coords.longitude,
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            speed: coords.speed,
          })};
          if (window.__geoPendingSuccess) {
            window.__geoPendingSuccess({ coords: window.__nativeCoords, timestamp: Date.now() });
            window.__geoPendingSuccess = null;
            window.__geoPendingError = null;
          }
          true;
        `;
        webViewRef.current?.injectJavaScript(script);
      }

      if (data.type === 'APPLE_SIGN_IN') {
        handleAppleSignIn();
      }

      if (data.type === 'GOOGLE_SIGN_IN') {
        handleGoogleSignIn();
      }
    } catch {}
  };

  const handleNavigationChange = (navState: WebViewNavigation) => {
    setCurrentUrl(navState.url);
  };

  if (loadError) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorTitle}>연결할 수 없습니다</Text>
        <Text style={styles.errorMessage}>인터넷 연결을 확인해주세요.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoadError(false);
            webViewRef.current?.reload();
          }}
        >
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <WebView
        ref={webViewRef}
        source={{ uri: WEB_URL }}
        style={styles.webView}
        injectedJavaScriptBeforeContentLoaded={GEOLOCATION_INJECT_SCRIPT}
        onNavigationStateChange={handleNavigationChange}
        onMessage={handleMessage}
        onLoadStart={() => {
          setIsLoading(true);
          setLoadError(false);
        }}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setLoadError(true);
        }}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        allowsBackForwardNavigationGestures={Platform.OS === 'ios'}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        scalesPageToFit={false}
        pullToRefreshEnabled
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#dc2626" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  webView: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
