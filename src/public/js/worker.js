let url;

onmessage = function(e) {
    let json = JSON.parse(e.data);
    if (json.URL) {
        url = json.URL;
    } else {
        postData(url + "/api/waves", json);
    }
};

onerror = function(e) {
    console.log("Worker Error: ", e);
};

// taken from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
      body: JSON.stringify(data),// must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        // 'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json()); // parses response to JSON
  }