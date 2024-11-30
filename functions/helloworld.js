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

    if (!isJsonString(await response.text())) {
        return new Response(await (response.text()),{headers: {"Content-Type": "text/plain"}})
    } else {
        return new Response(JSON.stringify(await (response.json())),{headers: {"Content-Type": "application/json"}})
    }


}
  //aaaa