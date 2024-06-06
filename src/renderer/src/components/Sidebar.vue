<template>
    <vue-resizable
        class="resizable h-screen h-[100vh + 10px] justify-between"
        style="height: inherit"
        :min-width="300"
        :max-width="500"
        :width="300"
        :active="['r']"
    >
        <div :class="sidebarClassName">
            <div id="add-config" :class="sideBarContentSeparationClassName">
                <input id="add-config-button" type="file" style="display: none" @change="readFile" />
                <label for="add-config-button" class="text-amber-50">🛠️ Add config</label>
            </div>
            <div id="select-config" :class="sideBarContentSeparationClassName">
                <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Config</label>
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
            <div id="select-firebase-editable-module" :class="sideBarContentSeparationClassName">
                <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Firebase</label>
                <select
                    id="select-firebase-config"
                    name="select-firebase-config"
                    :class="selectClassName"
                    @change="onFirebaseModuleSelect"
                >
                    <option selected disabled>Select</option>
                    <option
                        v-for="(module, index) in availableFirebaseModules"
                        :key="index"
                        :value="JSON.stringify(module)"
                    >
                        {{ module.name }}
                    </option>
                </select>
            </div>
        </div>
    </vue-resizable>
</template>

<script lang="ts">
import VueResizable from 'vue-resizable';
import { defineComponent, computed } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { twMerge } from 'tailwind-merge';
import { FileWithPath, InputFileEvent } from './types';
import router from '../router';
import { FirebaseModule } from '../store/modules/configs/types';

export default defineComponent({
    name: 'Sidebar',
    components: { VueResizable },
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
            return twMerge('flex flex-col h-screen h-[100vh + 10px] overflow-auto', props.sidebarClass);
        });
        const sideBarContentSeparationClassName = computed(() => {
            return twMerge('p-2 border-b-2 border-gray-600', props.sideBarContentSeparationClass);
        });
        const selectClassName = computed(() => {
            return twMerge(
                'bg-gray-700 bg-transparent border border-gray-500 text-amber-200 text-sm' +
                    'hover:border-grey-200 block w-full p-2.5 rounded-lg focus:outline-none focus:border-amber-200 focus:ring-1 focus:ring-amber-500',
                props.selectClass
            );
        });
        return {
            sideBarContentSeparationClassName,
            sidebarClassName,
            selectClassName
        };
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

        async onFirebaseModuleSelect(event: Event) {
            const target = event.target as HTMLSelectElement;
            const module = JSON.parse(target.value) as FirebaseModule;

            await router.push(module.routerPath);
            await this.updateCurrentFirebaseModule(module.name);
        },

        async onFirebaseConfigChange(event: Event) {
            const target = event.target as HTMLSelectElement;
            await window.config.initializeAdminApp(target.value);
            await this.updateCurrentFirebaseConfig(target.value);
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
                console.log(this.selectedConfig);
                await this.updateCurrentFirebaseConfig(configName);
                await window.config.createImportedConfigCopy(configFile.path, configName + '.json');
                console.log(this.selectedConfig);
                if (this.availableConfigs.includes(configName)) return;
                await this.addFirebaseConfig(configName);
            }
        }
    }
});
</script>
<!-- TODO: add on hover bg-color change-->
