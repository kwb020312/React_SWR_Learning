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
