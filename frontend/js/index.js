if (localStorage.hasOwnProperty('remember-login')) {
    user = JSON.parse(localStorage.getItem('remember-login'));
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = './dashboard.html';
}

var loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let enteredEmail = document.getElementById('email').value;
    let enteredPassword = document.getElementById('password').value;

    if (enteredEmail && enteredPassword) {
        let users = [];

        if (localStorage.hasOwnProperty('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        loginSucess = false

        users.forEach((user) => {
            if (enteredEmail === user['email'] && enteredPassword === user['password']) {
                loginSucess = true
                localStorage.setItem('user', JSON.stringify(user));

                checkbox = document.getElementById('remember-me')
                if(checkbox.checked){
                    localStorage.setItem('remember-login', JSON.stringify(user));
                }

                window.location.href = './dashboard.html';
            }
        });

        if (!loginSucess){
            var errorMessage = document.getElementById('error-message');
            errorMessage.style.display = "block";
        }
    }
});
