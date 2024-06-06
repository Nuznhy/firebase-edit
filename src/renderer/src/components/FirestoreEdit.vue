<template>
    <div class="flex flex-col h-full w-full justify-start">
        <input class="m-4" />
        <div class="p-4 flex flex-col h-full w-full max-h-screen">
            <Editor></Editor>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Editor from './Editor.vue';

export default defineComponent({
    name: 'FirestoreEdit',
    components: { Editor }
});
</script>
