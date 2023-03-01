<script lang="ts">
const VERSION_ID = '0.4.1';

// Service to compute hashes in non-blocking thread
let backgroundServiceWorker;

if (window.Worker) {
    backgroundServiceWorker = new Worker('background.js');
}

function saveLocalStorage(state) {
    localStorage.setItem(
        'state',
        JSON.stringify({ ...state, version: VERSION_ID })
    );
}

function loadLocalStorage() {
    let state = JSON.parse(localStorage.getItem('state'));
    if (state?.version == VERSION_ID) {
        return state;
    } else {
        localStorage.clear();
        return null;
    }
}

function showMessage(message) {
    let el = document.getElementById('messageToast');
    el.innerHTML = message;
    el.classList.remove('fade-in-out');
    window.requestAnimationFrame(() => {
        el.classList.add('fade-in-out');
    });
}

export default {
    data() {
        return {
            masterPassword: '',
            passwordVisible: false,
            saltHistoryVisible: false,
            saltHistory: [],
            salt: '',
            hashedPassword: '',
            darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            ...loadLocalStorage(),
        };
    },
    methods: {
        generate() {
            if (this.masterPassword.length == 0 || this.salt.length == 0) {
                this.hashedPassword = '';
                return;
            }
            if (backgroundServiceWorker) {
                backgroundServiceWorker.onmessage ??= (e) => {
                    this.hashedPassword = e.data;
                };
                backgroundServiceWorker.postMessage([
                    this.masterPassword,
                    this.salt,
                ]);
            } else {
                window
                    // @ts-ignore
                    .generatePassword(this.masterPassword, this.salt)
                    .then((res) => (this.hashedPassword = res));
            }
        },
        saveSalt() {
            this.saltHistory.unshift(this.salt);
            this.saltHistory = this.saltHistory.filter((c, index) => {
                return this.saltHistory.indexOf(c) == index && c != '';
            });
            this.saveAppState();
        },
        copyText(text) {
            navigator.clipboard.writeText(text);
            showMessage('Copied to clipboard!');
        },
        getAppState() {
            return {
                saltHistory: this.saltHistory,
            };
        },
        onDropdownUnfocused(e) {
            this.saveSalt();
            if (
                e?.relatedTarget &&
                Array.from(document.getElementsByClassName('dropdown')).some(
                    (x) => x.contains(e.relatedTarget)
                )
            ) {
                return;
            }
            this.saltHistoryVisible = false;
        },
        saveAppState(state = undefined) {
            return saveLocalStorage(state || this.getAppState());
        },
        guessTime(x) {
            let y = x;

            if (x < 4) {
                return `instantlys ${y}`;
            }
            x -= 4;

            if (x < 1.778) {
                return `${Math.round(10 ** x * 10) / 10} seconds ${y}`;
            }
            x -= 1.778;

            if (x < 1.38) {
                return `${Math.round(10 ** x * 10) / 10} minutes ${y}`;
            }
            x -= 1.38;

            if (x < 0.845) {
                return `${Math.round(10 ** x * 10) / 10} hours ${y}`;
            }
            x -= 0.845;

            if (x < 2.562) {
                return `${Math.round(10 ** x * 10) / 10} days ${y}`;
            }
            x -= 2.562;

            if (x < 3) {
                return `${Math.round(10 ** x * 10) / 10} years ${y}`;
            }
            x -= 3;

            if (x < 3) {
                return `${Math.round(10 ** x * 10) / 10} thousand years ${y}`;
            }
            x -= 3;

            if (x < 3) {
                return `${Math.round(10 ** x * 10) / 10} million years ${y}`;
            }
            x -= 3;

            if (x < 3) {
                return `${Math.round(10 ** x * 10) / 10} billion years ${y}`;
            }
            x -= 3;

            if (x < 3) {
                return `${Math.round(10 ** x * 10) / 10} trillion years ${y}`;
            }
            x -= 3;

            return `never`;
        },
    },
    computed: {
        passwordEntropy() {
            // @ts-ignore
            return window.zxcvbn(this.masterPassword).guesses_log10;
        },
        historySearchResults() {
            return this.saltHistory
                .map((value, idx) => ({ value, idx }))
                .filter((x) =>
                    x.value.toLowerCase().includes(this.salt.toLowerCase())
                )
                .sort((a, b) => {
                    if (
                        a.value.toLowerCase().indexOf(this.salt.toLowerCase()) >
                        b.value.toLowerCase().indexOf(this.salt.toLowerCase())
                    ) {
                        return 1;
                    } else if (
                        a.value.toLowerCase().indexOf(this.salt.toLowerCase()) <
                        b.value.toLowerCase().indexOf(this.salt.toLowerCase())
                    ) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
        },
    },
};
</script>

<template>
    <div id="messageToast"></div>
    <div class="card">
        <h1>PassBirb Generator</h1>
        <div
            style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            "
        >
            <h3>Master Password</h3>
            <h3 class="indicator">{{ guessTime(passwordEntropy) }}</h3>
        </div>
        <div
            class="textbox"
            :class="{
                PasswordStrength0: passwordEntropy == 0,
                PasswordStrength1: passwordEntropy > 0 && passwordEntropy < 12,
                PasswordStrength2:
                    passwordEntropy >= 12 && passwordEntropy < 18,
                PasswordStrength3:
                    passwordEntropy >= 18 && passwordEntropy < 24,
                PasswordStrength4: passwordEntropy >= 24,
            }"
        >
            <input
                :type="passwordVisible ? 'text' : 'password'"
                @input="generate"
                v-model="masterPassword"
                placeholder="Enter the master password"
            />
            <button @click="passwordVisible = !passwordVisible">
                <svg
                    v-if="!passwordVisible"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                </svg>
            </button>
        </div>
        <h3>Key</h3>
        <div class="dropdown">
            <div class="textbox">
                <input
                    type="text"
                    @keyup.enter="
                        saveSalt();
                        saltHistoryVisible = false;
                    "
                    @input="generate"
                    v-model="salt"
                    @focus="saltHistoryVisible = true"
                    @focusout="onDropdownUnfocused"
                    placeholder="Enter a key (website name)"
                />
                <button @click="saltHistoryVisible = !saltHistoryVisible">
                    <svg
                        v-if="!saltHistoryVisible"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </button>
            </div>
            <div v-if="saltHistoryVisible" class="dropdown-content">
                <div
                    class="dropdown-list"
                    v-if="historySearchResults.length > 0"
                    v-for="item in historySearchResults"
                >
                    <button
                        @click="
                            salt = item.value;
                            saltHistoryVisible = false;
                            generate();
                            saveSalt();
                        "
                    >
                        {{ item.value }}
                    </button>
                    <button
                        @click="
                            saltHistory.splice(item.idx, 1);
                            saveAppState();
                        "
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div v-else-if="saltHistory.length > 0" style="padding: 0.5rem">
                    No results
                </div>
                <div v-else style="padding: 0.5rem">
                    No items to show in history
                </div>
            </div>
        </div>
        <pre class="result" v-if="masterPassword.length > 0 && salt.length > 0">
                      <div>{{ hashedPassword }}</div> 
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
        <p>
            This is a stateless password manager, a utility for managing website
            passwords without storing them in a database or file. Unlike
            traditional password alternatives that keep your passwords on your
            computer (or worse, in the cloud), Passbirb will regenerate the same
            unique password anytime you want to login on a new device.
        </p>
        <h2>Who is this for?</h2>
        <p>You should use Passbirb if:</p>
        <ul>
            <li>
                You want your password for every website to be entirely unique,
                without memorizing a complicated
            </li>
            scheme.
            <li>
                You're concerned that bad developers like storing your passwords
                in plaintext.
            </li>
            <li>You want *some* protection against phishing attacks.</li>
            <li>
                You want the ability to log in to services on guest computers
                without installing software.
            </li>
            <li>You have trust issues.</li>
        </ul>
        <p>You should <strong>NOT</strong> use Passbirb if:</p>

        <ul>
            <li>
                <strong>You can't remember your master password</strong>, or
                will have trouble keeping it secret.
            </li>
            <li>
                You don't trust my code, and you haven't read through it and/or
                built it yourself (or you can trust me, I promise it's good).
            </li>
            <li>
                You aren't sure if I will keep my website up indefinitely, and
                you haven't made a local copy.
            </li>
            <li>
                You don't want to change your password on every website you use.
            </li>
        </ul>
        <h2>How does it work?</h2>
        <p>
            The source code is available on GitHub, for more information consult
            the
            <a
                href="https://github.com/expitau-dev/PasswordGenerator/blob/main/README.md"
                >README</a
            >
        </p>
        <h2>I have trust issues</h2>
        <p>
            This website loads several libraries and extra code to make it
            function smoothly. If this bothers you, or you want a usage example
            for scripting purposes, see
            <a href="minimal.html">the minimal version</a>
        </p>
    </div>
</template>

<style lang="scss">
#main {
  margin: 0;
  padding: 2rem 0 2rem 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  overflow-y: auto;

  background-color: var(--md-background);
  color: var(--md-on-background);
}

.card {
  background-color: var(--md-surface-0);
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
  color: var(--md-on-surface);
  margin: 1rem auto;
  text-align: center;
  text-transform: uppercase;
  font-weight: lighter;
}

h2 {
  color: var(--md-on-surface);
}

h3 {
  color: var(--md-on-surface);
  text-transform: uppercase;
  font-weight: lighter;
  font-size: small;
  margin: 0.8rem 0 0.4rem 0;
}

.result {
  background-color: var(--md-primary);
  color: var(--md-on-primary);
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

  button>svg {
    color: var(--md-on-primary);
  }
}

.dropdown {
  position: relative;

  .dropdown-content {
    color: var(--md-on-surface);
    background-color: var(--md-surface-1);
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

      &:hover {
        background-color: var(--md-surface-2);
      }

      button {
        color: var(--md-on-surface);
      }

      button:first-child {
        cursor: default;
      }

      &> :first-child {
        text-align: left;
        flex: 1;
        padding: 1rem;
        height: 100%;
      }

      &> :last-child {
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
  background-color: var(--md-surface-1);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0 auto;
  /* padding-right: 1rem; */

  input {
    background-color: var(--md-surface-1);
    color: var(--md-on-surface);

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

  button {
    color: var(--md-on-surface);
  }

  &:focus-within {
    outline: solid;
  }
}

svg {
  color: var(--md-on-background);

  width: 1.3rem;
  height: 1.3rem;
  flex: none;
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
  margin: 0;
}

.textbox.PasswordStrength0:focus-within {
  outline: solid var(--password-0);
  color: var(--password-0);
}

.textbox.PasswordStrength1:focus-within {
  outline: solid var(--password-1);
  color: var(--password-1);
}

.textbox.PasswordStrength2:focus-within {
  outline: solid var(--password-2);
  color: var(--password-2);
}

.textbox.PasswordStrength3:focus-within {
  outline: solid var(--password-3);
  color: var(--password-3);
}

.textbox.PasswordStrength4:focus-within {
  outline: solid var(--password-4);
  color: var(--password-4);
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
  background-color: var(--md-secondary);
  color: var(--md-on-secondary);

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
    opacity: 0;
  }

  5%,
  85% {
    opacity: 1;
  }
}
</style>
