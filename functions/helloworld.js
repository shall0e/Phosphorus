export function onRequest(context) {
    return new Response(JSON.stringify(context.env.RERSapi.fetch("https://rers.shall0e.workers.dev/")))
}
  //aaaa