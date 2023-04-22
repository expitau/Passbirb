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
};
</script>
<script setup>
import icons from './icons'
</script>

<template>
    <div :class="{
        [darkMode ? 'darkMode' : 'lightMode']: true,
        transitioning: transitioning,
    }"></div>
    <!-- <button @click="changeTheme" v-if="darkMode" class="theme_toggle svg"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24" fill="currentColor"><path d="M480 696q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 40q-66.846 0-113.423-46.577T320 576q0-66.846 46.577-113.423T480 416q66.846 0 113.423 46.577T640 576q0 66.846-46.577 113.423T480 736ZM80 596q-8.5 0-14.25-5.758T60 575.973q0-8.512 5.75-14.242Q71.5 556 80 556h100q8.5 0 14.25 5.758t5.75 14.269q0 8.512-5.75 14.242Q188.5 596 180 596H80Zm700 0q-8.5 0-14.25-5.758T760 575.973q0-8.512 5.75-14.242Q771.5 556 780 556h100q8.5 0 14.25 5.758t5.75 14.269q0 8.512-5.75 14.242Q888.5 596 880 596H780ZM479.973 296q-8.512 0-14.242-5.75Q460 284.5 460 276V176q0-8.5 5.758-14.25 5.757-5.75 14.269-5.75t14.242 5.75Q500 167.5 500 176v100q0 8.5-5.758 14.25-5.757 5.75-14.269 5.75Zm0 700q-8.512 0-14.242-5.75Q460 984.5 460 976V876q0-8.5 5.758-14.25 5.757-5.75 14.269-5.75t14.242 5.75Q500 867.5 500 876v100q0 8.5-5.758 14.25-5.757 5.75-14.269 5.75ZM254.461 377.231l-57.615-55.846q-5.846-5.616-5.731-13.77.116-8.154 5.965-14.769 6.381-6.615 14.151-6.615 7.769 0 14.154 6.615L282 349.692q6.385 6.616 6.385 14.154 0 7.539-6 14.154t-13.654 6.115q-7.654-.5-14.27-6.884Zm480.154 481.923L678 802.308q-6.385-6.616-6.385-14.269 0-7.654 6.385-14.039 5.231-6.615 13.077-6.115t14.462 6.884l57.615 55.846q5.846 5.616 5.731 13.77-.116 8.154-5.965 14.769-6.381 6.615-14.151 6.615-7.769 0-14.154-6.615ZM678 378.385q-6.615-6-6.115-13.654t6.884-14.27l55.846-57.615q5.616-5.846 13.77-5.731 8.154.116 14.769 5.965 6.615 6.381 6.615 14.151 0 7.769-6.615 14.154L706.308 378q-6.616 6.385-14.154 6.385-7.539 0-14.154-6ZM196.846 859.321q-6.615-6.782-6.615-14.552 0-7.769 6.615-14.154L253.692 774q6.616-6.385 14.269-6.385 7.654 0 14.039 6.385 5.846 5.231 5.346 13.077t-6.115 14.462l-55.846 57.615q-6.385 6.615-14.154 6.5-7.77-.115-14.385-6.333ZM480 576Z"/></svg>
</button> -->
    <button @click="changeTheme" v-if="darkMode" class="theme_toggle">
        <icons.light_mode />
    </button>
    <button @click="changeTheme" v-else="darkMode" class="theme_toggle material-symbols-outlined"><icons.dark_mode /></button>
    <!-- <div :class="{
            [darkMode ? 'darkMode' : 'lightMode']: true,
            transitioning: transitioning,
        }">
            <div id="main"> -->
    <!-- <slot /> -->
    <!-- </div>
        </div> -->
</template>

<style lang="scss">
@use "sass:meta";

body:has(.lightMode) {
    --md-background: #eeeeee;
    --md-surface-0: #ffffff;
    --md-surface-1: #ffffff;
    --md-surface-2: #ffffff;
    --md-surface-3: #ffffff;
    --md-primary: #6200ee;
    --md-secondary: #03dac6;
    --md-on-background: #000000;
    --md-on-surface: #000000;
    --md-on-primary: #ffffff;
    --md-on-secondary: #000000;
    --md-scroll-thumb: #888888;
    --md-scroll-thumb-hover: #666666;

    @include meta.load-css("highlight.js/styles/github.css")
}

body:has(.darkMode) {
    --md-background: #121212;
    --md-surface-0: #1e1e1e;
    --md-surface-1: #232323;
    --md-surface-2: #252525;
    --md-surface-3: #272727;
    --md-primary: #bb86fc;
    --md-secondary: #03dac6;
    --md-on-background: #ffffff;
    --md-on-surface: #ffffff;
    --md-on-primary: #000000;
    --md-on-secondary: #000000;
    --md-scroll-thumb: #444444;
    --md-scroll-thumb-hover: #666666;

    @include meta.load-css("highlight.js/styles/github-dark.css")
}

body:has(.transitioning),
body:has(.transitioning) * {
    transition: color 1s linear, background-color 1s linear;
}

// .theme_toggle svg {
//     fill: yellow !important
// }
</style>
