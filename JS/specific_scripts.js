// tutorial.html
function add_frame_delay() {
    setTimeout(() => {
        const element1 = document.getElementsByClassName('steps_frame')[0];
        element1.style.display = 'block';
        setTimeout(() => {
            element1.style.opacity = '1';
        }, 10);

        const element2 = document.getElementsByClassName('youtube_video')[0];
        element2.style.display = 'block';
        setTimeout(() => {
            element2.style.opacity = '1';
        }, 10);
    }, 1000);
}

// master_typing.html
function add_sec_delay() {
    const sections = ['sec1', 'sec2', 'sec3'];

    for (let index = 0; index < sections.length; index++) { // using loop control
        setTimeout(() => {
            const element = document.getElementById(sections[index]);
            element.style.display = 'block';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10)
        }, (index + 1) * 1500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    add_frame_delay();
    add_sec_delay();
});


// register.html
function match_pass() {
    const first_password = document.register.password.value;
    const second_password = document.register.password2.value;

    if (first_password === second_password) {
        return true;
    } else {
        alert("password must be same!");
        return false;
    }
}

function validatePassword() {
    const password = document.getElementById("reg_pw1").value;
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!strongPassword.test(password)) {
        alert("Password must contain at least one uppercase letter, one number, and one special character.");
        return false;
    }
    return true;
}

function validate_username() {
    const name = document.getElementById("reg_un1").value;
    if (!(/\d/.test(name))) {
        alert("Please enter your name properly.");
        return false;
    }
    return true;
}
