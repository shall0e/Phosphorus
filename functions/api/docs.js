export async function onRequest(context) {

    fetch('https://shall0e.gitbook.io/ankor')
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Get the response as plain text
        })
        .then(html => {
            console.log(html); // Log the HTML content
        })
        .catch(error => {
            console.error('Error fetching the HTML page:', error);
        });

    return new Response(response, {headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }})
}
  //aaaaa