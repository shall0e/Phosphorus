function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export async function onRequest(context) {
    let response = await (await fetch("https://rers.shall0e.workers.dev/?"+((context.request.url).split("?"))[1])).json()

    if (isJsonString(response)) {
        return new Response(JSON.stringify(response), {
            headers: {'Content-Type': "application/json"}
        })
    }
    return new Response(response, {
        headers: {'Content-Type': "text/plain"}
    })
}
  //aaaa