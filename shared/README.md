# @vitaltrip/shared

VitalTrip 모노레포의 공용 컴포넌트 및 훅을 제공하는 패키지이다.

## 사용법

### useOverlay Hook

모달, 팝업 등 오버레이 UI를 쉽게 구현할 수 있는 훅이다.

```tsx
import { useOverlay } from '@vitaltrip/shared';

function MyComponent() {
  const overlay = useOverlay();

  const handleOpenModal = () => {
    overlay.open();
  };

  return (
    <div>
      <button onClick={handleOpenModal}>모달 열기</button>

      {overlay.render(
        <div>
          <h2>모달 제목</h2>
          <p>모달 내용입니다.</p>
          <button onClick={overlay.close}>닫기</button>
        </div>
      )}
    </div>
  );
}
```

### API

```tsx
const overlay = useOverlay(options);
```

#### Options

- `container?: Element | null` - 포털이 렌더링될 컨테이너 (기본값: document.body)
- `closeOnEscape?: boolean` - ESC 키로 닫기 활성화 (기본값: true)

#### Returns

- `isOpen: boolean` - 오버레이 열림 상태
- `open()` - 오버레이 열기
- `close()` - 오버레이 닫기
- `toggle()` - 오버레이 토글
- `render(node: ReactNode)` - 오버레이 렌더링

### 기능

- ESC 키로 닫기
- 배경 클릭으로 닫기
- 접근성 지원 (aria-modal, role="dialog")
- SSR 지원
- 포털 기반 렌더링

## 설치

이 패키지는 모노레포 내부에서만 사용된다.

```json
{
  "dependencies": {
    "@vitaltrip/shared": "workspace:*"
  }
}
```
