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
            }, 1000);
        },
    },
};
</script>

<template>
    <div :class="{
        [darkMode ? 'darkMode' : 'lightMode']: true,
        transitioning: transitioning,
    }"></div>
    <button @click="changeTheme" v-if="darkMode" class="theme_toggle material-symbols-outlined svg">light_mode</button>
    <button @click="changeTheme" v-else="darkMode" class="theme_toggle material-symbols-outlined svg">dark_mode</button>
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
}

body:has(.transitioning), body:has(.transitioning) * {
    transition: color 0.5s linear, background-color 0.5s linear;
}
</style>
