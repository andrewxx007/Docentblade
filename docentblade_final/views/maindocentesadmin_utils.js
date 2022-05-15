let docentList = localStorage.getItem('docentList');
docentList = JSON.parse(docentList);
let docentSuggest = localStorage.getItem('docentSuggest');
docentSuggest = JSON.parse(docentSuggest);

let userWellcome = document.getElementById('userWellcome');
let userName = sessionStorage.getItem('userName');
userWellcome.textContent = " " + userName + " ";
let logoutBtn = document.getElementById('logoutBtn');

if (userName == null) {
    window.location.href = "main.html";
}

var inputs = document.getElementsByTagName('input');

for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == 'checkbox') {
        inputs[i].checked = false;
    }
    if (inputs[i].type == 'radio') {
        inputs[i].checked = false;
    }
    if (inputs[i].type == 'text') {
        inputs[i].value = "";
    }
}

logoutBtn.addEventListener('click', actBtnLogout);

function actBtnLogout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('profileDocent');
    window.location.href = "main.html";
}

let checkRegister = document.getElementById('checkRegister');
let checkSuggest = document.getElementById('checkSuggest');
let suggestDocents = document.getElementById('suggestDocents');
let registerDocents = document.getElementById('registerDocents');

let suggestList = document.getElementById('suggestList');
let registerList = document.getElementById('registerList');

function sortDocentPoint(x, y) {
    if (y._docentID > x._docentID) {
        return -1;
    }
    if (y._docentID < x._docentID) {
        return 1;
    }
    return 0;
}

function docentToHtmlRegister() {
    let sortDocent = docentList.sort(sortDocentPoint);
    sortDocent.forEach(function (item) {
        registerList.innerHTML +=
                "<tr>"+
                    "<td>"+ Object.values(item._docentID).join("") +"</td>"+
                    "<td>"+ Object.values(item._docentName).join("") +"</td>"+
                    "<td>"+ Object.values(item._course).join("") +"</td>"+
                        "<td><button onclick='deleteDocent(" + JSON.stringify(Object.values(item._docentID).join("")) +")' type='button' class='btn btn-dark' style='width:100px; height:45px; font-size:26px; background-color: red;' href='#' data-toggle='modal' data-target='#evaluar'>🗑️</button></td>"+
                "</tr>"
    })

}

function deleteDocent(docentID) {
    var newDocentList = docentList.filter((item) => item._docentID !== docentID);
    localStorage.setItem("docentList", JSON.stringify(newDocentList));
    setTimeout(function () {
        location.reload();
    }, 1000);
}

function handleRegisterChange(checkbox) {
    if (checkbox.checked == true) {
        checkSuggest.disabled = true;
        registerDocents.hidden = false;
        docentToHtmlRegister();
    } else {
        checkSuggest.disabled = false;
        registerDocents.hidden = true;
        registerList.innerHTML = "";
    }
}

function docentToHtmlSuggest() {
    docentSuggest.forEach(function (item) {
        suggestList.innerHTML +=
                "<tr>"+
                    "<td>"+ Object.values(item._userName).join("") +"</td>"+
                    "<td>"+ Object.values(item._docentName).join("") +"</td>"+
                    "<td>"+ Object.values(item._docentCourse).join("") +"</td>"+
                    "<td><button onclick='uploadDocent(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._docentCourse).join("")) + ")' type='button' class='btn btn-dark' style='width:100px; height:45px; font-size:26px; background-color: greenyellow;' href='#' data-toggle='modal' data-target='#evaluar'>✅</button></td>"+
                    "<td><button onclick='deleteSuggest(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._docentCourse).join("")) + ")' type='button' class='btn btn-dark' style='width:100px; height:45px; font-size:26px; background-color: red;' href='#' data-toggle='modal' data-target='#evaluar'>🗑️</button></td>"+
                "</tr>"
    })

}

function uploadDocent(docentName, docentCourse) {
    let docentID = "dct" + docentList.length;
    let newDocent = {
        "_docentID": docentID,
        "_docentName": docentName,
        "_course": docentCourse,
        "_score": "0",
        "_bestReco": "0",
        "_captainReco": "0",
        "_deadReco": "0",
        "_comments": [],
        "_register": 1,
        "_avgScore": "0",
        "_avgBest": "0",
        "_avgCaptain": "0",
        "_avgDead": "0",
        "_avgReco": "0"
    };
    docentList.push(newDocent);
    localStorage.setItem("docentList", JSON.stringify(docentList));
    let docentNameIndex = docentSuggest.findIndex(docent => docent._docentName === docentName);
    let docentCourseIndex = docentSuggest.findIndex(docent => docent._docentCourse === docentCourse);
    if(docentNameIndex>=0 && docentCourseIndex>=0 && docentNameIndex==docentCourseIndex){
        docentSuggest.splice(docentNameIndex,1);
        localStorage.setItem("docentSuggest", JSON.stringify(docentSuggest));
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}

function deleteSuggest(docentName, docentCourse) {
    let docentNameIndex = docentSuggest.findIndex(docent => docent._docentName === docentName);
    let docentCourseIndex = docentSuggest.findIndex(docent => docent._docentCourse === docentCourse);
    if(docentNameIndex>=0 && docentCourseIndex>=0 && docentNameIndex==docentCourseIndex){
        docentSuggest.splice(docentNameIndex,1);
        localStorage.setItem("docentSuggest", JSON.stringify(docentSuggest));
    }
    setTimeout(function () {
        location.reload();
    }, 1000);
}

function handleSuggestChange(checkbox) {
    if (checkbox.checked == true) {
        checkRegister.disabled = true;
        suggestDocents.hidden = false;
        docentToHtmlSuggest()
    } else {
        checkRegister.disabled = false;
        suggestDocents.hidden = true;
        suggestList.innerHTML = "";
    }
}

