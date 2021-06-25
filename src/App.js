import useSWR, { mutate } from "swr";

const fetcher = (url) =>
  fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    res.json()
  );

// export async function getStaticProps() {
//   const staticData = await fetcher();
//   return {
//     props: { staticData },
//   };
// }

function CallData() {
  // console.log(props);
  const { data } = useSWR("placeholder", fetcher, {});
  return data;
}

export default function App() {
  const data = CallData();
  mutate("placeholder", { title: "World !!" }, false);
  if (!data) return <h1>Loading..</h1>;
  if (data) return <h1>Hello, {data.title}</h1>;
}
