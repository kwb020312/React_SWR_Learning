## SWR

해당 문서는 SWR의 공식문서를 참고하여 만들어졌음을 미리 밝힙니다

<a href="https://swr.vercel.app/">SWR 공식문서 바로가기</a>

<img src="gitImages\SWR_Main_Image.jpg">

공식문서 맨 위에서도 볼 수 있듯이 데이터를 가져오기 위한 React Hooks Library이다. 해당 Repository에서는 React-Query와의 차별점과 어떠한 장점을 가지고있는지 알아보려고 한다.

## useSWR

SWR에서는 useSWR이라는 함수를 가장 기본 함수로 두고있는데,

```javascript
import useSWR from "swr";

function App() {
  const { data, error } = useSWR("key", callback);
}
```

위처럼 처리하여 callback함수의 결과를 data 와 error변수에 각각 담을 수 있으며 key는 각각의 데이터를 구별하는 식별자의 용도로 사용된다.

<img src="gitImages\Advantages.jpg">

위 사진은 공식문서에서 장점으로 소개하는것이니 한번 보는게 좋을 것 같다

```javascript
import useSWR from "swr";

export default function App() {
  const { data, error } = useSWR("placeholder", () =>
    fetch("https://jsonplaceholder.typicode.com/todos/").then((res) =>
      res.json()
    )
  );
  if (!data) return <h1>Loading..</h1>;
  if (data) return <h1>Hello, {data[0].title}</h1>;
}
```

가장 기본적인 사용의 예제이며 useSWR의 상태는 '로딩', '완료', '오류' 세가지로 나뉜다.

위의 코드의 출력결과는 아래와 같다

<img src="gitImages\First_Fetch.jpg">

## 재사용성

하지만 렌더링 될 때 마다 이를 호출한다면 fetch함수를 기본으로 쓰는 것과 다를바가 없다. 오히려 쓰지않는편이 불필요한 Library를 불러오지 않기 때문에 시간으로나, 비용으로써 절약될 수 있다. 하지만 재사용이 되는순간 장점이 나오는데,

```javascript
function retry() {
  const { data, error } = useSWR("key", callback);

  return {
    data,
    isError: error,
  };
}
```

해당 함수처럼 따로 뺴놓은 상태에서 호출만 한다면

```javascript
// 다른 컴포넌트
function Content() {
  const { data, isError } = retry();
}
```

API는 반복해서 불리지않고 캐싱되어 단 1개의 API요청만 들어갈 뿐 더 이상 불필요한 자료낭비를 하지않는다.

## API 옵션

API옵션의 종류는 너무 다양해서 <a href="https://swr.vercel.app/docs/options">공식문서</a>의 링크를 참조하는것이 좋다.

<img src="gitImages\API_Option.jpg">

## SWRConfig

```javascript
import { SWRConfig } from "swr";

<SWRConfig value={options}>
  <Component />
</SWRConfig>;
```

SWRConfig를 사용하여 위 처럼 등록해놓으면 어디서든지 전역적인 옵션을 적용시킬 수 있다.

## 실시간 동기화

데이터가 달라진 두 페이지가 있다면 실시간으로 처리해야하는 웹페이지 기능상 문제가 생길것이다.

<img src="gitImages\focus_revalidate.gif">
출처: SWR공식문서

페이지에 포커싱하거나 탭간에 전환이 일어나면 SWR은 데이터를 검사하여 동기화시켜준다

<img src="gitImages\interval_revalidate.gif">
출처: SWR공식문서

해당 기능처럼 실시간으로 refresh 해주는 옵션은 직접 지정하여야하는데,

```javascript
useSWR("key", callback, { refreshInterval: 1000 });
```

으로 해결할 수 있다.

## 조건부 fetch

API호출을 하기 전 특정 조건이 아니라면 호출하고싶지 않을 경우가 있을 수 있다. 이 경우에는 useSWR의 첫 번째 인자에 값이 null 이라면 SWR은 요청을 시작하지않는다.

```javascript
// 검색 시작하지 않음
const { data } = useSWR(null);

// shouldFetch값이 false라면 검색 시작하지 않음
const { data } = useSWR(shouldFetch ? callback : null);
```

## 종속

같은 key를 가진 SWR을 호출할 때 콜백함수를 생략하여도 key값으로 구분하기에 다른 데이터에 의존하는 데이터를 효과적으로 가져올 수 있다.

```javascript
const { data1 } = useSWR("api/data1");
const { data2 } = useSWR("api/data2");
```

즉 이렇게 해도 서로 다른 데이터를 잘 가져온다

## key

key를 삽입할 때 주의해야할점이 있는데, 우선 객체를 사용하지 않아야한다.

만약

```javascript
const { data } = useSWR({ val: "hi" }, callback);
```

위 구조로 key를 전달하면 얕은복사를 하기 때문에 매번 다른 값이라 판단하게 되므로 객체를 자제하여야 한다.

또한 첫 번째 인자는 배열의 형태로 여러가지 값을 담을 수 있는데,

```javascript
const { data } = useSWR([val1, val2], callback);
```

위와같은 전달이 가능하다.
