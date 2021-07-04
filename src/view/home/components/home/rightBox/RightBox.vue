<template>
    <div class="right-box">
        <template>
            <right-about-me />
        </template>
        <template>
            <right-tags />
        </template>
        <template>
            <div class="right-say">
                <div class="say-title">
                    <h3>碎碎念</h3>
                </div>
                <template v-for="(item, index) in says">
                    <right-say :key="index" :item="item" />
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import RightAboutMe from "@/view/home/components/home/rightBox/RightAboutMe";
import RightSay from "@/view/home/components/home/rightBox/RightSay";
import RightTags from "@/view/home/components/home/rightBox/RightTags";
import { getAllSays } from "@/api";

export default {
    name: "RightBox",
    components: {
        RightTags,
        RightAboutMe,
        RightSay,
    },
    mounted() {
        getAllSays()
            .then((res) => {
                if (res.status == 200) {
                    this.says = res.data;
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
