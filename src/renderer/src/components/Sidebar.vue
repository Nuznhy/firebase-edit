<template>
    <div :class="sidebarClassName">
        <div id="add-config" :class="sideBarContentSeparationClassName">
            <input id="add-config-button" type="file" style="display: none" />
            <label for="add-config-button" class="text-amber-50">🛠️ Add config</label>
        </div>
        <div id="select-config" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="sr-only">Select config</label>
            <select
                id="select-firebase-config"
                v-model="selectedConfig"
                name="select-firebase-config"
                :class="selectClassName"
            >
                <option selected>⚙️ Select config</option>
                <option v-for="(config, index) in availableConfigsList" :key="index" :value="config.path">
                    {{ config.name }}
                </option>
            </select>
        </div>
        <div id="select-firebase-editable-module" :class="sideBarContentSeparationClassName">
            <span>select-firebase-editable-module</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { twMerge } from 'tailwind-merge';

export default defineComponent({
    name: 'Sidebar',
    components: {},
    props: {
        sidebarClass: {
            type: String,
            default: ''
        },
        sideBarContentSeparationClass: {
            type: String,
            default: ''
        },
        selectClass: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const sidebarClassName = computed(() => {
            return twMerge(
                'flex flex-col h-screen justify-beetween w-[250px] mt-8 h-[100vh + 10px] overflow-auto',
                props.sidebarClass
            );
        });
        const sideBarContentSeparationClassName = computed(() => {
            return twMerge('p-2 border-b-2 border-gray-600', props.sideBarContentSeparationClass);
        });
        const selectClassName = computed(() => {
            return twMerge(
                'block py-2.5 px-0 w-full text-amber-50 bg-transparent appearance-none ' +
                    'dark:text-amber-50 dark:border-gray-700 focus:outline-none focus:ring-0 peer',
                props.selectClass
            );
        });
        return {
            sideBarContentSeparationClassName,
            sidebarClassName,
            selectClassName
        };
    },
    data: () => {
        return {
            availableConfigs: [
                { name: 'remomedi-hub-dev', path: '/home/blablaA.json' },
                { name: 'remomedi-hub', path: '/home/blablaB.json' },
                { name: 'apoteket-hamta-dev', path: '/home/blablaC.json' }
            ],
            selectedConfig: '⚙️ Select config',
            firebaseModulesForEdit: ['database', 'firestore', 'auth']
        };
    },
    computed: {
        availableConfigsList() {
            return this.availableConfigs;
        }
    }
});
</script>
