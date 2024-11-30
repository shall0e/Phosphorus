export async function onRequest(context) {
    let response = (await fetch("https://rers.shall0e.workers.dev/"+context.request.url)).text()
    return new Response(context.request.url)
    // return new Response(JSON.stringify(await response))
}
  //aaaa