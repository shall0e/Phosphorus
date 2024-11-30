export async function onRequest(context) {
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    let response;
    if ((context.request.url).includes("?")) {
        response = await (await fetch("https://rers.shall0e.workers.dev/?"+(context.request.url).split("?")[1])).text()
    } else {
        response = await (await fetch("https://rers.shall0e.workers.dev/")).text()
    }

    return new Response(response)

}
  //aaaa