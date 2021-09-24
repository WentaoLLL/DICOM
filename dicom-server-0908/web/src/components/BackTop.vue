<template>
    <div class="back_top" @click="backTop" v-if="btnFlag">
        <i class="el-icon-arrow-up"></i>
    </div>
</template>

<script>
    export default {
        props: ["parent"],
        data() {
            return {
                btnFlag: false,
                timer: null,
                scrollTop: 0,
            }
        },

        methods: {
            // 点击图片回到顶部方法，加计时器是为了过渡顺滑
            backTop() {
                const that = this
                this.timer = setInterval(() => {
                    let ispeed = Math.floor(-that.scrollTop / 5)
                    if(this.parent){
                        this.$parent.$refs[that.parent].scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    }else{
                        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                    }
                    if (that.scrollTop === 0) {
                        clearInterval(this.timer)
                    }
                }, 16)
            },

            // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
            scrollToTop() {
                const that = this
                let scrollTop = "";
                if(this.parent){
                    scrollTop = this.$parent.$refs[that.parent].scrollTop
                }else{
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                }

                that.scrollTop = scrollTop
                if (that.scrollTop > 1) {
                    that.btnFlag = true
                } else {
                    that.btnFlag = false
                }
            }
        },
        // vue的两个生命钩子。
        // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
        mounted() {
            window.addEventListener('scroll', this.scrollToTop, true)
        },
        destroyed() {
            window.removeEventListener('scroll', this.scrollToTop,true)
        },
    }
</script>

<style lang="scss" scoped>
    .back_top {
        z-index: 9999;
        position: absolute;
        bottom: 20px;
        right: 10%;
        height: 40px;
        background-color: steelblue;
        border-radius: 10px;
        box-shadow: 0 1px 3px steelblue;
        transition: all .2s ease-in-out;
        line-height: 30px;
        opacity: 0.8;

        i {
            color: #fff;
            font-size: 24px;
            padding: 8px 12px;
            font-weight: bold;
        }
    }

    .back_top:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.7);
    }
</style>

