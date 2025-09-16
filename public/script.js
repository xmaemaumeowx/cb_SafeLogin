// On page load, check for message in URL
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const message = params.get('message');

  if (message) {
    // Show toast with message
    showToast(decodeURIComponent(message));
    // Remove message parameter from URL
    history.replaceState(null, '', window.location.pathname);
  }
};

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    showToast(data.message);

    if (data.message === 'Login successful!') {
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    }
  })
  .catch(err => {
    showToast('An error occurred. Please try again.');
    console.error('Error:', err);
  });
});

// Handle signup form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    // Redirect to login with message via URL parameter
    showToast(data.message);

   if (data.message === 'User successfully added. Please log in.') {
      // Delay redirect to let toast show
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  })
  .catch(err => {
    showToast('An error occurred. Please try again.');
    console.error('Error:', err);
  });
});



// Display toast message
function showToast(message) {
  console.log('Showing toast:', message);
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';

  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// Validate form inputs before submitting
function validateForm() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (email === "" || password === "") {
    showToast("Please enter your email and password!");
    return false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast("Invalid email format!");
    return false;
  }

  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\{}\[\]|\\:;"'<>,.?/]).{8,}$/;
  if (!strongPasswordPattern.test(password)) {
    showToast("Password must be at least 8 characters long, include uppercase, lowercase, number, and special character!");
    return false;
  }

  // If all validations pass
  return true; 
}

