const VERSION_ID = "0.4.1"

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


function saveLocalStorage(state) {
    localStorage.setItem('state', JSON.stringify({ ...state, version: VERSION_ID }))
}

function loadLocalStorage() {
    state = JSON.parse(localStorage.getItem('state'))
    if (state?.version == VERSION_ID) {
        return state
    } else {
        localStorage.clear()
        return null
    }
}

// Service to compute hashes in non-blocking thread
let backgroundServiceWorker;

let app = createApp({
    data() {
        return {
            masterPassword: "",
            passwordVisible: true,
            saltHistoryVisible: false,
            saltHistory: [],
            salt: "",
            hashedPassword: "",
            darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
            ...loadLocalStorage()
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
        saveSalt() {
            this.saltHistory.unshift(this.salt);
            this.saltHistory = this.saltHistory.filter((c, index) => {
                return this.saltHistory.indexOf(c) == index && c != ""
            })
            this.saveAppState()
        },
        copyText(text) {
            navigator.clipboard.writeText(text)
            showMessage('Copied to clipboard!')
        },
        getAppState() {
            return {
                saltHistory: this.saltHistory
            }
        },
        onDropdownUnfocused(e) {
            this.saveSalt();
            if (e?.relatedTarget && Array.from(document.getElementsByClassName('dropdown')).some(x => x.contains(e.relatedTarget))) {
                return
            }
            this.saltHistoryVisible = false
        },
        saveAppState(state) {
            return saveLocalStorage(state || this.getAppState())
        }
    },
    computed: {
        passwordEntropy() {
            return zxcvbn(this.masterPassword).guesses_log10
        },
        historySearchResults() {
            return this.saltHistory
                .map((value, idx) => ({ value, idx }))
                .filter(x => x.value.toLowerCase().includes(this.salt.toLowerCase()))
                .sort((a, b) => {
                    if (a.value.toLowerCase().indexOf(this.salt.toLowerCase()) > b.value.toLowerCase().indexOf(this.salt.toLowerCase())) {
                        return 1;
                    } else if (a.value.toLowerCase().indexOf(this.salt.toLowerCase()) < b.value.toLowerCase().indexOf(this.salt.toLowerCase())) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
            // .slice(0, 5)
        }
    }
})

app.mount('#app')


if (window.Worker) {
    backgroundServiceWorker = new Worker('background.js')
}


function showMessage(message) {
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
