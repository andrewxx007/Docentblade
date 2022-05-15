let docentContainer = document.getElementById('docentList');
const docentsUrl = 'http://localhost:3000/docents/';
const docentsAdminUrl = 'http://localhost:3000/admin/docents/';
let userWellcome = document.getElementById('userWellcome');
let userName = sessionStorage.getItem('userName');
userWellcome.textContent = " " + userName + " ";
let logoutBtn = document.getElementById('logoutBtn');

let checkName = document.getElementById('checkName');
let inputName = document.getElementById('inputName');
let btnSearchName = document.getElementById('btnSearchName');

let checkCourse = document.getElementById('checkCourse');
let inputCourse = document.getElementById('inputCourse');
let btnSearchCourse = document.getElementById('btnSearchCourse');

let checkPoints = document.getElementById('checkPoints');
let btnSearchPoints = document.getElementById('btnSearchPoints');

let checkNoFilter = document.getElementById('checkNoFilter');

let modalDocentName = document.getElementById('modalDocentName');
let modalDocentCourse = document.getElementById('modalDocentCourse');
/*let modalDocentPoints = document.getElementById('modalDocentPoints');*/
let modalBestReco = document.getElementById('modalBestReco');
let modalCapReco = document.getElementById('modalCapReco');
let modalDeadReco = document.getElementById('modalDeadReco');
let modalDocentComment = document.getElementById('modalDocentComment');
let modalDocentID = document.getElementById('modalDocentID');


if (userName == null) {
    window.location.href = "main.html";
}

var inputs = document.getElementsByTagName('input');

for (var i=0; i<inputs.length; i++)  {
  if (inputs[i].type == 'checkbox')   {
    inputs[i].checked = false;
  }
  if (inputs[i].type == 'radio')   {
    inputs[i].checked = false;
  }
  if(inputs[i].type == 'text'){
      inputs[i].value = "";
  }
}

modalDocentComment.value = "";

function goToProfile(name, course, score, bestReco, captainReco, deadReco, comments){
    let docentProfile = {}
    docentProfile.name = name;
    docentProfile.course = course;
    docentProfile.score = score;
    docentProfile.bestReco = bestReco;
    docentProfile.captainReco = captainReco;
    docentProfile.deadReco = deadReco;
    docentProfile.comments = comments;
    console.log(docentProfile);
    sessionStorage.setItem('profileDocent', JSON.stringify(docentProfile));
    window.location.href = "perfildocente.html";
}

function openModalDocent(id, name, course){
    console.log(id, name, course);
    modalDocentName.textContent = name;
    modalDocentCourse.textContent = course;
    modalDocentID.textContent = id;
}

function bestRecoCheck(checkbox){
    if (checkbox.checked == true) {
        console.log('checked')
        modalCapReco.disabled = true;
        modalDeadReco.disabled = true;
        modalBestReco.value = "1";
    } else {
        console.log('unchecked');
        modalCapReco.disabled = false;
        modalDeadReco.disabled = false;
        modalBestReco.value = "0";
    }
}

function captainRecoCheck(checkbox){
    if (checkbox.checked == true) {
        console.log('checked')
        modalBestReco.disabled = true;
        modalDeadReco.disabled = true;
        modalCapReco.value = "1";
    } else {
        console.log('unchecked');
        modalBestReco.disabled = false;
        modalDeadReco.disabled = false;
        modalCapReco.value = "0";
    }
}

function deadRecoCheck(checkbox){
    if (checkbox.checked == true) {
        console.log('checked')
        modalCapReco.disabled = true;
        modalBestReco.disabled = true;
        modalDeadReco.value = "1";
    } else {
        console.log('unchecked');
        modalCapReco.disabled = false;
        modalBestReco.disabled = false;
        modalDeadReco.value = "0";
    }
}

function evalDocentClick(){
    let docent = {};
    let id = modalDocentID.textContent;
    docent._score = document.querySelector('input[name="estrellas"]:checked').value;
    docent._bestReco = modalBestReco.value;
    docent._captainReco = modalCapReco.value;
    docent._deadReco = modalDeadReco.value;
    docent._comments = modalDocentComment.value;
    console.log(docent);
    console.log(id);
    putDocent(docentsAdminUrl + id, docent, (msg) => console.log(msg), (err) => console.log(err));
    setTimeout(function(){
        location.reload(); 
     },1000);
    /*window.location.href = "maindocentes.html";*/
}

