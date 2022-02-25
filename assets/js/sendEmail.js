function sendMail(contactForm) {
    emailjs.send('rosie-resume', 'rosie-resume', {
        // parameter names set in the html file
        'from_name': contactForm.name.value,
        'from_email': contactForm.emailaddress.value,
        'project_request': contactForm.projectsummary.value
    })
    .then(
        function(response) {
            console.log('SUCCESS', response);
            formSubmittedMessage();
        },
        function(error) {
            console.log('FAILED', error);
        }
    );
    return false;  // To block from loading a new page
}


function formSubmittedMessage() {
    let message = `<div class="text-center">
                        <h2>Thanks, your message has been sent</h2>
                   </div>`;
    document.getElementById("form").innerHTML = message;
}