<template>

        <el-carousel indicator-position="outside" loop="true" interval="2000" trigger="click" >

            <el-carousel-item v-for="item in images" :key="item" >
                <div class="ui-flex justify-center center" style="border: cornflowerblue solid 0px; width: 100%; height: 100%;">
                    <img alt="" :src="item.url" fit="cover" style="width: 50%; height: 100%;border-radius: 12px"/>
                </div>
<!--            <img :src="item.url"  class="img-responsive" alt="" style="margin: 0 auto;"/>-->
            </el-carousel-item>
        </el-carousel>

</template>

<script>
    export default {
        name: "Carousel",
        data() {
            return {
                images: [
                    { url: require("/public/images/1.jpg"),name:"Bild 1"},
                    { url: require("/public/images/4.jpg"),name:"Bild 2"},
                    { url: require("/public/images/3.png"),name:"Bild 3"},
                    { url: require("/public/images/6.jpg"),name:"Bild 4"},
                    { url: require("/public/images/5.jpg"),name:"Bild 5"},
                    { url: require("/public/images/1.png"),name:"Bild 6"}
                ],
            };
        },
    };
</script>

<style scoped>
    .el-carousel__item h3 {
        color:  #ffffff;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
        max-width: 80%;
    }

    .el-carousel__item:nth-child(2n) {
        background-color:  #ffffff;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #ffffff;
    }

    .img-responsive {
        display: inline-block;
        position: center;
        height: 100%;
        max-width: 100%;
    }

    .ui-flex {
        display: -webkit-box !important;
        display: -webkit-flex !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap
    }

    .ui-flex, .ui-flex *, .ui-flex :after, .ui-flex :before {
        box-sizing: border-box
    }

    .ui-flex.justify-center {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center
    }
    .ui-flex.center {
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center
    }
    .text-wrapper {
        white-space: pre-wrap;
    }
</style>