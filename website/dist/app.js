
// Load VueJS
const { createApp } = Vue

// Load a file from an HTTP endpoint
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

// Service to compute hashes in non-blocking thread
let backgroundServiceWorker;

let app = createApp({
    data() {
        return {
            masterPassword: "", // 
            passwordVisible: true,
            salt: "",
            hashedPassword: "",
            darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches
        }
    },
    methods: {
        generate() {
            if (this.masterPassword.length == 0 || this.salt.length == 0) {
                this.hashedPassword = ""
                return
            }
            if (backgroundServiceWorker) {
                backgroundServiceWorker.onmessage ??= (e) => {
                    this.hashedPassword = e.data
                }
                backgroundServiceWorker.postMessage([this.masterPassword, this.salt])
            } else {
                generatePassword(this.masterPassword, this.salt).then(res => this.hashedPassword = res)
            }
        },
        copyText: (text) => {
            navigator.clipboard.writeText(text)
            showMessage('Copied to clipboard!')
        },
        showMessage
    },
    computed: {
        passwordEntropy() {
            return zxcvbn(this.masterPassword).guesses_log10
        }
    }
})

app.mount('#app')


if (window.Worker) {
    backgroundServiceWorker = new Worker('background.js')
}


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
