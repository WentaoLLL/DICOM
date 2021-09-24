<template>
    <div class="bg">
        <div class="login-center-box">
            <div class="box-left"></div>
            <div class="box-right">


                    <el-row :gutter="18" style="margin-left:15px;margin-top:15px;">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/home' }"><i class="el-icon-arrow-left"></i>Back</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>

                <div class="form-list">
                    <input
                        type="text"
                        class="login-input"
                        placeholder="E-mail"
                        v-model="emial"
                    />
                    <input
                        type="text"
                        class="login-input"
                        placeholder="Password"
                        v-model="password"
                    />

                    <div class="form-buttoms">
                        <el-button @click="handleSubmit">Anmelden</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "@/utils/fetch";
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
                    message: "E-Mail oder Password noch nicht eingegeben!",
                    type: "error",
                });
            } else {
                const data = await fetch(
                    "/register",
                    {
                        emial: this.emial,
                        password: this.password,

                    },
                    "post"
                );
                if (data.code === 200) {
                    this.$message({
                        message: "Schon erfolgreich angemeldet!Automatisch einloggen!",
                        type: "success",
                        onClose: () => {
                            this.$router.push("/");
                        },
                    });
                } else {
                    this.$message({
                        message: data.msg,
                        type: "error",
                    });
                }
            }
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
    width: 100%;
    background: transparent;
    color: #fff;
}
</style>