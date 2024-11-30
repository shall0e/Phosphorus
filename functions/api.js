function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

export async function onRequest(context) {
    let search = ((context.request.url).split("?"))[1]
    response = await (await fetch("https://rers.shall0e.workers.dev/?"+search)).text()
    return new Response(response)

    if (isJsonString(response)) {
        return new Response(JSON.stringify(JSON.parse(response)), {
            headers: {'Content-Type': "text/plain"}
        })
    } else {
        return new Response(response, {
            headers: {'Content-Type': "text/plain"}
        })
    }
}
  //aaaa