# 10 타입스크립트 및 반응

타입스크립트와 리액트(React.js)를 사용해 다양한 고급 기능을 구현하는 방법에 대한 설명과 코드 예제입니다.

## **10.1 프록시 컴포넌트 작성하기**

프록시 컴포넌트는 전달된 컴포넌트를 감싸는 역할을 합니다. 주로 로깅, 성능 측정 등 부가 기능을 추가할 때 유용합니다.

```tsx
import React from 'react';

type ProxyProps<T> = T & { forwardedRef: React.Ref<any> };

function withLogging<T>(Component: React.ComponentType<T>) {
  return React.forwardRef<any, T>((props, ref) => {
    console.log('Rendering with props:', props);
    return <Component {...props} ref={ref} />;
  });
}

const Input = React.forwardRef<HTMLInputElement, { placeholder: string }>(
  (props, ref) => <input {...props} ref={ref} />
);

const LoggedInput = withLogging(Input);

```

---

## **10.2 제어 컴포넌트 구현하기**

제어 컴포넌트는 입력 값이 컴포넌트의 상태에 의해 관리됩니다.

```tsx
const ControlledInput: React.FC = () => {
  const [value, setValue] = React.useState("");

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type something..."
    />
  );
};

```

- **설명**: 사용자의 입력이 `value` 상태를 통해 제어됩니다.

---

## **10.3 사용자 정의 훅 형식 정의하기**

타입스크립트를 사용하면 사용자 정의 훅의 반환값과 매개변수에 대한 타입을 명확히 정의할 수 있습니다.

```tsx
function useCounter(initialValue: number = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  return { count, increment, decrement };
}

const Counter: React.FC = () => {
  const { count, increment, decrement } = useCounter(10);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

```

---

## **10.4 제네릭 `forwardRef` 컴포넌트 형식화하기**

`forwardRef`는 제네릭을 사용해 다양한 DOM 요소에 대한 참조를 전달할 수 있도록 타입을 유연하게 설정합니다.

```tsx
const Input = React.forwardRef<HTMLInputElement, { placeholder: string }>(
  (props, ref) => <input {...props} ref={ref} />
);

```

---

## **10.5 컨텍스트 API에 형식 제공하기**

`createContext`를 사용해 컨텍스트 값의 타입을 정의합니다.

```tsx
interface User {
  name: string;
  age: number;
}

const UserContext = React.createContext<User | null>(null);

const UserProvider: React.FC = ({ children }) => {
  const user = { name: "Alice", age: 25 };
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const UserConsumer: React.FC = () => {
  const user = React.useContext(UserContext);
  return <p>{user ? `Hello, ${user.name}` : "No user"}</p>;
};

```

---

## **10.6 고차 컴포넌트(HOC) 형식화하기**

고차 컴포넌트(HOC)는 컴포넌트를 감싸서 추가 기능을 제공합니다.

```tsx
function withTheme<T>(Component: React.ComponentType<T>) {
  return (props: T) => <Component {...props} theme="dark" />;
}

const ThemedComponent = withTheme((props: { theme: string }) => (
  <div>{`Theme: ${props.theme}`}</div>
));

```

---

## **10.7 리액트의 합성 이벤트 시스템에서 콜백 형식화하기**

합성 이벤트의 타입을 명확히 정의해 콜백을 처리합니다.

```tsx
const Button: React.FC = () => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event.currentTarget);
  };

  return <button onClick={handleClick}>Click Me</button>;
};

```

---

## **10.8 다형성 컴포넌트 형식화하기**

다형성 컴포넌트는 다양한 요소 타입을 처리할 수 있습니다.

```tsx
type PolymorphicButtonProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
};

function PolymorphicButton<C extends React.ElementType = 'button'>({
  as,
  children,
  ...rest
}: PolymorphicButtonProps<C> & React.ComponentPropsWithoutRef<C>) {
  const Component = as || 'button';
  return <Component {...rest}>{children}</Component>;
}

const Example = () => (
  <PolymorphicButton as="a" href="#">
    Link Button
  </PolymorphicButton>
);

```

- **설명**: 이 컴포넌트는 다양한 HTML 태그로 렌더링될 수 있습니다.

---

이 예제들은 리액트에서 **타입스크립트를 사용해 컴포넌트를 안전하고 유연하게 설계**하는 방법을 보여줍니다. 다양한 패턴을 활용해 실무에서 확장 가능한 코드를 작성해보세요.