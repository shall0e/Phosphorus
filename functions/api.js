export async function onRequest(context) {
    response = await (await fetch("https://rers.shall0e.workers.dev/")).text()
    return new Response(response)
}
  //aaaa