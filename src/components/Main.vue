<template>
  <div id="messageToast"></div>
  <section class="section_main">
    <h1>Passbirb</h1>
    <div :style="{ opacity: passwordIndicatorVisible ? '100%' : '0%' }" class="indicator">{{ passwordEntropyAsTime }}
    </div>
    <div class="section_main__password">
      <input @focus="passwordIndicatorVisible = true" @focusout="passwordIndicatorVisible = false"
        :type="passwordVisible ? 'text' : 'password'" @input="generate" v-model="masterPassword"
        placeholder="Enter the master password" />
      <button @click="passwordVisible = !passwordVisible" v-if="!passwordVisible" class="svg">
        <icons.visibility />
      </button>
      <button @click="passwordVisible = !passwordVisible" v-else class="svg">
        <icons.visibility_off />
      </button>
    </div>
    <div class="section_main__salt dropdown">
      <div class="section_main__salt_input">
        <input type="text" @keyup.enter="saveSalt();
        saltHistoryVisible = false" @input=" generate " v-model="salt" @focus=" saltHistoryVisible = true "
          @focusout=" onDropdownUnfocused " placeholder="Enter a key (website name)" />
        <button @click=" saltHistoryVisible = !saltHistoryVisible " v-if=" !saltHistoryVisible " class="svg">
          <icons.arrow_drop_down />
        </button>
        <button @click=" saltHistoryVisible = !saltHistoryVisible " v-else class="svg">
          <icons.arrow_drop_up />
        </button>
      </div>
      <div v-if=" saltHistoryVisible " class="dropdown-content">
        <div class="dropdown-list" v-if=" historySearchResults.length > 0 "
          v-for="                   item                    in                    historySearchResults                   ">
          <button @click="
            salt = item.value;
            saltHistoryVisible = false;
            generate();
            saveSalt();
          ">
            {{ item.value }}
          </button>
          <button @click="
            saltHistory.splice(item.idx, 1);
            saveAppState();
          ">
            <span class="svg">
              <icons.close />
            </span>
          </button>
        </div>
        <div v-else-if=" saltHistory.length > 0 " style="padding: 0.5rem">
          No results
        </div>
        <div v-else style="padding: 0.5rem">
          No items to show in history
        </div>
      </div>
    </div>
    <div class="result" v-if=" masterPassword.length > 0 && salt.length > 0 ">
      <div>{{ hashedPassword }}</div>
      <button @click="
        copyText(hashedPassword);
        saveSalt();
      " class="svg">
        <icons.content_copy />
      </button>
    </div>
    <div style="height: 8rem"></div>
    <span v-if=" !hasViewScrolled " class="expand svg">
      <icons.expand_more />
    </span>
  </section>

  <section class="section_about about">
    <div>
      <h1>About</h1>
      <div style="text-align: center;">
        This is a utility for managing website passwords without
        storing them in a file or database. Passbirb generates
        unique cryptographically-secure passwords on the fly
        without saving any information.
      </div>
    </div>
    <pre
      class="code_block"> <code class='language-javascript' >(() => {console.log('Bookmarklet coming soon!')}())</code></pre>
  </section>
</template>

<script>
import zxcvbn from 'zxcvbn';

import generatePassword from './password.js'

import backgroundWorker from './background.js?worker'
const VERSION_ID = '0.4.1';

// Service to compute hashes in non-blocking thread
let backgroundServiceWorker;

if (window.Worker) {
  try {
    backgroundServiceWorker = new backgroundWorker();
  } catch (error) {
    console.log(`Unable to load service worker:\n${error}`);
  }
}

function saveLocalStorage(state) {
  try {
    localStorage.setItem(
      'state',
      JSON.stringify({ ...state, version: VERSION_ID })
    );
  } catch {
    console.log("Unable to set local storage");
  }
}

