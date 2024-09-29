
// Get the element with ID 'output'
var phoneNumber = document.getElementById('output');

// Check if the element exists
if (phoneNumber) {
    // Get the text content of the paragraph
    var text = phoneNumber.textContent;

    // Store the phone number in localStorage (or sessionStorage)
    localStorage.setItem('phoneNumber', text);
} else {
    console.error('Element with ID "output" not found.');
}
