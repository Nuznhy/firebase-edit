<template>
    <div :class="sidebarClassName">
        <div id="add-config" :class="sideBarContentSeparationClassName">
            <input id="add-config-button" ref="file" type="file" style="display: none" @change="readFile" />
            <label for="add-config-button" class="text-amber-50">🛠️ Add config</label>
        </div>
        <div id="select-config" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Config</label>
            <select
                id="select-firebase-config"
                v-model="selectedConfig"
                name="select-firebase-config"
                :class="selectClassName"
            >
                <option selected disabled>Select config</option>
                <option v-for="(config, index) in availableConfigs" :key="index" :value="config.path">
                    {{ config.name }}
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
                <option selected disabled>Select firebase</option>
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
        return { currentFirebaseModule: { name: '', routerPath: '' } };
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
        ...mapActions('configs', ['updateCurrentFirebaseModule']),

        async onFirebaseModuleSelect(module: FirebaseModule) {
            await router.push(module.routerPath);
            console.log(module);
            await this.updateCurrentFirebaseModule(module);
        },
        readFile() {
            // console.log(this.$refs.file.files[0]);
            // const getBase64 = (file: File) => {
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onload = () => {
            //         // console.log(reader.result);
            //     };
            //     reader.onerror = (error) => {
            //         // console.log('Error converting file to base64: ', error);
            //     };
            // };
            // getBase64(this.$refs.file.files[0]);
        }
    }
});
</script>
<!-- TODO: add on hover bg-color change-->
