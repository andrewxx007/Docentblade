"use strict";

createUser({
    _name: "ABA",
    _lastname: "FAR",
    _email: "fakeemail@iteso.mx",
    _password: "paswod"
});

createUser({
    _name: "ABy",
    _lastname: "FAaR",
    _email: "fakeaemail@iteso.mx",
    _password: "paswod"
});

console.log(getUsers());

createDocent({
    _docentName: "Alberto del Rio",
    _course: "Lucha Libre",
    _score: "0",
    _bestReco: "0",
    _captainReco: "0",
    _deadReco: "0",
    _comments: [],
    _register: "1"
})

createDocent({
    _docentName: "Alberto del Rio",
    _course: "Kung Fu",
    _score: "0",
    _bestReco: "0",
    _captainReco: "0",
    _deadReco: "0",
    _comments: [],
    _register: "1"
})
/*createDocent('Alberto del Rio', 'Lucha Libre', '0', '0', '0', '0', [], '1');*/
/*createDocent('Alberto del Rio', 'Kung Fu', '0', '0', '0', '0', [], '1');*/
console.log(getDocents());

/*updateDocent('dct0', {
    _score : "8",
    _bestReco: "0",
    _
})*/
updateDocent('dct0', '8', '0', '0', '0', 'aiuda');
updateDocent('dct0', '8', '0', '0', '0', 'es buenisimo');
updateDocent('dct0', '6', '0', '0', '0', 'chale');