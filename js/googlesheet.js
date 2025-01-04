const scriptURL = 'https://script.google.com/macros/s/AKfycbyzrZD5LScnvOjsa9VD5Py1OcyqVRp0Vzs_8Qn0kpfRgEI_ki_iSamW-mS2t_fTo5CE/exec';
const form = document.forms['registration-form'];

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const studentNumber = formData.get('Student-Number');
    if (!studentNumber) {
        alert('Student number is required.');
        return;
    }

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            if (response.ok) {
                alert("Thank you! Registration Successful");
                // Fetch status and redirect to confirmation page
                fetchStatusAndRedirect(studentNumber);
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => console.error('Error!', error.message));
});

function fetchStatusAndRedirect(studentNumber) {
    const statusURL = `https://script.google.com/macros/s/AKfycbyzrZD5LScnvOjsa9VD5Py1OcyqVRp0Vzs_8Qn0kpfRgEI_ki_iSamW-mS2t_fTo5CE/exec?action=getStatus&studentNumber=${studentNumber}`;
    
    fetch(statusURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => {
            const status = data.status;
            if (status.toLowerCase() === 'approved') {
                // Change status to "approved" when data is approved
                status = 'Approved';
            }
            window.location.href = `confirmation.html?studentNumber=${studentNumber}&status=${status}`;
        })
        .catch(error => console.error('Error!', error.message));
}
