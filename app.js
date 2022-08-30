
const { createApp } = Vue

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}
async function generatePassword(base, length = 16) {
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(base)))).map(b => '0x' + b.toString(16).padStart(2, '0')))).substring(0, length - 4).replaceAll('/', '_').replaceAll('+', '-') + '1aA='
}

createApp({
    data() {
        return {
            bookmarkletText: loadFile('bookmarklet.txt.js'),
            masterPassword: "",
            salt: "",
            hashedPassword: ""
        }
    },
    methods: {
        generate() {
            generatePassword(`${this.masterPassword}.${this.salt}`).then(res => this.hashedPassword = res)
        }
    }
}).mount('#app')
