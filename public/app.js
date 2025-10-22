console.log("JS file is connected!");


// -----------------------------
//  GET EXISTING DATA ON PAGE LOAD
// -----------------------------
////Route 3 CLIENT SIDE/////
//Step 6 use fetch() to make a GET request for the data. User opens the webpage.
fetch('/data')
  .then(response => response.json())
  .then(allData => {
    console.log(allData);

    //step 7 add the data to the page. User sees existing messages displayed on the page.
    let feed = document.getElementById('feed');
    for (let i = 0; i < allData.length; i++) {
      let item = allData[i];
      let p = document.createElement('p');
      p.innerHTML = `<strong>${item.emotion}</strong>: ${item.response}`;
      feed.appendChild(p);
    }
  })
  .catch(error => console.log(error));



//step 27 check the fetch on window load to make sure the messages are still displaying

    

// -----------------------------
//  POST NEW DATA
// -----------------------------
//Step 8 add an event listener to the button
let submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', () => {
  console.log('Button clicked!');

  //step 9 in the callback funtion for the button event listener, grab the input values and create an object to store the values

  let emotionInput = document.getElementById('emotion-input');
  let responseInput = document.getElementById('response-input');

  let currentEmotion = emotionInput.value;
  let currentResponse = responseInput.value;

  let entry = {
    emotion: currentEmotion,
    response: currentResponse
  };

  console.log(entry);

  //Step 10 convert the object into JSON using  JSON.stringify()

  let entryJSON = JSON.stringify(entry);
  console.log(entryJSON);

  //Step 11 When the user clicks the Submit button, the client uses fetch('/new-data') to send a POST request to the server’s Route 2, which is defined as app.post('/new-data'）.Inside the callback funtion use fetch() to make a POST request to the server. 

  fetch('/new-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    //Step 12 attach the data to the body of the fetch() request this will send the data to the server. 
    body: entryJSON
  })
    .then(response => response.json())
    // step 18 receive a response to the fetch() request from the server
    .then(data => {
      console.log('Did this work?');
      console.log(data);
    })
    .catch(error => console.log(error));

    //Step 19 add the new message data to the page and clear the input box

  // Display on page
  let feed = document.getElementById('feed');
  let p = document.createElement('p');
  p.innerHTML = `<strong>${currentEmotion}</strong>: ${currentResponse}`;
  feed.appendChild(p);

  // Clear input fields
  emotionInput.value = '';
  responseInput.value = '';
});
