"use strict";
let aumento = 0;

class DocentException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class Docent {
    constructor(docentName, course, score, bestReco, captainReco, deadReco, comments, register, avgScore, avgBest, avgCaptain, avgDead, avgReco) {
        this.docentID = Docent.generateDocentID();
        this.docentName = docentName;
        this.course = course;
        this.score = score;
        this.bestReco = bestReco;
        this.captainReco = captainReco;
        this.deadReco = deadReco;
        this.comments = comments;
        this.register = register;
        this.avgScore = avgScore;
        this.avgBest = avgBest;
        this.avgCaptain = avgCaptain;
        this.avgDead = avgDead;
        this.avgReco = avgReco;
    }
    
    get docentID() {
        return this._docentID;
    }
    set docentID(val) {
        this._docentID = val;
    }

    get docentName() {
        return this._docentName;
    }
    set docentName(val) {
        this._docentName = val;
    }

    get course() {
        return this._course;
    }
    set course(val) {
        this._course = val;
    }

    get score() {
        return this._score;
    }
    set score(val) {
        this._score = val;
    }

    get bestReco() {
        return this._bestReco;
    }
    set bestReco(val) {
        this._bestReco = val;
    }

    get captainReco() {
        return this._captainReco;
    }
    set captainReco(val) {
        this._captainReco = val;
    }

    get deadReco() {
        return this._deadReco;
    }
    set deadReco(val) {
        this._deadReco = val;
    }

    get comments() {
        return this._comments;
    }
    set comments(val) {
        this._comments = val;
    }

    get register() {
        return this._register;
    }
    set register(val) {
        this._register = val;
    }

    get avgScore() {
        return this._avgScore;
    }
    set avgScore(val) {
        this._avgScore = val;
    }

    get avgBest() {
        return this._avgBest;
    }
    set avgBest(val) {
        this._avgBest = val;
    }

    get avgCaptain() {
        return this._avgCaptain;
    }
    set avgCaptain(val) {
        this._avgCaptain = val;
    }

    get avgDead() {
        return this._avgDead;
    }
    set avgDead(val) {
        this._avgDead = val;
    }

    get avgReco() {
        return this._avgReco;
    }
    set avgReco(val) {
        this._avgReco= val;
    }

    static generateDocentID() {
        let uid = 'dct' + aumento/2;
        aumento++;
        return uid;
    }

    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Docent.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newDocent = {}
        Object.assign(newDocent, obj);
        Docent.cleanObj(newDocent);

        if (!newDocent._docentID) {
            newDocent._docentID = Docent.generateDocentID();
        }

        let docent = new Docent(newDocent._docentName, newDocent._course, newDocent._score, newDocent._bestReco, newDocent._captainReco, newDocent._deadReco, newDocent._comments, newDocent._register, newDocent._avgScore, newDocent._avgBest, newDocent._avgCaptain, newDocent._avgDead, newDocent._avgReco);
        docent._docentID = newDocent._docentID;
        return docent;
    }

    static cleanObj(obj) {
        const docentProperties = ['_docentName', '_course', '_score', '_bestReco', '_captainReco', '_deadReco', '_comments', '_register', '_avgScore', '_avgBest', '_avgCaptain', '_avgDead', '_avgReco'];
        for (let prop in obj) {
            let verificador = 0;
            for (let i in docentProperties) {
                if (prop == docentProperties[i]) {
                    verificador++;
                }
            }
            if (verificador == 0) {
                delete obj[prop];
            }
        }
        return obj;
    }
}

module.exports = Docent;