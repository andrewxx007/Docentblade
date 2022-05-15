let userWellcome = document.getElementById('userWellcome');
let userName = sessionStorage.getItem('userName');
userWellcome.textContent = " " + userName + " ";
let logoutBtn = document.getElementById('logoutBtn');
let profileDocentContainer = document.getElementById('docentPorfileDiv');
let docentPorfileDiv = document.getElementById('docentPorfileDiv');
let profileDocent = sessionStorage.getItem('profileDocent');

dataProfile = [JSON.parse(profileDocent)];

if (userName == null) {
    window.location.href = "main.html";
}

dataProfile.forEach(function (item) {
    let verify = item.score;
    if (verify >= 0 && verify <= 4) {
        profileDocentContainer.innerHTML +=
        "<div style='font-family: League Spartan, sans-serif; margin-left: 30px;'>"+
        "<h1 style='font-size:45px; color: black; margin-top: 10px;'>Perfil del docente</h1>"+
        "<br>"+
        "<div style='font-size:30px; color: black;'>"+
            "<span>Nombre: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.name).join("") +"</span><br><br>"+
            "<span>Materia: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.course).join("") +"</span><br><br>"+
            "<span>Puntuación promedio: </span>"+
            "<span style='color: red;'>"+ Object.values(item.score).join("") +"</span><br><br>"+
            "<span>Recomendación promedio: </span>"+
            "<br>"+
            "<span> 👌 El Mejor </span><span style='color: gray;'>"+ Object.values(item.bestReco).join("") +"</span>"+
            "<span> 🚢 Capitán </span><span style='color: gray;''>"+ Object.values(item.captainReco).join("") +"</span>"+
            "<span> ☠️ Peligro </span><span style='color: gray;'>"+ Object.values(item.deadReco).join("") +"</span>"+
            "<br><br>"+
            "<span>Comentarios: </span><br>"+
            "<textarea name='texto' rows='4' cols='40' placeholder='"+ Object.values(item.comments).join("") +"' disabled></textarea>"+
        "</div>"+
    "</div>"
    }
    if (verify >= 5 && verify <= 7) {
        profileDocentContainer.innerHTML +=
        "<div style='font-family: League Spartan, sans-serif; margin-left: 30px;'>"+
        "<h1 style='font-size:45px; color: black; margin-top: 10px;'>Perfil del docente</h1>"+
        "<br>"+
        "<div style='font-size:30px; color: black;'>"+
            "<span>Nombre: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.name).join("") +"</span><br><br>"+
            "<span>Materia: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.course).join("") +"</span><br><br>"+
            "<span>Puntuación promedio: </span>"+
            "<span style='color: orange;'>"+ Object.values(item.score).join("") +"</span><br><br>"+
            "<span>Recomendación promedio: </span>"+
            "<br>"+
            "<span> 👌 El Mejor </span><span style='color: gray;'>"+ Object.values(item.bestReco).join("") +"</span>"+
            "<span> 🚢 Capitán </span><span style='color: gray;''>"+ Object.values(item.captainReco).join("") +"</span>"+
            "<span> ☠️ Peligro </span><span style='color: gray;'>"+ Object.values(item.deadReco).join("") +"</span>"+
            "<br><br>"+
            "<span>Comentarios: </span><br>"+
            "<textarea name='texto' rows='4' cols='40' placeholder='"+ Object.values(item.comments).join("") +"' disabled></textarea>"+
        "</div>"+
    "</div>"
    }
    if (verify >= 8 && verify <= 10) {
        profileDocentContainer.innerHTML +=
        "<div style='font-family: League Spartan, sans-serif; margin-left: 30px;'>"+
        "<h1 style='font-size:45px; color: black; margin-top: 10px;'>Perfil del docente</h1>"+
        "<br>"+
        "<div style='font-size:30px; color: black;'>"+
            "<span>Nombre: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.name).join("") +"</span><br><br>"+
            "<span>Materia: </span>"+
            "<span style='color: gray;'>"+ Object.values(item.course).join("") +"</span><br><br>"+
            "<span>Puntuación promedio: </span>"+
            "<span style='color: green;'>"+ Object.values(item.score).join("") +"</span><br><br>"+
            "<span>Recomendación promedio: </span>"+
            "<br>"+
            "<span> 👌 El Mejor </span><span style='color: gray;'>"+ Object.values(item.bestReco).join("") +"</span>"+
            "<span> 🚢 Capitán </span><span style='color: gray;''>"+ Object.values(item.captainReco).join("") +"</span>"+
            "<span> ☠️ Peligro </span><span style='color: gray;'>"+ Object.values(item.deadReco).join("") +"</span>"+
            "<br><br>"+
            "<span>Comentarios: </span><br>"+
            "<textarea name='texto' rows='4' cols='40' placeholder='"+ Object.values(item.comments).join("") +"' disabled></textarea>"+
        "</div>"+
    "</div>"
    }
})

logoutBtn.addEventListener('click', actBtnLogout);

function actBtnLogout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('profileDocent');
    window.location.href = "main.html";
}