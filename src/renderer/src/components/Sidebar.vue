<template>
    <div :class="sidebarClassName">
        <div id="add-config" :class="sideBarContentSeparationClassName">
            <input id="add-config-button" type="file" style="display: none" />
            <label for="add-config-button" class="text-amber-50">🛠️ Add config</label>
        </div>
        <div id="select-config" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white"
                >⚙️ Select config</label
            >
            <select
                id="select-firebase-config"
                v-model="selectedConfig"
                name="select-firebase-config"
                :class="selectClassName"
            >
                <option v-for="(config, index) in availableConfigsList" :key="index" :value="config.path">
                    {{ config.name }}
                </option>
            </select>
        </div>
        <div id="select-firebase-editable-module" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white"
                >⚙️ Select firebase</label
            >
            <select
                id="select-firebase-config"
                v-model="selectedFirebaseModule"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseModuleSelect(selectedFirebaseModule)"
            >
                <option
                    v-for="(firebaseModule, index) in availableFirebaseModulesList"
                    :key="index"
                    :value="firebaseModule"
                >
                    {{ firebaseModule.name }}
                </option>
            </select>
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
                'bg-gray-700 bg-transparent border border-gray-500 text-amber-200 text-sm' +
                    'hover:border-grey-200 block w-full p-2.5',
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
            firebaseModulesForEdit: [
                { name: 'firestore', routerPath: '/firestore-edit' },
                { name: 'database', routerPath: '/database-edit' },
                { name: 'auth', routerPath: '/auth-edit' }
            ],
            selectedFirebaseModule: { name: 'firestore', routerPath: '/firestore-edit' },
            selectedConfig: ''
        };
    },
    computed: {
        availableConfigsList() {
            return this.availableConfigs;
        },
        availableFirebaseModulesList() {
            return this.firebaseModulesForEdit;
        }
        // selectedConfig() {
        //     return this.availableConfigs[0] || '⚙️ Select config';
        // },
        // selectedFirebaseModule() {
        //     return this.firebaseModulesForEdit[0] || '⚙️ Select firebase';
        // }
    },
    methods: {
        onFirebaseModuleSelect(selected) {
            console.log(this.selectedConfig);
            this.$router.push(selected.routerPath);
        }
    }
});
</script>
<!-- TODO: add on hover bg-color change-->
