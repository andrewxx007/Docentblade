"use strict";

async function loadDocents(url) {    
    let response = await fetch(url)
    if (response.status != 200) return [];
    return await response.json();
}

async function loadUsers(url) {    
    let response = await fetch(url)
    if (response.status != 200) return [];
    return await response.json();
}

function storeUser(url, user, onSuccess, onError) {
    // POST XHR to localhost:3000/api/users/{email} with body 'user'
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function putDocent(url, docent, onSuccess, onError) {
    // PUT XHR to localhost:3000/api/users/{email} with body 'user'
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(docent));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status == 200) {
        onSuccess(xhr.responseText);
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}