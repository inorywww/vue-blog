<template>
    <div class="progress">
        <div class="reading-progress" :style="`transform: scaleX(${progress})`"></div>
        <span class="cat iconfont icon-cat1" :style="`left:${progress*99}%`"> </span>
    </div>
</template>


<script>
export default {
    name: "Progress",

    mounted() {
        this.$nextTick(() => {
            this.setProgress();
        });
    },

    data() {
        return {
            progress: 0,
        };
    },
    methods: {
        setProgress() {
          window.progress = window.addEventListener("scroll", () => {
                const viewHeight = document.documentElement.scrollTop;
                this.progress =
                    viewHeight /
                    (document.body.scrollHeight - window.innerHeight);
            });
        },
    },
};
</script>
<style>
.progress {
    width: 100%;
    height: 5px;
    z-index: 1000;
    background-color: transparent;
    position: fixed;
}
.reading-progress {
    position: absolute;
     background-image:  linear-gradient(-90deg, #29bdd9 0%, #276ace 100%);
    width: 100%;
    height: 100%;
    z-index: 999;
    transform-origin: left;
}
.cat{
    position: absolute;
    font-size: 20px;
    z-index: 999;
}
</style>