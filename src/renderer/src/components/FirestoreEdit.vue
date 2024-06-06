<template>
    <div class="flex flex-col h-full w-full justify-start">
        <div class="flex p-2">
            <input :class="inputClassName" placeholder="Firestore path" required />

            <select
                id="select-firebase-config"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseConfigChange"
            >
                <option selected disabled>Select</option>
                <option v-for="(config, index) in availableConfigs" :key="index" :value="config">
                    {{ config }}
                </option>
            </select>
        </div>
        <div class="p-4 flex flex-col h-full w-full max-h-screen">
            <Editor />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Editor from './Editor.vue';
import { twMerge } from 'tailwind-merge';

export default defineComponent({
    name: 'FirestoreEdit',
    components: { Editor },
    props: {
        selectClass: {
            type: String,
            default: ''
        },
        inputClass: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const selectClassName = computed(() => {
            return twMerge(
                'bg-gray-700 bg-transparent border border-gray-500 max-w-40 text-amber-200 m-2 text-sm' +
                    'hover:border-grey-200 block w-full p-2 rounded-lg focus:outline-none focus:border-amber-200 ' +
                    'focus:ring-1 focus:ring-amber-500',
                props.selectClass
            );
        });
        const inputClassName = computed(() => {
            return twMerge(
                'm-2 p-2 w-full block bg-gray-700 bg-transparent border border-gray-500 text-amber-200 ' +
                    'text-sm focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-500 rounded-lg',
                props.inputClass
            );
        });
        return { selectClassName, inputClassName };
    }
});
</script>
