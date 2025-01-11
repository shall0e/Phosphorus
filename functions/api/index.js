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
    
    if (!isJsonString(response)) {
        return new Response(response, {headers: {
            "Content-Type": "text/plain",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }})
    } else {
        return new Response(response, {headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }})
    }
}
  //aaaaa