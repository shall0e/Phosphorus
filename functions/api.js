function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

export async function onRequest(context) {
    response = await (await fetch("https://rers.shall0e.workers.dev/"+search)).text()
    return new Response(response)
}
  //aaaa