import useSWR from "swr";

function CallData() {
  const { data } = useSWR("placeholder", () =>
    fetch("https://jsonplaceholder.typicode.com/todos/").then((res) =>
      res.json()
    )
  );
  return data;
}

export default function App() {
  const data = CallData();
  if (!data) return <h1>Loading..</h1>;
  if (data) return <h1>Hello, {data[0].title}</h1>;
}
