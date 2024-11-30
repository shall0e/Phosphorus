export async function onRequest(context) {
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    if ((context.request.url).includes("?")) {
        search = ("?"+((context.request.url).split("?"))[1]);
    } else {
        search = "";
    }
    let search = ("https://rers.shall0e.workers.dev/"+search)
    let response = await (await fetch(search)).text()
    return new Response(response)
    
    if (isJsonString(response)) {
        return new Response(JSON.stringify(JSON.parse(response)), {
            headers: {'Content-Type': "application/json"}
        })
    } else {
        return new Response(response, {
            headers: {'Content-Type': "text/plain"}
        })
    }
}