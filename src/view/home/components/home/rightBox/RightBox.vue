<template>
    <div class="right-box">
        <template>
            <right-about-me />
        </template>
        <template>
            <right-tags />
        </template>
        <template>
            <right-say />
        </template>
    </div>
</template>

<script>
import RightAboutMe from "@/view/home/components/home/rightBox/RightAboutMe";
import RightSay from "@/view/home/components/home/rightBox/RightSay";
import RightTags from "@/view/home/components/home/rightBox/RightTags";

export default {
    name: "RightBox",
    components: {
        RightTags,
        RightAboutMe,
        RightSay,
    },
    mounted() {
      
    },
    data() {
        return {
            says: [],
        };
    },
    methods: {},
};
</script>

<style scoped>

</style>
