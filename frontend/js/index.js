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
                localStorage.setItem('user', JSON.stringify(users));
                window.location.href = './dashboard.html';
            }
        });

        if (!loginSucess){
            var errorMessage = document.getElementById('error-message');
            errorMessage.style.display = "block";
        }
    }
});
