<template>
    <div>
        <TopNav />
        <main>
            <div class="content">
                <el-row :gutter="18" style="height: 35px;width: 100%;margin-left:5px;border-radius: 8px;">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
                        <el-breadcrumb-item >Eigene Infos edieren</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="Name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="Alte">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>

                <el-form-item label="Telefon Nr.">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>

                <el-form-item label="E-mail">
                    <el-input v-model="form.emial"></el-input>
                </el-form-item>

                <el-form-item label="Adresse">
                    <el-input v-model="form.adresse"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Speichern</el-button>
                    <el-button @click="handleCancel">Zurückgehen</el-button>
                </el-form-item>
            </el-form>
        </main>
        <BottomInfo />
    </div>
</template>

<script>
import TopNav from "../../components/TopNav";
import BottomInfo from "../../components/BottomInfo";
import fetch from "@/utils/fetch";
import store from "store";
export default {
    components: {
        TopNav,
        BottomInfo,
    },
    data() {
        return {
            form: {
                name: "",
                age: "",
                phone: "",
                emial: "",
                adresse:"",
            },
        };
    },
    mounted() {
        const userInfo = store.get("userInfo");
        this.form = userInfo
    },
    methods: {
        async onSubmit() {
            const data = await fetch(
                    "/user",
                    {
                        ...this.form,
                        id:this.form._id
                    },
                    "put"
                );
                if (data.code === 200) {
                    this.$message({
                        message: "Infos schon erneuert!",
                        type: "success",
                    });
                    store.set("userInfo", data.data);
                } else {
                    this.$message({
                        message: data.msg,
                        type: "error",
                    });
                }
        },
        handleCancel() {
            this.$router.push("/home");
        },
    },
};
</script>

<style scoped>
main {
    width: 960px;
    margin: 0 auto;
    padding-top: 30px;
}
</style>