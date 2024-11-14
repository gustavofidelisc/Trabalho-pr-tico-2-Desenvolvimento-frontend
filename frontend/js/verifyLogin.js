var user = localStorage.getItem('user')
var rememberLogin = localStorage.getItem('remember-login')
if (!user && !rememberLogin) {
    window.location.href = './index.html';
}