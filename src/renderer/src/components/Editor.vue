<template>
    <codemirror
        v-model="code"
        wrap
        placeholder="Json goes here..."
        :style="{
            backgroundColor: 'rgb(24 24 27 / 0.4) !important',
            maxHeight: '80%'
        }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="4"
        :extensions="extensions"
        :linter="linter"
        :lang="lang"
        :gutter="true"
        @ready="handleReady"
    ></codemirror>
</template>
<!--@change="log('change', $event)"-->
<!--@focus="log('focus', $event)"-->
<!--@blur="log('blur', $event)"-->
<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue';
import { basicSetup } from 'codemirror';
import Codemirror from 'vue-codemirror6';
import { keymap } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentWithTab } from '@codemirror/commands';
import { json, jsonParseLinter } from '@codemirror/lang-json';

export default defineComponent({
    name: 'Editor',
    components: {
        Codemirror
    },
    setup() {
        const code = ref(`{}`);
        const extensions = [basicSetup, oneDark, keymap.of([indentWithTab])];
        const linter = jsonParseLinter();
        const lang = json();
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
            lang,
            handleReady,
            log: console.log,
            getCodemirrorStates
        };
    }
});
</script>
