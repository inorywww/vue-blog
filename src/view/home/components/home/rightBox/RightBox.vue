<template>
    <div class="right-box">
        <template>
            <right-about-me/>
        </template>
        <template>
            <right-tags/>
        </template>
        <template>
            <div class="right-say">
                <div class="say-title">
                    <h4>碎碎念</h4>
                </div>
                <template v-for="(item, index) in says">
                    <right-say :key="index" :item="item"/>
                </template>
            </div>
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
            this.axios.get('http://localhost:3000/says').then(res => {
                this.says = res.data;

            }).catch(err => {
                console.error(err);
            })
        },
        data() {
            return {
                says: [],
            }
        },
        methods: {
        },
    }
</script>

<style scoped>

</style>