btnSearchName.addEventListener('click', actBtnSearchName);

function actBtnSearchName() {
    let name = inputName.value;
    loadDocents(docentsUrl).then(docents => {
        orderDocentName(docents,name);
    })
}

function orderDocentName(docent, inputName) {
    let checker = 0;
    let orderByName = [];
    for(obj of docent){
        if(obj._docentName == inputName){
            orderByName.push(obj);
        }
        checker++;
    }
    console.log(orderByName);
    orderByName.forEach(function (item) {
        let verify = item._avgScore;
        if (verify >= 0 && verify <= 4) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: red'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else if (verify >= 5 && verify <= 7) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: orange'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: green'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        }
    })
}

btnSearchCourse.addEventListener('click', actBtnSearchCourse);

function actBtnSearchCourse() {
    let course = inputCourse.value;
    loadDocents(docentsUrl).then(docents => {
        orderDocentCourse(docents,course);
    })
}

function orderDocentCourse(docent, inputCourse) {
    let checker = 0;
    let orderByCourse = [];
    for(obj of docent){
        if(obj._course == inputCourse){
            orderByCourse.push(obj);
        }
        checker++;
    }
    console.log(orderByCourse);
    orderByCourse.forEach(function (item) {
        let verify = item._avgScore;
        if (verify >= 0 && verify <= 4) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: red'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else if (verify >= 5 && verify <= 7) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: orange'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: green'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        }
    })

}


function sortDocentPoint(x, y) {
    return y._avgScore.localeCompare(x._avgScore);
}

function orderDocentPoint(docent) {
    let sortDocent = docent.sort(sortDocentPoint);
    sortDocent.forEach(function (item) {
        let verify = item._avgScore;
        if (verify >= 0 && verify <= 4) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: red'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else if (verify >= 5 && verify <= 7) {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: orange'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        } else {
            docentContainer.innerHTML +=
                "<tr>" +
                "<td>" + Object.values(item._docentName).join("") + "</td>" +
                "<td>" + Object.values(item._course).join("") + "</td>" +
                "<td style='color: green'>" + Object.values(item._avgScore).join("") + "</td>" +
                "<td>" + Object.values(item._avgReco).join("") + "</td>" +
                "<td><button onclick='openModalDocent(" + JSON.stringify(Object.values(item._docentID).join("")) + "," + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target='#evaluar'>Evaluar" +
                "</button></td>" +
                "<td><button onclick='goToProfile(" + JSON.stringify(Object.values(item._docentName).join("")) + "," + JSON.stringify(Object.values(item._course).join("")) + "," + JSON.stringify(Object.values(item._avgScore).join("")) + "," + JSON.stringify(Object.values(item._avgBest).join("")) + "," + JSON.stringify(Object.values(item._avgCaptain).join("")) + "," + JSON.stringify(Object.values(item._avgDead).join("")) + "," + JSON.stringify(Object.values(item._comments).join("")) +")' type='button' class='btn btn-dark'" +
                "style='width:150px; height:50px; font-size:25px; font-family: League Spartan, sans-serif; text-align: center; background-color:aquamarine; color: black;'" +
                "href='#' data-toggle='modal' data-target=''>Perfil" +
                "</button></td>" +
                "</tr>"
        }
    })
}


function docentToHtmlNoFilter(docent) {
    let verify = docent._avgScore;
    if (verify >= 0 && verify <= 4) {
        return `
    <tr>
    <td>${docent._docentName}</td>
    <td>${docent._course}</td>
    <td style="color: red">${docent._avgScore}</td>
    <td>${docent._avgReco}</td>
    <td><button onclick="openModalDocent('${docent._docentID}','${docent._docentName}','${docent._course}')" "type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="#evaluar">
        Evaluar
        </button></td>
        <td><button onclick="goToProfile('${docent._docentName}','${docent._course}','${docent._avgScore}','${docent._avgBest}','${docent._avgCaptain}','${docent._avgDead}','${docent._comments}')"type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="">
        Perfil
        </button></td>
    </tr>
    `
    } else if (verify >= 5 && verify <= 7) {
        return `
    <tr>
    <td>${docent._docentName}</td>
    <td>${docent._course}</td>
    <td style="color: orange">${docent._avgScore}</td>
    <td>${docent._avgReco}</td>
    <td><button onclick="openModalDocent('${docent._docentID}','${docent._docentName}','${docent._course}')" "type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="#evaluar">
        Evaluar
        </button></td>
    <td><button onclick="goToProfile('${docent._docentName}','${docent._course}','${docent._avgScore}','${docent._avgBest}','${docent._avgCaptain}','${docent._avgDead}','${docent._comments}')"type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="">
        Perfil
        </button></td>
    </tr>
    `
    } else {
        return `
    <tr>
    <td>${docent._docentName}</td>
    <td>${docent._course}</td>
    <td style="color: green">${docent._avgScore}</td>
    <td>${docent._avgReco}</td>
    <td><button onclick="openModalDocent('${docent._docentID}','${docent._docentName}','${docent._course}')" "type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="#evaluar">
        Evaluar
        </button></td>
        <td><button onclick="goToProfile('${docent._docentName}','${docent._course}','${docent._avgScore}','${docent._avgBest}','${docent._avgCaptain}','${docent._avgDead}','${docent._comments}')"type="button" class="btn btn-dark"
        style="width:150px; height:50px; font-size:25px; font-family: 'League Spartan', sans-serif; text-align: center; background-color:aquamarine; color: black;"
        href="#" data-toggle="modal" data-target="">
        Perfil
        </button></td>
    </tr>
    `
    }
}

