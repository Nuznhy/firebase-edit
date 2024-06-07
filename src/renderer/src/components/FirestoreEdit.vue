<template>
    <div class="flex flex-col h-full w-full justify-start">
        <div class="flex p-2">
            <input
                :class="inputClassName"
                :value="firestorePath"
                placeholder="Firestore path collectionName/docName"
                @input="onPathChange"
            />

            <select
                id="select-firebase-config"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseActionChange"
            >
                <option v-for="(action, index) in availableActions" :key="index" :value="JSON.stringify(action)">
                    {{ action.name }}
                </option>
            </select>
            <button :class="selectClassName" @click="handleFirestoreAction">Commit</button>
        </div>
        <div class="p-4 flex flex-col h-full w-full max-h-screen">
            <Editor v-model="currentEditorBuffer" :on-change="handleEditorInput" />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Editor from './Editor.vue';
import { twMerge } from 'tailwind-merge';
import { mapActions, mapGetters } from 'vuex';
import { FirestoreActionHistory } from '../store/modules/firestore/types';

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
                'bg-gray-700 bg-transparent border border-gray-500 max-w-44 text-amber-200 m-2 text-sm' +
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
    },
    data() {
        return {
            currentEditorBuffer: '{}'
        };
    },
    computed: {
        ...mapGetters('firestore', [
            'currentAction',
            'availableActions',
            'currentData',
            'changesHistory',
            'firestorePath'
        ])
    },
    methods: {
        ...mapActions('firestore', ['updateCurrentAction', 'updateCurrentData', 'addRecordToHistory', 'changePath']),

        async onPathChange(event: Event) {
            const target = event.target as HTMLInputElement;
            console.log(target.value);
            await this.changePath(target.value);
        },

        async onFirebaseActionChange(event: Event) {
            const target = event.target as HTMLSelectElement;
            await this.updateCurrentAction(JSON.parse(target.value));
        },

        async handleEditorInput(event: any) {
            await this.updateCurrentData(event.text);
        },

        async handleFirestoreAction() {
            if (this.currentAction.code === 'readDoc') {
                const [collection, doc] = this.firestorePath.split('/');
                const result = JSON.parse(await window.firestore.readDocument(collection, doc));

                this.currentEditorBuffer = JSON.stringify(result.data);
                await this.updateCurrentData(JSON.stringify(result.data));

                const historyRecord: FirestoreActionHistory = {
                    timestamp: new Date().toISOString(),
                    path: this.firestorePath,
                    action: this.currentAction.name,
                    before: JSON.stringify(result.data),
                    after: JSON.stringify(result.data),
                    difference: '',
                    setOptions: null
                };

                await this.addRecordToHistory(historyRecord);
                return;
            }
            if (this.currentAction.code === 'readCol') {
                return;
            }
            if (this.currentAction.code === 'updateDoc') {
                return;
            }
            if (this.currentAction.code === 'setDoc') {
                return;
            }
            if (this.currentAction.code === 'deleteDoc') {
                return;
            }
            return;
        }
    }
});
</script>
