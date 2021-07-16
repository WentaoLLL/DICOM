<template>
    <div>
        <nav>
            <div class="container">
                <ul>
<!--                    <li @click="handleLink">Homepage</li>-->
                    <el-button
                            type="primary"
                            round
                            @click="handleLink('Homepage')"
                    >Homepage</el-button
                    >
<!--                    <li @click="handleOut" class="out">Ausloggen</li>-->
                    <el-button
                            type="primary"
                            round
                            @click="handleOut" class="out"
                    >Ausloggen</el-button
                    >
                </ul>


                        <div class="user-info">
                            <h1>{{ userNmae }}</h1>
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
            this.userNmae = userInfo.name || userInfo.emial;
        } else {
            this.$message({
                message: "Noch nicht eingeloggt!",
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
                message: "Erfolgreich ausloggen!",
                type: "success",
            });
            store.set("userInfo", null);
            this.$router.push("/");
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
    color: #888;
}

.user-info {
    font-size: 14px;
}
</style>