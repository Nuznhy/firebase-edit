<template>
    <JsonEditorVue
        :mode="Mode.text"
        :main-menu-bar="true"
        :ask-to-format="true"
        style="--jse-theme-color: rgb(63 63 70 / 0.5); --jse-background-color: rgb(63 63 70 / 0.5)"
        class="jse-theme-dark"
    ></JsonEditorVue>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import JsonEditorVue from 'json-editor-vue';
import { Mode } from 'vanilla-jsoneditor';
import { JSONEditor } from 'vanilla-jsoneditor';

import 'vanilla-jsoneditor/themes/jse-theme-dark.css';

export default defineComponent({
    name: 'Editor',
    components: { JsonEditorVue },
    setup() {
        const code = ref(`{}`);

        return {
            code,
            Mode,
            log: console.log
        };
    }
});
</script>
