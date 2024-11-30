export async function onRequest(context) {
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    let response = await (await fetch("https://rers.shall0e.workers.dev/"+(context.request.url).split("?")[1])).text()
    return new Response(response)

}
  //aaaa