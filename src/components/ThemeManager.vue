<script>
let timerID = undefined;
export default {
    data() {
        return {
            darkMode: true,
            transitioning: false,
        };
    },
    methods: {
        changeTheme() {
            this.darkMode = !this.darkMode;
            this.transitioning = true;
            clearTimeout(timerID);
            timerID = setTimeout(() => {
                this.transitioning = false;
            }, 3000);
        },
    },
    watch: {
        darkMode(newValue) {
            document.body.classList.toggle('darkMode', newValue);
            document.body.classList.toggle('lightMode', !newValue);
        },
        transitioning(newValue) {
            document.body.classList.toggle('transitioning', newValue);
        }
    },
    mounted() {
        // Initial class setup based on the initial data values
        document.body.classList.toggle('darkMode', this.darkMode);
        document.body.classList.toggle('lightMode', !this.darkMode);
        document.body.classList.toggle('transitioning', this.transitioning);
    },
};
</script>
<script setup>
import icons from '../helpers/icons'
</script>

<template>
    <button @click="changeTheme" v-if="darkMode" class="theme_toggle">
        <icons.light_mode />
    </button>
    <button @click="changeTheme" v-else="darkMode" class="theme_toggle material-symbols-outlined">
        <icons.dark_mode />
    </button>
</template>

<style lang="scss">
@use "sass:meta";

body.lightMode {
    --md-background: #fafafa;
    --md-surface-0: #ffffff;
    --md-surface-1: #ffffff;
    --md-surface-2: #ffffff;
    --md-surface-3: #ffffff;
    --md-primary: #6200ee;
    --md-secondary: #000000;
    --md-on-background: #000000;
    --md-on-surface: #000000;
    --md-on-primary: #ffffff;
    --md-on-secondary: #000000;
    --md-scroll-thumb: #888888;
    --md-scroll-thumb-hover: #666666;
    --md-error: #b00020;

    @include meta.load-css("highlight.js/styles/github.css")
}

body.darkMode {
    --md-background: #121212;
    --md-surface-0: #1e1e1e;
    --md-surface-1: #232323;
    --md-surface-2: #252525;
    --md-surface-3: #272727;
    --md-primary: #bb86fc;
    --md-secondary: #bb86fc;
    --md-on-background: #ffffff;
    --md-on-surface: #ffffff;
    --md-on-primary: #000000;
    --md-on-secondary: #000000;
    --md-scroll-thumb: #444444;
    --md-scroll-thumb-hover: #666666;
    --md-error: #cf6679;

    @include meta.load-css("highlight.js/styles/github-dark.css")
}

body.transitioning,
body.transitioning * {
    transition: color 1s linear, background-color 1s linear;
}

// .theme_toggle svg {
//     fill: yellow !important
// }
</style>
