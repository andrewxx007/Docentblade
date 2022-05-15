"use strict";
let aumento = 0;

class UserException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}

class User {
    constructor(name, lastname, email, password) {
        this.userID = User.generateUserID();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.date = User.generateDate();
    }

    get userID() {
        return this._userID;
    }
    set userID(val) {
        this._userID = val;
    }

    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }

    get lastname() {
        return this._lastname;
    }
    set lastname(val) {
        this._lastname = val;
    }

    get email() {
        return this._email;
    }
    set email(val) {
        this._email = val;
    }

    get password() {
        return this._password;
    }
    set password(val) {
        this._password = val;
    }

    get date() {
        return this._date;
    }
    set date(val) {
        this._date = val;
    }

    static generateUserID() {
        let uid = 'usr' + aumento/2;
        aumento++;
        return uid;
    }

    static generateDate() {
        let date = new Date();
        date = date.toDateString();
        return date;
    }

    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newUser = {}
        Object.assign(newUser, obj);
        User.cleanObj(newUser);

        if (!newUser._userID) {
            newUser._userID = User.generateUserID();
        }

        let user = new User(newUser._name, newUser._lastname, newUser._email, newUser._password);
        user._userID = newUser._userID;
        return user;
    }

    static cleanObj(obj) {
        const userProperties = ['_name', '_lastname', '_email', '_password'];
        for (let prop in obj) {
            let verificador = 0;
            for (let i in userProperties) {
                if (prop == userProperties[i]) {
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