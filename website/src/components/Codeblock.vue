<script>
import Prism from 'prismjs';


export default {
    data() {
        let template = `console.log(x)`;
        let content = Prism.highlight(template, Prism.languages.javascript, 'javascript');
        console.log(content)
        return {
            content
        }
    }
}
</script>

<template>
    <link rel="stylesheet" href="/Passbirb/prism.css">
    <pre v-html="content"></pre>
</template>
