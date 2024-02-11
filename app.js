

const momoTokenUrl = 'http://localhost:5000/api/get-momo-token';
const momoRequestToPayUrl = 'http://localhost:5000/api/request-to-pay';
const keys = 'http://localhost:5000/api/keys';

const fixedAmount = parseFloat(document.getElementById('fixedAmount').value);

const apiKey = "868c576672ae4a4ebf69617e5c9dde1f";
const subscriptionKey = "cdb5bdc125c34295ab21436767926991";

// wes submit token here
function initiatePurchase() {
    submitTokenToAPI(apiKey, subscriptionKey);
}

// we called this function on the initiatePurchase
function submitTokenToAPI(apiKey, subscriptionKey) {
    const apiEndpoint = momoTokenUrl;

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            apiKey: apiKey,
            subscriptionKey: subscriptionKey,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            promptForPhoneNumber();
        })
        .catch(error => console.error('Error:', error));
}


function promptForPhoneNumber(fixedAmount) {
    const phoneNumber = prompt("Please enter your phone number:");

    if (phoneNumber !== null) {
        submitPhoneNumberToAPI(phoneNumber, fixedAmount);
    }
}

function submitPhoneNumberToAPI(phoneNumber, fixedAmount) {

    fetch(momoRequestToPayUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            phoneNumber: phoneNumber,
            amount: fixedAmount,
        }),
    })
        .then(response => response.json())
        .then(data => {

            if (data.success) {

                alert("Payment successful! Thank you for your purchase.");
            } else {

                alert("Payment failed. Please try again later.");
            }
        })
        .catch(error => console.error('Error:', error));
}