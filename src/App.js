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
