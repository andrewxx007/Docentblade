let login = document.getElementById('btnLogin');
let userLogin = document.getElementById('userLogin');
let passwordLogin = document.getElementById('passwordLogin');

userLogin.addEventListener('keyup', logKey)
function logKey() {
    login.className = "btn btn-primary enable";
}

login.addEventListener('click', actBtnLogin);

function actBtnLogin() {
    let value = userLogin.value;
    let passvalue = passwordLogin.value;
    console.log(value, passvalue)
}
