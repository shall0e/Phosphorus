export async function onRequest(context) {
    let response = (await fetch("https://rers.shall0e.workers.dev/?"+(context.request.url).split("?")[1])).text()
    return new Response(JSON.stringify(await response))
}
  //aaaa