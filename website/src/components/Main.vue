<script lang="ts">

const VERSION_ID = "0.4.1"

// Service to compute hashes in non-blocking thread
let backgroundServiceWorker;

if (window.Worker) {
    backgroundServiceWorker = new Worker('background.js')
}

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
    let state = JSON.parse(localStorage.getItem('state'))
    if (state?.version == VERSION_ID) {
        return state
    } else {
        localStorage.clear()
        return null
    }
}


function showMessage(message) {
    let el = document.getElementById('messageToast')
    el.innerHTML = message
    el.classList.remove('fade-in-out')
    window.requestAnimationFrame(() => { el.classList.add('fade-in-out') })
}


export default {
    data() {
        return {
            masterPassword: "",
            passwordVisible: false,
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

            // @ts-ignore
            window.generatePassword(this.masterPassword, this.salt).then(res => this.hashedPassword = res)
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
        saveAppState(state = undefined) {
            return saveLocalStorage(state || this.getAppState())
        }
    },
    computed: {
        passwordEntropy() {
            // @ts-ignore
            return window.zxcvbn(this.masterPassword).guesses_log10
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
}
</script>

<template>
    
    <div :class="{'darkMode': darkMode, 'lightMode': !darkMode}" id="main">
            <div id="messageToast"></div>
            <button id="themeToggle" @click="darkMode = !darkMode">
                <svg v-if="!darkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>

            </button>
            <div class="card">
                <h1>PassBirb Generator</h1>
                <div style="display: flex; flex-direction: row; justify-content: space-between">
                    <h3>Master Password</h3>
                    <h3 class="indicator">{{Math.floor(passwordEntropy * 10) / 10}}/24</h3>
                </div>
                <div class="textbox" :class="{
                    PasswordStrength0: passwordEntropy == 0,
                    PasswordStrength1: passwordEntropy > 0 && passwordEntropy < 12,
                    PasswordStrength2: passwordEntropy >= 12 && passwordEntropy < 18,
                    PasswordStrength3: passwordEntropy >= 18 && passwordEntropy < 24,
                    PasswordStrength4: passwordEntropy >= 24
                }">
                    <input :type="passwordVisible ? 'text' : 'password'" @input="generate" v-model="masterPassword"
                        placeholder="Enter the master password">
                    <button @click="passwordVisible = !passwordVisible">
                        <svg v-if="!passwordVisible" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </button>
                </div>
                <h3>Key</h3>
                <div class="dropdown" >
                    <div class="textbox">
                        <input type="text" @keyup.enter="saveSalt(); saltHistoryVisible = false" @input="generate" v-model="salt" @focus="saltHistoryVisible = true" @focusout="onDropdownUnfocused" placeholder="Enter a key (website name)">
                        <button @click="saltHistoryVisible = !saltHistoryVisible">
                            <svg v-if="!saltHistoryVisible" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="saltHistoryVisible" class="dropdown-content">
                        <div class="dropdown-list" v-if="historySearchResults.length > 0" v-for="item in historySearchResults">
                            <button @click="salt = item.value; saltHistoryVisible = false; generate(); saveSalt()">{{item.value}}</button>
                            <button @click="saltHistory.splice(item.idx, 1); saveAppState()">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg></button>
                        </div>
                        <div v-else-if="saltHistory.length > 0" style="padding: 0.5rem">No results</div>
                        <div v-else style="padding: 0.5rem">No items to show in history</div>
                    </div>
                </div>
                <pre class="result" v-if="masterPassword.length > 0 && salt.length > 0">
                    <div>{{hashedPassword}}</div> 
                    <button @click="copyText(hashedPassword); saveSalt();">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                        </svg>
                  </button>
                </pre>
                <!-- <pre>{{bookmarkletText}}</pre> -->
            </div>

            <div class="card">
                <h1>About</h1>
                <h2>What is this?</h2>
                <p>This is a stateless password manager, a utility for managing website passwords without storing them
                    in a database or file. Unlike traditional password alternatives that keep your passwords on your
                    computer
                    (or
                    worse, in the cloud), Passbirb will regenerate the same unique password anytime you want to login on
                    a
                    new device.</p>
                <h2>Who is this for?</h2>
                <p>You should use Passbirb if:
                <ul>
                    <li>You want your password for every website to be entirely unique, without memorizing a complicated
                    </li>
                    scheme.
                    <li>You're concerned that bad developers like storing your passwords in plaintext.</li>
                    <li>You want *some* protection against phishing attacks.</li>
                    <li>You want the ability to log in to services on guest computers without installing software.</li>
                    <li>You have trust issues.</li>
                </ul>
                </p>
                <p>
                    You should <strong>NOT</strong> use Passbirb if:
                <ul>
                    <li><strong>You can't remember your master password</strong>, or will have trouble keeping it
                        secret.</li>
                    <li>You don't trust my code, and you haven't read through it and/or built it yourself (or you can
                        trust me, I promise it's good).</li>
                    <li>You aren't sure if I will keep my website up indefinitely, and you haven't made a local copy.
                    </li>
                    <li>You don't want to change your password on every website you use.</li>
                </ul>
                </p>
                <h2>How does it work?</h2>
                <p>The source code is available on GitHub, for more information consult the <a
                        href="https://github.com/expitau-dev/PasswordGenerator/blob/main/README.md">README</a></p>
                <h2>I have trust issues</h2>
                <p>This website loads several libraries and extra code to make it function smoothly. If this bothers
                    you, or you want a usage example for scripting purposes, see <a href="minimal.html">the
                        minimal version</a> </p>
            </div>
        </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    /* font-family: Arial, Helvetica, sans-serif; */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#main {
    margin: 0;
    padding: 2rem 0 2rem 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: fixed;
    overflow-y: auto;
}

.card {
    margin: 2rem;
    display: block;
    border-radius: 1rem;
    border: 0px solid;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    display: flex;
    flex-direction: column;
    padding: 0 20% 2rem 20%;
}

h1 {
    margin: 1rem auto;
    text-align: center;
    text-transform: uppercase;
    font-weight: lighter;
}

h3 {
    text-transform: uppercase;
    font-weight: lighter;
    font-size: small;
    margin: 0.8rem 0 0.4rem 0;
}

.result {
    overflow-wrap: break-word;
    width: fit-content;
    max-width: 100%;
    margin: 2rem auto 0;
    overflow: unset;
    padding: 0.2rem;
    border-radius: 0.3rem;
    white-space: normal;
    display: flex;
    flex-direction: row;

    div {
        margin: auto 1rem;
        overflow-x: auto;
        white-space: nowrap;
    }
}

.dropdown {
    position: relative;

    .dropdown-content {
        position: absolute;
        width: 100%;
        margin: 0.2rem 0rem;
        border-radius: 0.5rem;
        padding: 0.5rem 0rem;
        font-size: small;
        max-height: 12rem;
        overflow-y: auto;


        &>.dropdown-list {
            display: flex;
            flex-direction: row;
            // margin: 0rem 0.5rem;

            &>:first-child {
                text-align: left;
                flex: 1;
                padding: 1rem;
                height: 100%
            }

            &>:last-child {
                height: 100%;
                padding: 0.5rem auto;
            }

        }
    }

    // .item {
    //     display: flex;
    //     flex-direction: row;
    //     width: 100%;
    //     margin: 0 auto;

    //     :first-child {
    //         flex: 1;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: center;
    //         padding: 0rem 0rem 0rem 1rem;
    //     }
    // }
}

.textbox {
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
    /* padding-right: 1rem; */


}

.textbox>input {
    overflow-wrap: break-word;
    overflow: unset;
    min-width: 0;
    padding: 1rem;
    white-space: normal;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    flex: 1;
}

.textbox:focus-within {
    outline: solid;
}

svg {
    width: 1.3rem;
    height: 1.3rem;
    flex: none
}

button {
    border: none;
    margin: auto;
    background: none;
    padding: 0.5rem;
    cursor: pointer;
}

p {
    white-space: normal;
    margin: 0
}

#themeToggle {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0.2rem;
    margin: 1rem;
    z-index: 2;
}

#messageToast {
    opacity: 0;
    position: fixed;
    top: 0;
    padding: 1rem;
    margin: 1rem;
    z-index: 3;
    pointer-events: none;
    border-radius: 0.3rem;
}

