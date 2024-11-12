function validateRegistration(user) {

    if (!user['name'] || !user['email'] || !user['password'] || !user['role']) return false;

    const emailRegex = /^[a-zA-Z]+@.+$/;
    const emailTest = emailRegex.test(user['email']);
    if (!emailTest) return false;

    if (user['password'].length < 8) return false;

    if (user['role'] === "Select Role") return false;

    return true;
}


var form = document.getElementById('registerForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let employeeRole = document.getElementById('role').value;

    let user = {
        'name': name,
        'email': email,
        'password': password,
        'role': employeeRole
    };

    let isValid = validateRegistration(user);

    if (isValid) {

        let users = [];

        if (localStorage.hasOwnProperty('users')) {
            users = JSON.parse(localStorage.getItem('users'));
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        location.reload();
    }
});
