  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    var studentNumber = document.getElementById('searchInput').value.trim();
    
    fetch('https://script.google.com/macros/s/AKfycbyss0nzPeU04R4_MT4sC8CXn1LNwotaGIcH9df96FVRwqTEom7vUSBxkZCviQh3JBfU/exec?studentNumber=' + encodeURIComponent(studentNumber))
      .then(response => response.json())
      .then(data => {
        if (data.found) {
          document.getElementById('results').innerHTML = `<p>Name: ${data.name}</p><p>Student Number: ${data.studentNumber}</p>`;
        } else {
          document.getElementById('results').innerHTML = '<p>Student not found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = '<p>An error occurred. Please try again later.</p>';
      });
  });