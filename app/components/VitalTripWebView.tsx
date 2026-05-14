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

// Injects Apple Sign In button into the login page DOM after Google button
const APPLE_SIGN_IN_BUTTON_SCRIPT = `
(function() {
  if (document.getElementById('rn-apple-signin')) return;

  var interval = setInterval(function() {
    var buttons = document.querySelectorAll('button');
    var googleBtn = null;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].textContent && buttons[i].textContent.trim().includes('Google Auth')) {
        googleBtn = buttons[i];
        break;
      }
    }

    if (!googleBtn) return;
    clearInterval(interval);

    var btn = document.createElement('button');
    btn.id = 'rn-apple-signin';
    btn.style.cssText = [
      'display:flex',
      'width:100%',
      'align-items:center',
      'justify-content:center',
      'gap:8px',
      'border-radius:6px',
      'background:#000',
      'padding:12px',
      'font-weight:600',
      'color:#fff',
      'border:none',
      'cursor:pointer',
      'font-size:15px',
      'font-family:inherit',
    ].join(';');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-127.4C46 790.8 0 663.4 0 541.2c0-204.4 132.4-312.4 262.1-312.4 60.5 0 121.5 37.4 159.9 37.4 38.3 0 108.9-40.8 177.7-40.8 10.3 0 32.7 2.6 49.3 11.7zm-155.1-174C499.3 22.8 433.5 0 371.5 0c-8.3 0-16.6.6-24.3 1.9-1.3 9-2 18-2 26.9 0 60.5 25.1 119.9 68.1 157.6 42.8 37.4 99.7 60.5 162.1 60.5 6.4 0 13.5-.6 19.9-1.3-1.9-61.8-25.1-118.7-72.4-161.7z"/></svg> Sign in with Apple';
    btn.onclick = function(e) {
      e.preventDefault();
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'APPLE_SIGN_IN' }));
    };

    googleBtn.parentNode && googleBtn.parentNode.insertBefore(btn, googleBtn.nextSibling);
  }, 300);

  setTimeout(function() { clearInterval(interval); }, 10000);
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

  // Inject Apple Sign In button when on login page
  useEffect(() => {
    if (!appleAvailable || !webViewRef.current) return;
    if (!currentUrl.includes('/login')) return;

    webViewRef.current.injectJavaScript(APPLE_SIGN_IN_BUTTON_SCRIPT);
  }, [currentUrl, appleAvailable]);

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
      const url = new URL(result.url);
      const needsProfile = url.searchParams.get('needsProfile');
      if (needsProfile) {
        webViewRef.current?.injectJavaScript(
          `window.location.href = '${WEB_URL}/signup?step=step2'; true;`,
        );
      } else {
        webViewRef.current?.reload();
      }
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
