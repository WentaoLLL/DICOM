<template>
    <div class="test-page">
        <TopNav />
        <main>
            <div class="content">
                <el-row :gutter="24">
                    <el-col :span="12" v-for="item in dataList" :key="item._id">
                        <router-link :to="'/test-detail?id=' + item._id">
                            <div class="grid-content">
                                <h1 v-html="item.title"></h1>
                                <img
                                    :src="baseUrl + item.cover_url"
                                    alt="image"
                                />
                            </div>
                        </router-link>
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
import fetch from "@/utils/fetch";
import { baseUrl } from "@/utils/config";
export default {
    components: {
        TopNav,
        BottomInfo,
    },
    data() {
        return {
            baseUrl,
            dataList: [],
        };
    },
    async mounted() {
        const data = await fetch("/test/image/list", {});
        if (data.code === 200) {
            const list = data.data || [];
            this.dataList = list;
        } else {
            this.$message({
                message: data.msg,
                type: "error",
            });
        }
    },
};
</script>

<style scoped>
main {
    height: calc(100vh - 57px);
    background: #f6f7fb;
    padding: 40px 48px 140px 48px;
    box-sizing: border-box;
}
.content {
    width: 960px;
    margin: 0 auto;
}
.content a{
    text-decoration: none;
    color: #333;
}
.grid-content {
    width: 100%;
    height: 156px;
    background-color: #fff;
    border-radius: 6px;
    padding: 20px 16px;
    box-sizing: border-box;
    box-shadow: 0 6.75px 13.5px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-bottom: 24px;
}
h1 {
    width: 60%;
    font-size: 28px;
    font-weight: 700;
    word-break: break-all;
}

img {
    width: 30%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
}
</style>