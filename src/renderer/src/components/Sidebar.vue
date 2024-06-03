<template>
    <div :class="sidebarClassName">
        <div id="add-config" :class="sideBarContentSeparationClassName">
            <input id="add-config-button" type="file" style="display: none" @change="readFile" />
            <label for="add-config-button" class="text-amber-50">🛠️ Add config</label>
        </div>
        <div id="select-config" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Config</label>
            <select
                id="select-firebase-config"
                v-model="currentSelectedConfig"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseConfigChange(currentSelectedConfig)"
            >
                <option selected disabled>Select config</option>
                <option v-for="(config, index) in availableConfigs" :key="index" :value="config">
                    {{ config }}
                </option>
            </select>
        </div>
        <div id="select-firebase-editable-module" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Firebase</label>
            <select
                id="select-firebase-config"
                v-model="currentFirebaseModule"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseModuleSelect(currentFirebaseModule)"
            >
                <option selected disabled>{{ currentFirebaseModule.name }}</option>
                <option
                    v-for="(firebaseModule, index) in availableFirebaseModules"
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
import { mapActions, mapGetters } from 'vuex';
import { twMerge } from 'tailwind-merge';
import { FirebaseModule } from '../store/modules/configs/types';
import router from '../router';
import { FileWithPath, InputFileEvent } from './types';

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
        const currentFirebaseModule = { name: 'Select', routerPath: '' };
        const currentSelectedConfig = 'Select';
        return { currentFirebaseModule, currentSelectedConfig };
    },
    computed: {
        ...mapGetters('configs', [
            'availableConfigs',
            'availableFirebaseModules',
            'selectedConfig',
            'selectedFirebaseModule'
        ])
    },
    methods: {
        ...mapActions('configs', ['updateCurrentFirebaseModule', 'updateCurrentFirebaseConfig', 'addFirebaseConfig']),

        async onFirebaseModuleSelect(module: FirebaseModule) {
            await router.push(module.routerPath);
            await this.updateCurrentFirebaseModule(module);
        },

        async onFirebaseConfigChange(configName: string) {
            await this.updateCurrentFirebaseConfig(configName);
        },

        async readFile(payload: Event) {
            const event = payload as InputFileEvent;
            if (event.target.files) {
                const configFile = event.target.files[0] as FileWithPath;
                const config: any = JSON.parse(await configFile.text());
                let configName: string;
                if (config.firebaseAdminConfig) {
                    configName = config.firebaseAdminConfig.project_id;
                } else {
                    configName = config.project_id;
                }
                await window.context.createImportedConfigCopy(configFile.path, configName + '.json');
                await this.addFirebaseConfig(configName);
                await this.updateCurrentFirebaseConfig(configName);
                this.currentSelectedConfig = configName;
            }
        }
    }
});
</script>
<!-- TODO: add on hover bg-color change-->
