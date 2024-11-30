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

    let response;
    if (search.includes("?")) {
        response = await (await fetch("https://rers.shall0e.workers.dev/?"+search)).text()
    } else {
        response = await (await fetch("https://rers.shall0e.workers.dev/")).text()
    }
    
    return new Response(JSON.stringify(JSON.parse(response)), {
        headers: {'Content-Type': "application/json"}
    })
}
  //aaaa