<template>
    <HeaderComponent></HeaderComponent>
    <div class="flex flex-row mt-8 h-[100vh-32px] w-full">
        <Sidebar class="p-2 h-full bg-zinc-700/50 opacity-100"></Sidebar>
        <div class="flex flex-row h-[100vh-32px] w-screen border-l bg-zinc-900/50 border-l-white/20 overflow-auto">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import Sidebar from '@components/Sidebar.vue';
import HeaderComponent from '@components/HeaderComponent.vue';
import { computed, defineComponent } from 'vue';
import { twMerge } from 'tailwind-merge';

export default defineComponent({
    name: 'App',
    components: { Sidebar, HeaderComponent },
    props: {
        contentClass: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const contentClassName = computed(() => {
            return twMerge('', props.contentClass);
        });
        return {
            contentClassName
        };
    }
});
</script>
