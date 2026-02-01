const form = document.getElementById("myForm");
const inputs = document.querySelectorAll("input");
const errorsContainer = document.getElementById("errors");

const validators = {
    name: value => value.trim().length >= 3 ? "" : "Name must be at least 3 characters",
    email: value => /^\S+@\S+\.\S+$/.test(value) ? "" : "Email is invalid",
    password: value => /(?=.*\d).{6,}/.test(value) ? "" : "Password must be at least 6 characters and include a number",
    confirmPassword: value => value === document.getElementById("password").value ? "" : "Passwords do not match",
    age: value => value >= 10 && value <= 100 ? "" : "Age must be between 10 and 100"
};

inputs.forEach(input => {
    input.addEventListener("input", () => {
        const error = validators[input.name](input.value);
        input.classList.remove("valid", "invalid");
        if(error) {
            input.classList.add("invalid");
        } else {
            input.classList.add("valid");
        }
    });
});

form.addEventListener("submit", e => {
    e.preventDefault();
    let allErrors = [];
    inputs.forEach(input => {
        const error = validators[input.name](input.value);
        if(error) allErrors.push(error);
    });
    errorsContainer.innerHTML = allErrors.map(err => `<p>${err}</p>`).join("");
    if(allErrors.length === 0) {
        errorsContainer.innerHTML = `<p class="success">Form Submitted Successfully!</p>`;
        form.reset();
        inputs.forEach(input => input.classList.remove("valid"));
    }
});
