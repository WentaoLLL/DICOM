<template>
    <div class="test-detail-page">
        <TopNav />
        <main>
            <div class="content">
                <el-row :gutter="18" style="height: 35px;width: 100%;margin-left:5px;border-radius: 8px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/test' }">Testbilder</el-breadcrumb-item>
                        <el-breadcrumb-item >Testbilder-Details</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
            <div class="card-content">
                <el-row :gutter="24">
                    <el-col :span="24" v-for="item in dataList" :key="item._id" class="list">
                        <div
                            class="grid-content"
                            :style="'background: url('+baseUrl + item.url+') 100% 100% / 100% no-repeat;'"
                        ></div>
                        <div class="verticalBar">

                        </div>
                        <div class="grid-input">
                            <el-button type="primary" @click="handleSaveDescribe(item._id)">Beschreibung</el-button>
                            <el-input
                                type="textarea"
                                :rows="10"
                                placeholder="Beschreibung"
                                v-model="item.describe"
                            ></el-input>

                        </div>
                    </el-col>
                </el-row>
            </div>
        </main>

        <BottomInfo />
    </div>


</template>

<script>
import TopNav from "../../components/TopNav";
import BottomInfo from "../../components/BottomInfo";
import BackTop from "../../components/BackTop";
import fetch from "@/utils/fetch";
import { baseUrl } from "@/utils/config";
export default {
    components: {
        TopNav,
        BottomInfo,
        BackTop,
    },
    data() {
        return {
            baseUrl,
            dataList: [],
        };
    },
    mounted() {
        this.queryList();
    },
    methods: {
        async queryList() {
            const { id = "" } = this.$route.query;
            const data = await fetch("/test/list", { id });
            if (data.code === 200) {
                const _data = data.data || [];
                this.dataList = _data;
            } else {
                this.$message({
                    message: data.msg,
                    type: "error",
                });
            }
        },
        async handleSaveDescribe(id) {
            const details = this.dataList.find((p) => p._id === id);

            const data = await fetch(
                "/test/list",
                { id, describe: details.describe },
                "post"
            );

            if (data.code === 200) {
                this.queryList();
            } else {
                this.$message({
                    message: data.msg,
                    type: "error",
                });
            }
        },
    },
};
</script>

<style scoped>
main {
    max-width: 1560px;
    margin: 0 auto;
    padding: 10px 10px 100px 48px;
}
.list {
    display: flex;
}
.grid-content {
    width: 800px;
    height: 840px;
    margin-bottom: 24px;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
}
.grid-input {
    width: calc(50% - 300px);
    margin-bottom: 10px;
    margin-top: 400px;
}
.grid-input button {
    margin-top: 10px;
    width: calc(365px);
}
.footer-text {
    width: 100%;
    height: 36px;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 8px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    color: #fff;
    text-align: center;
}
.verticalBar {
    width: 6px;
    height: 890px;
    background: cornflowerblue;
    display: inline-block;
    margin-top: 0px;
    vertical-align: top;
    margin-right: 29px;
    margin-left: 30px;
}

</style>