function loadLocalStorage() {
  try {
    let state = JSON.parse(localStorage.getItem('state'));
    if (state?.version == VERSION_ID) {
      return state;
    } else {
      localStorage.clear();
      return null;
    }
  } catch {
    console.log("Unable to set local storage");
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
  created() {
    // document.getElementById('main').onscroll = () => {
    //   this.hasViewScrolled = true;
    // };
  },
  data() {
    return {
      masterPassword: '',
      passwordVisible: false,
      saltHistoryVisible: false,
      saltHistory: [],
      salt: '',
      hashedPassword: '',
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      hasViewScrolled: false,
      passwordIndicatorVisible: false,
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
        generatePassword(this.masterPassword, this.salt)
          .then((res) => {this.hashedPassword = res});
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
  },
  computed: {
    passwordEntropy() {
      return zxcvbn(this.masterPassword).guesses_log10;
    },
    passwordEntropyAsTime() {
      let guesses = this.passwordEntropy
      const intervals = Object.entries({
        'milliseconds': 1,
        'seconds': 3,
        'minutes': 1.778,
        'hours': 1.778,
        'days': 1.38,
        'months': 1.483,
        'years': 1.079,
        'thousand years': 3,
        'million years': 3,
        'billion years': 3,
        'trillion years': 3,
        'quadrillion years': 3,
        'quintillion years': 3,
      })
      let currentTimescale = null
      for (let i = 0; i < intervals.length; i++) {
        if (guesses < intervals[i][1]) {
          break
        }
        guesses -= intervals[i][1]
        currentTimescale = intervals[i][0]
      }

      if (!currentTimescale) {
        return 'instantly'
      }
      if (guesses > 3) {
        return `${Math.floor(10 ** ((guesses + 18) % 1))}e${Math.floor(guesses + 18)} years`
      }
      return (10 ** guesses).toFixed(1) + ' ' + currentTimescale
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

<script setup>
import icons from './icons'
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 0 auto;

  background-color: var(--md-background);

  * {
    color: var(--md-on-background);
  }
}

#app {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
}

/* width */
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  transition: color 0.5s linear, background-color 0.5s linear;
  background: var(--md-scroll-thumb);
  border-radius: 0.25rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  transition: color 0.5s linear, background-color 0.5s linear;
  background: var(--md-scroll-thumb-hover);
}

section {
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 600px) {
    padding: 0 1rem;
  }

  padding: 0 20%;

  .language-javascript {
    background-color: var(--md-surface-1) !important;
  }

  &.section_about {
    padding: 10%;

    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
    }


    height: fit-content;
    gap: 2rem;

    :first-child {
      flex: 2;
    }

    :last-child {
      flex: 1;
    }
  }


  &.section_main {
    &>* {
      // max-width: 40%;
      // margin: 0 auto 3rem auto;
      // min-width: 18rem;
      width: 100%;
      margin: 1.5rem auto;
    }
  }

  h1 {
    color: var(--md-on-background);
    font-weight: 400;
    margin: 1rem auto;
    text-align: center;
    font-size: 48px;
  }

  h2 {
    color: var(--md-on-background);
    font-weight: 400;
  }

  h3 {
    color: var(--md-on-background);
    font-weight: 400;
    text-transform: uppercase;
    font-size: small;
    margin: 0.8rem 0 0.4rem 0;
  }

  .result {
    background-color: var(--md-surface-1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border: 1px solid var(--md-primary);
    margin: 2rem auto 0;
    min-width: 16rem;
    max-width: 15%;
    overflow: unset;
    padding: 0.2rem;
    border-radius: 1rem;
    white-space: normal;
    display: flex;
    flex-direction: row;
    font-size: small;

    div {
      color: var(--md-on-surface);
      margin: auto 1rem;
      overflow-x: auto;
      white-space: nowrap;
      flex: 1;
      text-align: center;
    }

    button {
      color: var(--md-on-surface);
      width: fit-content;
      height: fit-content;

      flex: 0;
      margin: 0;
    }
  }

  .indicator {
    margin: 0.5rem auto;
    text-align: center;
    font-size: x-small;
    background-color: var(--md-surface-1);

    max-width: unset;
    min-width: unset;
    width: fit-content;
    padding: 0.5rem;
    border-radius: 0.5rem;

    transition: opacity 0.2s linear;
  }

  .section_main__password,
  .section_main__salt {
    // color: var(--md-on-surface);
    background-color: var(--md-surface-1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-left: 1px solid var(--md-primary);
    border-radius: 0rem 1rem 0rem 0rem;
    box-sizing: border-box;
    z-index: 5;
  }

  .section_main__password,
  .section_main__salt_input {
    display: flex;
    flex-direction: row;

    input {
      background: none;
      color: var(--md-on-surface);

      overflow-wrap: break-word;
      overflow: unset;
      min-width: 0;
      padding: 1rem;
      white-space: normal;
      border: none;
      outline: none;
      border-radius: 0.2rem;
      flex: 1;
    }

    button {
      border-radius: 0.2rem;
      color: var(--md-on-surface);
      width: fit-content;
      height: fit-content;
    }
  }

  .dropdown-list {
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

  .dropdown {
    position: relative;

    .dropdown-content {
      color: var(--md-on-surface);
      background-color: var(--md-surface-1);
      position: absolute;
      width: 100%;
      margin: 0.2rem 0rem;
      border-radius: 0rem 0rem 0.2rem 0.2rem;
      padding: 0rem 0rem;
      font-size: small;
      max-height: 12rem;
      overflow-y: auto;


      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
        0 3px 6px rgba(0, 0, 0, 0.23);
      z-index: -1;


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
  }

  .expand {
    position: fixed;
    bottom: 2rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    text-align: center;
    animation: drop 3s ease-in-out infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(-1rem);
      opacity: 0%;
    }

    20% {
      opacity: 100%;
    }

    80% {
      opacity: 0%;
      transform: translateY(1rem);
    }

    100% {
      opacity: 0%;
    }
  }
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

.theme_toggle {
  // color: var(--md-on-background);
  // color: yellow;

  position: absolute;
  top: 0;
  left: 0;
  padding: 0.2rem;
  margin: 1rem;
  z-index: 2;
}

#messageToast {
  background-color: var(--md-primary);
  color: var(--md-on-primary);

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
