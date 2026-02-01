const form = document.getElementById("myForm");
const inputs = document.querySelectorAll("input");
const errorsContainer = document.getElementById("errors");
const strengthBar = document.querySelector(".strength");

const validators = {
    name: value => value.trim().length >= 3 ? "" : "Name must be at least 3 characters",
    email: value => /^\S+@\S+\.\S+$/.test(value) ? "" : "Email is invalid",
    password: value => /(?=.*\d).{6,}/.test(value) ? "" : "Password must be at least 6 characters and include a number",
    confirmPassword: value => value === document.getElementById("password").value ? "" : "Passwords do not match",
    age: value => value >= 10 && value <= 100 ? "" : "Age must be between 10 and 100"
};

function updateEmoji(input, error) {
    const emoji = input.nextElementSibling;
    emoji.textContent = error ? "😢" : "😄";
}

function updateStrength(password) {
    let strength = 0;
    if(password.length >= 6) strength += 1;
    if(/[A-Z]/.test(password)) strength += 1;
    if(/\d/.test(password)) strength += 1;
    strengthBar.style.width = `${(strength/3)*100}%`;
    if(strength === 1) strengthBar.style.background = "red";
    if(strength === 2) strengthBar.style.background = "orange";
    if(strength === 3) strengthBar.style.background = "green";
}

inputs.forEach(input => {
    input.addEventListener("input", () => {
        const error = validators[input.name](input.value);
        input.classList.remove("valid", "invalid");
        if(error) input.classList.add("invalid");
        else input.classList.add("valid");
        updateEmoji(input, error);
        if(input.name === "password") updateStrength(input.value);
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
        launchConfetti();
        errorsContainer.innerHTML = `<p class="success">Form Submitted Successfully!</p>`;
        form.reset();
        inputs.forEach(input => input.classList.remove("valid"));
        strengthBar.style.width = "0";
        document.querySelectorAll("span.emoji").forEach(e => e.textContent = "");
    }
});

// Confetti
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confettiParticles = [];

function createConfetti() {
    for(let i=0; i<150; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * 10 + 5,
            color: `hsl(${Math.random()*360},100%,50%)`,
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r/2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r/4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/4);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confettiParticles.forEach(p => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r/2)/2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if(p.y > canvas.height) {
            p.y = -10;
            p.x = Math.random() * canvas.width;
        }
    });
}

let confettiInterval;
function launchConfetti() {
    createConfetti();
    confettiInterval = setInterval(drawConfetti, 20);
    setTimeout(() => {
        clearInterval(confettiInterval);
        confettiParticles = [];
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 3000);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
