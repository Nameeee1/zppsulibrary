const scriptURL = 'https://script.google.com/macros/s/AKfycbx98AU-pUGwGp13XTAnYTVe6J33n16p8ktOenHSX5jUUitFaUE9vCKvmArSLPmGYZA8/exec';

fetch(scriptURL + '?action=getUsers')
    .then(response => response.json())
    .then(data => {
        const courses = [...new Set(data.rows.map(row => row.Course))];
        const courseFilter = document.getElementById('course-filter');
        
        // Populate the course filter select element
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            courseFilter.appendChild(option);
        });
        
        const tbody = document.getElementById('userTable').querySelector('tbody');
        
        function populateTable() {
            tbody.innerHTML = ''; // Clear existing rows
            const selectedCourse = courseFilter.value;
            data.rows.forEach(user => {
                if (selectedCourse === 'all' || user.Course === selectedCourse) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.Name}</td>
                        <td>${user.Department}</td>
                        <td>${user.Course}</td>
                        <td>${user.Email}</td>
                        <td>${user['Student-Number']}</td>
                        <td class="status">${user.Status}</td>
                        <td>
                            <button onclick="updateStatus('${user['Student-Number']}', 'Approved', this)">Approve</button>
                            <button onclick="updateStatus('${user['Student-Number']}', 'Declined', this)">Decline</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                }
            });
        }

        // Populate table initially
        populateTable();

        // Add event listener to course filter
        courseFilter.addEventListener('change', populateTable);
    });

function updateStatus(studentNumber, status, button) {
    fetch(scriptURL, {
        method: 'POST',
        body: new URLSearchParams({ studentNumber, status, action: 'updateStatus' })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            alert('Status updated successfully!');
            const row = button.closest('tr');
            row.querySelector('.status').textContent = status;
        } else {
            alert('Error updating status.');
        }
    });
}
document.getElementById('searchInput').addEventListener('input', function() {
    search();
});
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        search();
    }
});
function search() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.getElementById('userTable').querySelectorAll('tbody tr');

    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const studentNumber = row.querySelector('td:nth-child(4)').textContent.toLowerCase();

        if (name.includes(searchInput) || studentNumber.includes(searchInput)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
