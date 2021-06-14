export default async function fetchData(...args) {
  const res = await fetch(...args)
  return await res.json()
}
