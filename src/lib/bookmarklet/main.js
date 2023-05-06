import generatePassword from "../../helpers/password.js";

let masterPassword = prompt("Enter the master password")
let salt = prompt("Enter a salt", location.hostname.split('.').slice(-2, -1)[0] + ":0")
generatePassword(masterPassword, salt).then(alert)
