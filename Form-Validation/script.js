document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;

  let error = document.getElementById("error");
  error.innerText = "";

   let inputs = [name, email, phone, password, confirm];

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === "") {
      error.innerText = "All fields are required";
      return;
    }

    }

  if (name.length < 3) {
    error.innerText = "Name must be at least 3 characters";
    return;
  }

  if (!email.includes("@")) {
    error.innerText = "Invalid email";
    return;
  }

  if (password.length < 6) {
    error.innerText = "Password must be at least 6 characters";
    return;
  }

  if (password !== confirm) {
    error.innerText = "Passwords do not match";
    return;
  }

  alert("Form Submitted Successfully!");
});

