import { notFound } from "next/navigation";

async function getData() {
  const res = await fetch(`${process.env.API_URL}posts`, { cache:'no-store'})
  if (!res.ok) return notFound()
    const data = await res.json();
    return data.slice(0, 12)
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="bg-zinc-700 flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col text-white z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-3xl text-white">Hello Docker</h1>
        <ul className="mt-7">
          {data.length === 0 && <h2>Não foi possível carregar os dados</h2>}
          {data && data.map((item: any) => (
            <li key={item.id} className="mb-5">
              <h2>{item.title}</h2>
              <p>User ID: {item.userId}</p>
              <p>ID: {item.id}</p>
              <p>Description: {item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