function docentListToHtmlNoFilter(docentList) {
    docentContainer.innerHTML = docentList.map(docentToHtmlNoFilter).join("\n");
}

/*loadDocents(docentsUrl).then(docents => {
    docentListToHtmlNoFilter(docents);
})*/

logoutBtn.addEventListener('click', actBtnLogout);

function actBtnLogout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('profileDocent');
    window.location.href = "main.html";
}

function handleNameChange(checkbox) {
    if (checkbox.checked == true) {
        console.log('checked');
        inputName.disabled = false;
        btnSearchName.className = "btn btn-dark";
        checkCourse.disabled = true;
        checkPoints.disabled = true;
        checkNoFilter.disabled = true;
    } else {
        console.log('unchecked');
        inputName.disabled = true;
        btnSearchName.className = "btn btn-dark disabled";
        checkCourse.disabled = false;
        checkPoints.disabled = false;
        checkNoFilter.disabled = false;
        docentContainer.innerHTML = "";
    }
}

function handleCourseChange(checkbox) {
    if (checkbox.checked == true) {
        inputCourse.disabled = false;
        btnSearchCourse.className = "btn btn-dark";
        checkName.disabled = true;
        checkPoints.disabled = true;
        checkNoFilter.disabled = true;
    } else {
        inputCourse.disabled = true;
        btnSearchCourse.className = "btn btn-dark disabled";
        checkName.disabled = false;
        checkPoints.disabled = false;
        checkNoFilter.disabled = false;
        docentContainer.innerHTML = "";
    }
}

function handlePointsChange(checkbox) {
    if (checkbox.checked == true) {
        btnSearchPoints.className = "btn btn-dark";
        checkName.disabled = true;
        checkCourse.disabled = true;
        checkNoFilter.disabled = true;
        loadDocents(docentsUrl).then(docents => {
            orderDocentPoint(docents);
        })
    } else {
        btnSearchPoints.className = "btn btn-dark disabled";
        checkName.disabled = false;
        checkCourse.disabled = false;
        checkNoFilter.disabled = false;
        docentContainer.innerHTML = "";
    }
}

function handleNoFilterChange(checkbox) {
    if (checkbox.checked == true) {
        /*btnSearchNoFilter.className = "btn btn-dark";*/
        checkName.disabled = true;
        checkCourse.disabled = true;
        checkPoints.disabled = true;
        loadDocents(docentsUrl).then(docents => {
            docentListToHtmlNoFilter(docents);
        })
    } else {
        /*btnSearchNoFilter.className = "btn btn-dark disabled";*/
        checkName.disabled = false;
        checkCourse.disabled = false;
        checkPoints.disabled = false;
        docentContainer.innerHTML = "";
    }
}

/*function orderDocentPoint(docents){
    console.log(docents);
}

orderDocentPoint(docents);*/

function sortDocentPoint(x, y) {
    return y._avgScore.localeCompare(x._avgScore);
}
/*let sortDocent = docents.sort(sortDocentPoint);*/
/*console.log(sortDocent);*/

/*var a = [
	{FirsName:"Ellie", LastName:"Williams"},
	{FirstName:"Lara", LastName : "Croft"}
];

function SortArray(x, y){
    return x.LastName.localeCompare(y.LastName);
}
var s = a.sort(SortArray);
console.log(s);*/