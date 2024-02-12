const momoTokenUrl = 'http://localhost:5000/api/get-momo-token';
const momoRequestToPayUrl = 'http:/localhost:5000/api/request-to-pay';
const keys = 'http://localhost:5000/api/keys';

const fixedAmount = parseFloat(document.getElementById('fixedAmount').value);

const apiUserId = "6f98ed18-9690-4aac-afa6-691267dbce0e";
const apiKey = "e963b0a9cc6a4cccb2a669d619be91ed";
const subscriptionKey = "36a9cea744d74f268f28dc01085bc3be";

// wes submit token here
function initiatePurchase() {
    submitTokenToAPI(apiKey, subscriptionKey, apiUserId);
}

// we called this function on the initiatePurchase
function submitTokenToAPI(apiKey, subscriptionKey, apiUserId) {
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
            apiUserId: apiUserId,
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