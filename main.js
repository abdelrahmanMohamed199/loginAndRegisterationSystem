
let fullname = document.getElementById("fullname");
let registerEmail = document.getElementById("email");
let registerPassword = document.getElementById("password");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let confirmPassword = document.getElementById("confirmPassword");
let registerButton = document.getElementById("register");
let loginButton = document.getElementById("loginButton");
let logoutButton = document.getElementById("logoutBtn");
let profileName = document.getElementById("profileName");
let profileEmail = document.getElementById("profileEmail");
let users;
users = JSON.parse(localStorage.getItem("Users")) || [];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// start registeration page 
if(registerButton)
{
    let isValid = true;
    registerButton.addEventListener("click", function(e){
    if(fullname.value === "" || registerEmail.value === "" || registerPassword.value === "")
    {
        e.preventDefault();
        alert("Please fill the empty fields");
        return;
    }

    if(!emailPattern.test(registerEmail.value.trim()))
    {
        e.preventDefault();
        alert("Please enter a valid email");
        return;
    }

    users.forEach(ele => {
        if(ele.email === registerEmail.value)
        {
            e.preventDefault();
            alert("Email is exist please enter another email");
            isValid = false;
        }
    });

    if(registerPassword.value !== confirmPassword.value)
    {
        e.preventDefault();
        alert("Password does not match");
        return;
    }

    if(isValid)
    {
        users.push({fullname: `${fullname.value}`, email: `${registerEmail.value}`, password: `${registerPassword.value}`});
        localStorage.setItem("Users", JSON.stringify(users));
        alert("Your account is added successfully");
    }
})
}
// end registeration page 

// start login page
if(loginButton)
{
    let found = false;
    loginButton.addEventListener("click", function(e){
    users.forEach(ele => {
        if(loginEmail.value === ele.email && loginPassword.value === ele.password)
        {
            found = true;
            localStorage.setItem("loggedUser", JSON.stringify(ele));
            e.preventDefault();
            window.location.href = "profile.html";
        }
    })

    if(found === false)
    {
        e.preventDefault();
        alert("Invalid email/password!");
    }
})
}
// end login page

// start profile page

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (loggedUser) {
document.getElementById("profileName").innerText = loggedUser.fullname;
document.getElementById("profileEmail").innerText = loggedUser.email;
} else {
// No logged user found -> redirect to login page
window.location.href = "login.html";
}


if(logoutButton){
    logoutButton.addEventListener("click", function(e){
        e.preventDefault();
        window.location.href = "index.html";
    })
}
// end profile page
