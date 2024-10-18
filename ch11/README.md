# 11 클래스

## **11.1 올바른 가시성 변경자 선택하기**

`public`, `private`, `protected` 접근 제한자를 사용해 클래스 멤버의 가시성을 제어합니다.

```tsx
class Person {
  public name: string;   // 어디서나 접근 가능
  private age: number;    // 클래스 내부에서만 접근 가능
  protected address: string; // 상속받은 클래스에서만 접근 가능

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
}

```

---

## **11.2 메서드 재정의를 명시적으로 정의하기**

`override` 키워드를 사용해 부모 클래스의 메서드를 재정의합니다.

```tsx
class Animal {
  sound() {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  override sound() {
    console.log("Dog barks");
  }
}

const myDog = new Dog();
myDog.sound();  // "Dog barks"

```

---

## **11.3 생성자 및 프로토타입 설명하기**

클래스 생성자는 객체의 초기값을 설정합니다. 모든 클래스 인스턴스는 프로토타입을 공유합니다.

```tsx
class Person {
  constructor(public name: string) {}
}

const person1 = new Person("Alice");
console.log(person1.name);  // "Alice"
console.log(Object.getPrototypeOf(person1) === Person.prototype);  // true

```

---

## **11.4 클래스에서 제네릭 사용하기**

클래스에 제네릭을 사용해 다양한 타입을 처리할 수 있습니다.

```tsx
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(123);
console.log(numberBox.getValue());  // 123

```

---

## **11.5 클래스나 네임스페이스 사용 시기 결정하기**

클래스는 객체 생성과 관리에, 네임스페이스는 모듈화를 위해 사용합니다.

```tsx
namespace MathUtils {
  export function add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtils.add(2, 3));  // 5

```

- **설명**: 네임스페이스는 전역 객체 충돌을 방지합니다.

---

## **11.6 정적 클래스 작성하기**

정적 멤버는 클래스 인스턴스가 아닌 클래스 자체에 속합니다.

```tsx
class MathUtils {
  static PI = 3.14;

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

console.log(MathUtils.circleArea(5));  // 78.5

```

---

## **11.7 엄격한 프로퍼티 초기화 작업하기**

`strictPropertyInitialization`를 활성화하면 모든 프로퍼티를 초기화해야 합니다.

```tsx
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

```

---

## **11.8 클래스에서 `this` 형식으로 작업하기**

`this`의 타입을 명시해 메서드가 정확하게 타이핑됩니다.

```tsx
class Counter {
  count = 0;

  increment(): this {
    this.count++;
    return this;
  }
}

const counter = new Counter();
counter.increment().increment();
console.log(counter.count);  // 2

```

---

## **11.9 데코레이터 구현하기**

데코레이터를 사용해 클래스나 메서드의 동작을 수정할 수 있습니다.

```tsx
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Person {
  @Log
  greet(message: string) {
    console.log(`Hello, ${message}`);
  }
}

const person = new Person();
person.greet("world");  // Logs method call and message

```

---

이 예제들을 통해 **타입스크립트 클래스**와 관련된 다양한 기능을 실습해보세요. 각 개념은 실무에서 객체 지향 프로그래밍을 활용해 모듈성과 재사용성을 높이는 데 유용합니다.