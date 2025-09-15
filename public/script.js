// Handle login form
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    showToast(data.message);
    // Optional redirect
    if (data.message === 'Login successful') {
      // window.location.href = "/dashboard";
    }
  })
  .catch(err => {
    showToast('An error occurred. Please try again.');
    console.error('Error:', err);
  });
});

// Handle signup form
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json()) // Assuming your server responds with JSON
  .then(data => {
    showToast(data.message);
    // You can clear form here or redirect
  })
  .catch(err => {
    showToast('An error occurred. Please try again.');
    console.error('Error:', err);
  });
});

// Toast display function
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
