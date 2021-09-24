<template>
    <div>
        <footer>

            <div class="container">
<!--                <p>Name:{{ userNmae }}</p>-->
<!--                <p>ID:{{ id }}</p>-->
<!--                <p>Telefon Nr.:{{ phone }}</p>-->
                <el-row :gutter="25">
                    <el-col :span="25">
                        <div class="list list-info-color">
                            <div class="list-text">
<!--                                <i class="el-icon-user-solid"></i>-->
<!--                                <h5 style="margin-left:0px;margin:5px"><i class="el-icon-user" style="margin-right:10px"></i>Name: {{ userNmae }}</h5>-->
<!--                                <h5 style="margin-left:0px;margin:5px"><i class="el-icon-star-off" style="margin-right:10px"></i>ID: {{ id }}</h5>-->
<!--                                <h5 style="margin-left:0px;margin:5px"><i class="el-icon-phone-outline" style="margin-right:10px"></i>Telefon Nr.: {{ phone }}</h5>-->
                                <el-tag style="margin-left:20px;margin:5px">Email: {{ userNmae }}</el-tag>
                                <el-tag style="margin-left:20px;margin:5px">ID: {{ id}}</el-tag>
                                <el-tag style="margin-left:20px;margin:5px">Alte: {{ age}}</el-tag>
                                <el-tag style="margin-left:20px;margin:5px">Role: {{ role }}</el-tag>
                                <el-tag style="margin-left:20px;margin:5px">Telefon.Nr: {{ phone }}</el-tag>
                                <el-tag style="margin-left:20px;margin:5px">Adresse: {{ adresse }}</el-tag>
                            </div>
                        </div>
                    </el-col>
                </el-row>

            </div>
            <BackTop />
        </footer>
    </div>
</template>

<script>
import BackTop from "../components/BackTop";
import Menu from "../components/Menu";
import store from "store";
export default {
    components:{
        BackTop,
        Menu,
    },
    data() {
        return {
            id: "",
            userNmae: "",
            phone: "",
            role: "",
            age: "",
            adresse: "",
        };
    },
    mounted() {
        const userInfo = store.get("userInfo") || {};
        this.userNmae = userInfo.name || userInfo.emial;
        this.id = userInfo._id;
        this.phone = userInfo.phone;
        this.role = userInfo.roles;
        this.age = userInfo.age;
        this.adresse = userInfo.adresse;
    },
};
</script>

<style scoped>
footer {
    width: 100%;
    height: 80px;
    border-top: 1px solid #f0f0f0;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #b7d3ec;
    color: #2c3e50;
}
.container {
    width: 960px;
    height: 100%;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
}
.container p {
    font-size: 14px;
}

.list-info-color {
    background-color: #b7d3ec;
}
.list-mailbox-color {
    background-color: #ffb84f;
}
.list-tools-color {
    background-color: #f4e0bd;
}
.list-phone-color {
    background-color: #c1e4de;
}
.list-test-color {
    background-color: #ffb59f;
}
</style>