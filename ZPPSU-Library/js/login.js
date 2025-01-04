function login() {
    var form = document.querySelector("form");
    var formData = new FormData(form);
    var loadingOverlay = document.getElementById("loadingOverlay");

    // Show loading overlay
    loadingOverlay.style.display = "block";

    fetch(form.action, {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading overlay after response
        loadingOverlay.style.display = "none";

        if (data.success) {
            // Redirect or perform further actions after successful login
            window.location.href = "index.html"; // Example redirection
        } else {
            // Show popup modal for invalid credentials
            var popupOverlay = document.getElementById("popupOverlay");
            popupOverlay.style.display = "block";
        }
    })
    .catch(error => {
        // Hide loading overlay on error
        loadingOverlay.style.display = "none";
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });

    return false; // Prevent form submission
}

function closePopup() {
    var popupOverlay = document.getElementById("popupOverlay");
    popupOverlay.style.display = "none";
}

if (sessionStorage.getItem('loggedOut')) {
    // Clear the flag
    sessionStorage.removeItem('loggedOut');

    // Clear browsing history
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}