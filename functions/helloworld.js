export function onRequest(context) {
    return new Response(JSON.stringify(context.env.RERSapi.fetch(context.request)))
  }
  //aaaa