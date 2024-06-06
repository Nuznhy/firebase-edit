<template>
    <codemirror
        v-model="code"
        placeholder="Json goes here..."
        :style="{
            backgroundColor: 'rgb(24 24 27 / 0.4) !important',
            maxHeight: '80%'
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
    ></codemirror>
</template>

<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { EditorState } from '@codemirror/state';
import { EditorView } from 'codemirror';

export default defineComponent({
    name: 'Editor',
    components: {
        Codemirror
    },
    setup() {
        const code = ref(``);
        const extensions = [json(), oneDark, autocompletion()];
        const linter = jsonParseLinter();
        const view = shallowRef();
        const handleReady = (payload: any) => {
            view.value = payload.view;
        };

        const getCodemirrorStates = () => {
            const state = view.value.state;
            const editorClass = view.value.editorAttrs.class;
            const ranges = state.selection.ranges;
            const selected = ranges.reduce((r: any, range: any) => r + range.to - range.from, 0);
            const cursor = ranges[0].anchor;
            const length = state.doc.length;
            const lines = state.doc.lines;
            return { state, ranges, selected, cursor, length, lines, editorClass };
        };

        return {
            code,
            extensions,
            linter,
            handleReady,
            log: console.log
        };
    }
});
</script>
