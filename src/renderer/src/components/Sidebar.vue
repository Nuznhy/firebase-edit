<template>
    <div :class="sidebarClassName">
        <div id="add-config" :class="sideBarContentSeparationClassName">
            <input id="add-config-button" type="file" style="display: none" />
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
                <option v-for="(config, index) in availableConfigsList" :key="index" :value="config.path">
                    {{ config.name }}
                </option>
            </select>
        </div>
        <div id="select-firebase-editable-module" :class="sideBarContentSeparationClassName">
            <label for="select-firebase-config" class="block mb-2 text-amber-50 dark:text-white">⚙️ Firebase</label>
            <select
                id="select-firebase-config"
                v-model="selectedFirebaseModule"
                name="select-firebase-config"
                :class="selectClassName"
                @change="onFirebaseModuleSelect()"
            >
                <option selected disabled>Select firebase</option>
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
import { mapState } from 'vuex';
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
        return {};
    },
    computed: {
        ...mapState('configs', [
            'availableConfigsList',
            'availableFirebaseModulesList',
            'selectedConfig',
            'selectedFirebaseModule'
        ])
    },
    methods: {
        onFirebaseModuleSelect() {
            console.log(this.selectedConfig);
            this.$router.push(this.selectedConfig.routerPath);
        }
    }
});
</script>
<!-- TODO: add on hover bg-color change-->
