<template>
    <div>
        <TopNav />
        <main>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="原密码">
                    <el-input v-model="form.original_password"></el-input>
                </el-form-item>

                <el-form-item label="新密码">
                    <el-input v-model="form.password"></el-input>
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
                original_password: "",
                password: "",
            },
        };
    },
    methods: {
        async onSubmit() {
            const userInfo = store.get("userInfo");
            const data = await fetch(
                "/password",
                {
                    ...this.form,
                    id: userInfo._id,
                },
                "put"
            );
            if (data.code === 200) {
                this.$message({
                    message: "Password schon erneurt!",
                    type: "success",
                    onClose: () => {
                        store.set("userInfo", null);
                        this.$router.push("/");
                    },
                });
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