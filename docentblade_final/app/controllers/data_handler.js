"use strict";

const fs = require('fs');
const User = require('./user');
const Docent = require('./docent');

let content = fs.readFileSync('./data/users.json');
let users = JSON.parse(content).map(User.createFromObject);

let contentDocent = fs.readFileSync('./data/docents.json');
let docents = JSON.parse(contentDocent).map(Docent.createFromObject);

function getUsers() {
    return users
}

function createUser(user) {
    if(isUserValid(user)){
        users.push(User.createFromObject(user));
        fs.writeFileSync('./data/users.json', JSON.stringify(users))
    }else{
        alert('An user with name ' + user._name + " " + user._lastname + " and email " + user._email + " has been registrated already");
    }
}

function isUserValid(usertoValid) {
    if (users.find(user => user._name == usertoValid._name && user._lastname == usertoValid._lastname))return false;
    if (users.find(user => user._email == usertoValid._email)) return false;
    return true;
}

function getDocents() {
    return docents
}

function getDocentByID(docentID) {
    return docents.find(lookup => lookup._docentID === docentID);
}

function createDocent(docent) {
    if(isDocentValid(docent)){
        docents.push(Docent.createFromObject(docent));
        fs.writeFileSync('./data/docents.json', JSON.stringify(docents))
    }else{
        alert('A docent with name ' + docentName + " and course " + course + " has been registrated already");
    }
}

function isDocentValid(docenttoValid) {
    if (docents.find(docent => docent._docentName == docenttoValid._docentName && docent._course == docenttoValid._course)) return false;
    return true;
}

/*function updateDocent(docentID, score, bestReco, captainReco, deadReco, comment) {
    const index = docents.findIndex(lookup => lookup._docentID === docentID);
    let registro = docents[index]._register;
    docents[index]._score = String((parseFloat(docents[index]._score) + parseFloat(score)));
    let avgScore = docents[index]._score/registro;
    docents[index]._bestReco = String(parseInt(docents[index]._bestReco) + parseInt(bestReco));
    docents[index]._captainReco = String(parseInt(docents[index]._captainReco) + parseInt(captainReco));
    docents[index]._deadReco = String(parseInt(docents[index]._deadReco) + parseInt(deadReco));
    docents[index]._comments.push(comment);
    docents[index]._register++;
    docents[index]._avgScore = String(avgScore);
}*/

function updateDocent(docentIDsearch, updatedDocent) {
    let index = docents.findIndex(docent => docent._docentID === docentIDsearch)
    if(index == -1) return;
    let registro = docents[index]._register;
    docents[index]._score = String((parseFloat(docents[index]._score) + parseFloat(updatedDocent._score)));
    let avgScore = docents[index]._score/registro;
    docents[index]._bestReco = String(parseInt(docents[index]._bestReco) + parseInt(updatedDocent._bestReco));
    let avgBest = (docents[index]._bestReco/registro)*100;
    docents[index]._avgBest = String(parseFloat(avgBest).toFixed(2));
    docents[index]._captainReco = String(parseInt(docents[index]._captainReco) + parseInt(updatedDocent._captainReco));
    let avgCaptain = (docents[index]._captainReco/registro)*100;
    docents[index]._avgCaptain = String(parseFloat(avgCaptain).toFixed(2));
    docents[index]._deadReco = String(parseInt(docents[index]._deadReco) + parseInt(updatedDocent._deadReco));
    let avgDead = (docents[index]._deadReco/registro)*100;
    docents[index]._avgDead = String(parseFloat(avgDead).toFixed(2));
    docents[index]._comments.push(updatedDocent._comments);
    docents[index]._register++;
    docents[index]._avgScore = String(parseFloat(avgScore).toFixed(2));
    if(avgBest>avgCaptain && avgBest>avgDead){
        docents[index]._avgReco = "👌";
    }else if(avgCaptain>avgBest && avgCaptain>avgDead){
        docents[index]._avgReco = "🚢";
    }else if(avgDead>avgBest && avgDead>avgCaptain){
        docents[index]._avgReco = "☠️";
    }else{
        docents[index]._avgReco = "❓";
    }
    console.log(docentList[index]);
}



exports.getUsers = getUsers;
exports.createUser = createUser;
exports.getDocents = getDocents;
exports.getDocentByID = getDocentByID;
exports.createDocent = createDocent;
exports.updateDocent = updateDocent;
