<template>
    <div class="flex flex-row h-screen">
        <Sidebar></Sidebar>
        <div :class="contentClassName">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
import Sidebar from '@components/Sidebar.vue';
import { computed, defineComponent } from 'vue';
import { twMerge } from 'tailwind-merge';

export default defineComponent({
    name: 'App',
    components: { Sidebar },
    props: {
        contentClass: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const contentClassName = computed(() => {
            return twMerge('flex h-full w-full overflow-auto', props.contentClass);
        });
        return {
            contentClassName
        };
    }
});
</script>
