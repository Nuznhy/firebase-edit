<template>
    <CodeMirror
        basic
        dark
        tab
        :gutter="true"
        :lang="lang"
        :linter="linter"
        :theme="{ oneDark: oneDark }"
        :tab-size="4"
        :allow-multiple-selections="true"
        class="flex h-full w-full"
    >
        <pre>
{
  "key": "value"
}</pre
        >
    </CodeMirror>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CodeMirror from 'vue-codemirror6';
import { oneDark } from '@codemirror/theme-one-dark';
import type { LanguageSupport } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import type { ViewUpdate } from '@codemirror/view';

import { json, jsonParseLinter } from '@codemirror/lang-json';

export default defineComponent({
    name: 'Editor',
    components: { CodeMirror },
    setup() {
        const lang = json();
        const linter = jsonParseLinter();
        return { lang, linter, oneDark };
    }
});
</script>
