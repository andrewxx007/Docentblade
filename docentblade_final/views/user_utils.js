const usersUrl = 'http://localhost:3000/users/';
const usersAdminUrl = 'http://localhost:3000/admin/users/';
let login = document.getElementById('btnLogin');
let userLogin = document.getElementById('userLogin');
let passwordLogin = document.getElementById('passwordLogin');

userLogin.addEventListener('keyup', logKey)

function logKey() {
    login.className = "btn btn-primary enable";
}

login.addEventListener('click', actBtnLogin);

function actBtnLogin() {
    let email = userLogin.value;
    let password = passwordLogin.value;
    /*console.log(email, password)*/
    loadUsers(usersUrl).then(users => {
        verifyUser(users, email, password);
    })
}

function verifyUser(userList, userEmail, userPassword) {
    /*console.log(userList);*/
    /*console.log(userEmail);*/
    /*console.log(userPassword);*/
    let emailIndex = userList.findIndex(user => user._email === userEmail)
    let passIndex = userList.findIndex(user => user._password === userPassword)

    if (emailIndex >= 0 && passIndex >= 0 && emailIndex == passIndex) {
        console.log(userList[emailIndex]._email);
        console.log(userList[passIndex]._password);
        let fullName = userList[emailIndex]._name + " " + userList[emailIndex]._lastname
        sessionStorage.setItem("userName", fullName);
        window.location.href = "maindocentes.html";
    } else {
        alert("User not registered or worng password - Try again");
    }
}

/*let ximenaUser = new User("Ximena", "Ruis", "ximena.ruiz@iteso.mx", "BestPassword2", "1997-08-08", "M");*/

function addUser(user) {
    // store given user into server and display all users again
    //Llamar a guardarUser - storeUser
    storeUser(usersAdminUrl, user, (msg) => {
        console.log(msg);
        displayUsers();
        //Verificación de error
    }, (err) => console.log(err))
}

let registerBtn = document.getElementById('registerBtn');
registerBtn.addEventListener('click', actBtnRegister);

function actBtnRegister() {
    let userName = document.getElementById('userName').value;
    let userLastName = document.getElementById('userLastName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    let userConPassword = document.getElementById('userConPassword').value;

    if(userEmail.includes('@iteso.mx')==false){
        alert("Not valid email");
    }else{
        if(userPassword!=userConPassword){
            alert("Cannot verify password");
        }else{
            loadUsers(usersUrl).then(users => {
                isUserValid(users, userName, userLastName, userEmail, userPassword);
            })
        }
    }
}

function isUserValid(users, name, lastName, email, password) {
    if (users.find(user => user._email == email)){
        alert('User already registered - Try another email');
    }else{
        let newUser = new User(name, lastName, email, password);
        console.log(newUser)
        addUser(newUser);
        /*window.location.href = "main.html";*/
    }
}


function displayUsers(){
    console.log('pass');
}


/*displayUsers();*/
//addUser(ximenaUser);