.fade-in-out {
    opacity: 0;
    animation: fade 3s linear;
}

@keyframes fade {

    0%,
    100% {
        opacity: 0
    }

    5%,
    85% {
        opacity: 1
    }
}

@mixin colorTemplate($base, $background, $primary, $secondary, $accent) {
    background-color: $background;
    color: $primary;

    .card {
        background-color: $base;
    }

    h1 {
        color: $primary;
    }

    h2 {
        color: $secondary;
    }

    h3 {
        color: $primary;
    }

    .result {
        background-color: $accent;
        color: $primary;
    }

    .result>button>svg {
        color: $primary;
    }

    .textbox {
        background-color: $background;

        input {
            background-color: $background;
            color: $primary;
        }

        button {
            color: $primary;
        }
    }

    .dropdown-content {
        color: $secondary;
        background-color: $background;

        &>.dropdown-list {
            &:hover {
                background-color: $base;
            }
            button {
                color: $primary;
            }
            button:first-child {
                cursor: default;
            }
        }
    }

    svg {
        color: $primary;
    }

    #messageToast {
        background-color: $accent;
        color: $primary;
    }
}


#main.lightMode {
    @include colorTemplate(#ffffff, #eaeaea, #000000, #222222, #42cda1);

    .textbox.PasswordStrength0:focus-within {
        outline: solid #000000;
        color: #000000;
    }

    .textbox.PasswordStrength1:focus-within {
        outline: solid #cd4242;
        color: #cd4242;
    }

    .textbox.PasswordStrength2:focus-within {
        outline: solid #cd8742;
        color: #cd8742;
    }

    .textbox.PasswordStrength3:focus-within {
        outline: solid #cdcd42;
        color: #cdcd42;
    }

    .textbox.PasswordStrength4:focus-within {
        outline: solid #42cd42;
        color: #42cd42;
    }

}

#main.darkMode {
    @include colorTemplate(#262625, #1a1a1a, #ebebeb, #aaaaaa, #33be91);

    .textbox.PasswordStrength0:focus-within {
        outline: solid #ebebeb;
        color: #ebebeb;
    }

    .textbox.PasswordStrength1:focus-within {
        outline: solid #bd3232;
        color: #bd3232;
    }

    .textbox.PasswordStrength2:focus-within {
        outline: solid #bd7832;
        color: #bd7832;
    }

    .textbox.PasswordStrength3:focus-within {
        outline: solid #bdbd32;
        color: #bdbd32;
    }

    .textbox.PasswordStrength4:focus-within {
        outline: solid #32bd32;
        color: #32bd32;
    }
}

</style>
