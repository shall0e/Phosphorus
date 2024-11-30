export async function onRequest(context) {
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    let response = (await fetch("https://rers.shall0e.workers.dev/?"+(context.request.url).split("?")[1]))

    return new Response(await (response.text()),{headers: {"Content-Type": "text/plain"}})

}
  //aaaa