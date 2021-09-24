<template>
    <div>
        <nav>
            <div class="container">
                <ul>
<!--                    <li @click="handleLink">首页</li>-->
                    <el-button type="primary"  @click="handleLink('home')" >Homepage<i class="header-icon el-icon-s-home" style="margin-left:10px"></i></el-button>
                    <el-button type="primary"  @click="handleOut" class="out" style="margin-left:20px">Ausloggen<i class="header-icon el-icon-s-promotion" style="margin-left:10px"></i></el-button>
<!--                    <li @click="handleOut" class="out">退出</li>-->
                </ul>

                <div class="user-info">


<!--                    <h1>{{ userNmae }}</h1>-->


                    <el-button type="primary" round @click="handleInfo"><i class="header-icon el-icon-message-solid" style="margin-right:10px"></i>{{userNmae.name }}</el-button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import store from "store";
export default {
    data() {
        return {
            userNmae: "",
        };
    },
    mounted() {
        const userInfo = store.get("userInfo");
        if (userInfo) {
            // this.userNmae = userInfo.name || userInfo.emial;
            this.userNmae = userInfo;
        } else {
            this.$message({
                message: "Einloggen benötigt!",
                type: "error",
            });
            this.$router.push("/");
        }
    },
    methods: {
        handleLink() {
            this.$router.push("/home");
        },
        handleOut() {
            this.$message({
                message: "Erfolgreich ausgeloggt!",
                type: "success",
            });
            store.set("userInfo", null);
            this.$router.push("/");
        },
        handleInfo() {
            this.$router.push("/info");
        },
    },
};
</script>

<style scoped>
nav {
    width: 100%;
    height: 56px;
    border-bottom: 1px solid #f0f0f0;
}
.container {
    width: 960px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 0 auto;
}
ul {
    display: flex;
}
li {
    list-style: none;
    color: #ea6f5a;
    margin-left: 16px;
    cursor: pointer;
}
.out {
    color: #ffffff;
}

.user-info {
    font-size: 14px;
}

</style>