<template>
    <div :class="sidebarClassName"></div>
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
        }
    },
    setup(props) {
        const sidebarClassName = computed(() => {
            return twMerge('w-[250px] mt-10 h-[100vh + 10px] overflow-auto', props.sidebarClass);
        });
        return {
            sidebarClassName
        };
    }
});
</script>
