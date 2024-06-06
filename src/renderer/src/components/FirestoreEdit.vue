<template>
    <Editor></Editor>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Editor from './Editor.vue';

export default defineComponent({
    name: 'FirestoreEdit',
    components: { Editor }
});
</script>
