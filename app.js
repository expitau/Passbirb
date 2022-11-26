
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

createApp({
    data() {
        return {
            bookmarkletText: loadFile('bookmarklet.txt.js'),
            masterPassword: "",
            passwordVisible: true,
            salt: "",
            hashedPassword: ""
        }
    },
    methods: {
        generate() {
            generatePassword(this.masterPassword, this.salt).then(res => this.hashedPassword = res)
        },
        copyText: (text) => {
          navigator.clipboard.writeText(text)
          showMessage('Copied to clipboard!')
        },
        showMessage
    }
}).mount('#app')

function showMessage(message) {
    console.log("run")
  let el = document.getElementById('messageToast')
  el.innerHTML = message
  el.classList.remove('fade-in-out')
  window.requestAnimationFrame(() => { el.classList.add('fade-in-out') })
}

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
