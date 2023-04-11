<script>
import Prism from 'prismjs';


export default {
    data() {
        let template = `(() => {console.log('Bookmarklet coming soon!')}()`;
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
    <div style="background-color: var(--md-surface-0); padding: 2rem; border-radius: 1rem; overflow:auto;">
        <pre v-html="content"></pre>
    </div>
</template>
