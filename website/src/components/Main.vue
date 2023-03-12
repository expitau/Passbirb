<template>
  <div id="messageToast"></div>
  <div class="view main">
    <h1>Passbirb</h1>
    <!-- <h3 class="indicator">{{ Math.floor(passwordEntropy * 10) / 10 }}/24</h3> -->
    <div :style="{opacity: passwordIndicatorVisible ? '100%' : '0%'}" class="indicator">{{ passwordEntropyAsTime }}</div>
    <div class="textbox surface">
      <input @focus="passwordIndicatorVisible = true" @focusout="passwordIndicatorVisible = false" :type="passwordVisible ? 'text' : 'password'" @input="generate" v-model="masterPassword"
        placeholder="Enter the master password" />
      <button @click="passwordVisible = !passwordVisible">
        <span v-if="!passwordVisible" class="material-symbols-outlined svg">visibility</span>
        <span v-else class="material-symbols-outlined svg">visibility_off</span>
      </button>
    </div>
    <div class="dropdown surface">
      <div class="textbox">
        <input type="text" @keyup.enter="
          saveSalt();
        saltHistoryVisible = false" @input="generate" v-model="salt" @focus="saltHistoryVisible = true"
          @focusout="onDropdownUnfocused" placeholder="Enter a key (website name)" />
        <button @click="saltHistoryVisible = !saltHistoryVisible">
          <span v-if="!saltHistoryVisible" class="material-symbols-outlined svg">arrow_drop_down</span>
          <span v-else class="material-symbols-outlined svg">arrow_drop_up</span>
        </button>
      </div>
      <div v-if="saltHistoryVisible" class="dropdown-content">
        <div class="dropdown-list" v-if="historySearchResults.length > 0" v-for="item in historySearchResults">
          <button @click="
            salt = item.value;
          saltHistoryVisible = false;
          generate();
          saveSalt();">
            {{ item.value }}
          </button>
          <button @click="
            saltHistory.splice(item.idx, 1);
          saveAppState();">
            <span class="material-symbols-outlined svg">close</span>
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
    <div class="result" v-if="masterPassword.length > 0 && salt.length > 0">
      <div>{{ hashedPassword }}</div>
      <button @click="
        copyText(hashedPassword);
      saveSalt(); ">
        <span class="material-symbols-outlined svg">content_copy</span>
      </button>
    </div>
    <span v-if="!hasViewScrolled" class="expand material-symbols-outlined svg">expand_more</span>
  </div>
  <div class="view">
    <div class="about">
      <div class="about-flex">
        <div>
          <h1>About</h1>
          <div style="text-align: center;">
            This is a utility for managing website passwords without
            storing them in a file or database. Passbirb generates
            unique cryptographically-secure passwords on the fly
            without saving any information.
          </div>
        </div>
        <component :is="Codeblock" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Codeblock from './Codeblock.vue';
import { shallowRef } from 'vue';
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
  created() {
    document.getElementById('main').onscroll = () => {
      this.hasViewScrolled = true;
    };
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
      Codeblock: shallowRef(Codeblock),
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
  },
  computed: {
    passwordEntropy() {
      // @ts-ignore
      return window.zxcvbn(this.masterPassword).guesses_log10;
    },
    passwordEntropyAsTime() {
      let guesses = this.passwordEntropy
      const intervals = Object.entries({
        'milliseconds': 1,
        'seconds': 4,
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
      return (10**guesses).toFixed(1) + ' ' + currentTimescale
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

<style lang="scss">
#main {
  margin: 0;
  padding: 2rem 0 2rem 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;

  background-color: var(--md-background);
  color: var(--md-on-background);
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  transition: color 0.5s linear, background-color 0.5s linear;
  background: var(--md-scroll-thumb);
  border-radius: 0.5rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  transition: color 0.5s linear, background-color 0.5s linear;
  background: var(--md-scroll-thumb-hover);
}

.view {
  height: 70vh;
  width: 100%;
  margin: 10% 0 0 0;
  // padding: 0 15%;
  box-sizing: border-box;

  .about {
    margin: 10%;

    .about-flex {
      display: flex;
      flex-direction: row;
      gap: 5%;

      :first-child {
        flex: 2
      }

      :last-child {
        flex: 1
      }
    }
  }


  &.main>* {
    max-width: 30%;
    margin: 0 auto 3rem auto;
    min-width: 20rem;
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
    min-width: 15rem;
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
      .svg {
        color: var(--md-on-surface);
      }

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

  .surface {
    // color: var(--md-on-surface);
    background-color: var(--md-surface-1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-left: 1px solid var(--md-primary);
    border-radius: 0rem 1rem 0rem 0rem;
    box-sizing: border-box;
    z-index: 5;
  }

  .textbox {
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

.svg {
  color: var(--md-on-background);

  width: 1.3rem;
  height: 1.3rem;
  margin: 0.3rem;
  box-sizing: border-box;
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

#themeToggle {
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
