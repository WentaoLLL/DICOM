<template>
    <div class="bg">
        <div class="login-center-box">
            <div class="box-left">
<!--                <el-form :label-position="labelPosition" label-width="0px" :model="formLabelPay" class="input">-->
<!--                    <el-form-item >-->
                <div class="box-left-2">
                        <el-image :lazy="true" fit="cover" width="100px" :src="require('/public/images/corona-login.png')" class="icon" ></el-image>
<!--                    </el-form-item>-->
<!--                </el-form>-->
                </div>
            </div>
            <div class="box-right">
                <div class="form-list">
                    <input
                        type="text"
                        class="login-input"
                        placeholder="E-Mail"
                        v-model="emial"
                    />
                    <input
                        type="text"
                        class="login-input"
                        placeholder="Password"
                        v-model="password"
                    />
                    <div class="form-buttoms">
                        <el-button @click="handleSubmit">Einloggen</el-button>
                        <el-button @click="handleRegister">Anmelden</el-button>
                    </div>
                </div>
            </div>
            <a class="el-button--mini" style="position: fixed;background-color: #d0605d;color: #afddff;margin-left: 1%;margin-top: 1%;border-radius: 10px" target="_blank" href="http://localhost:8002">Backend</a>
        </div>
    </div>
</template>

<script>
import fetch from "@/utils/fetch";
import store from "store";
export default {
    data() {
        return {
            emial: "",
            password: "",
        };
    },
    methods: {
        async handleSubmit() {
            if (!this.emial || !this.password) {
                this.$message({
                    message: "E-Mail oder Password nicht eingeschrieben!",
                    type: "error",
                });
            } else {
                const data = await fetch(
                    "/login",
                    {
                        emial: this.emial,
                        password: this.password,
                    },
                    "post"
                );
                if (data.code === 200) {
                    this.$message({
                        message: "Schon erfolgreich eingeloggen",
                        type: "success",
                    });
                    store.set("userInfo", data.data[0]);
                    this.$router.push("/home");
                } else {
                    this.$message({
                        message: data.msg,
                        type: "error",
                    });
                }
            }
        },
        handleRegister() {
            this.$router.push("/register");
        },
    },
};
</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: linear-gradient(90deg, #633549, #d0605d);
}
.login-center-box {
    width: 750px;
    height: 400px;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    overflow: hidden;
}

.box-left {
    width: 50%;
    height: 100%;
    background-color: #633549;
}
.box-right {
    width: 50%;
    height: 100%;
    background-color: #d0605d;
}
.box-left-2 {
    width: 90%;
    height: 90%;
    transform: translate3d(5%, 8%, 0);
    background-color: #633549;
}
.login-input {
    -webkit-appearance: none;
    background-color: #d0605d;
    background-image: none;
    width: 100%;
    height: 40px;
    /* padding: 0 15px; */
    color: #fff;
    border: none;
    outline: none;
    font-size: 14px;
    border-bottom: 1px solid #fff;
    margin-bottom: 10px;
}
.login-input:focus {
    border-bottom: 1px solid #fff;
}
input::-webkit-input-placeholder {
    color: #fff;
}

.form-list {
    width: 70%;
    margin: 0 auto;
    margin-top: 50%;
    transform: translate3d(0, -50%, 0);
}

.form-buttoms {
    padding-top: 10%;
    display: flex;
    justify-content: space-between;
}
.form-buttoms button {
    width: 45%;
    background: transparent;
    color: #fff;
}
</style>