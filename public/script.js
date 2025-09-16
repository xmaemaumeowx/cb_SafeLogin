// TOAST FUNCTION
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = 'toast';
  }, 3000);
}

// FRONTEND VALIDATION
function validateForm(email, password) {
  if (!email || !password) {
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
  return true;
}

// UNIVERSAL HANDLER: Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!validateForm(email, password)) return;

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      showToast(data.message);
      if (res.ok && data.message === 'Login successful!') {
        setTimeout(() => window.location.href = "/home", 2000);
      }
    } catch (err) {
      showToast('An error occurred. Please try again.');
      console.error('Login Error:', err);
    }
  });
}

// UNIVERSAL HANDLER: Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!validateForm(email, password)) return;

    try {
      const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      showToast(data.message);
      // Only redirect if signup was successful
      if (res.ok && data.message === 'User successfully added. Please log in.') {
        setTimeout(() => {
          window.location.href = `/?message=${encodeURIComponent(data.message)}`;
        }, 2000);
      }
    } catch (err) {
      showToast('An error occurred. Please try again.');
      console.error('Signup Error:', err);
    }
  });
}
// Google One Tap callback
function handleCredentialResponse(response) {
  // Send the JWT to your backend via HTTPS
  fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_token: response.credential })
  })
  .then(async res => {
    const data = await res.json();
    showToast(data.message);
    if (res.ok && data.message === 'Login successful!') {
      setTimeout(() => window.location.href = "/home", 2000);
    }
  })
  .catch(error => {
    showToast(error.message || 'Google sign-in failed.');
    console.error('Login failed:', error);
  });
}