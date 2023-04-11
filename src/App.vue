<script setup>
import ThemeManager from './components/ThemeManager.vue'
import Main from './components/Main.vue'
</script>
    
<template>
  <ThemeManager></ThemeManager>
  <Main></Main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0");

:root {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
  /* font-family: Arial, Helvetica, sans-serif; */
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  font-family: "Inter", sans-serif;
  font-weight: 400;
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 24;
}
</style>
