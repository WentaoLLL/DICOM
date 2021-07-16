<template>
    <div>
        <TopNav />
        <main>
            <div class="link-list">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="list list-info-color">
                            <div class="list-text">
                                <i class="el-icon-user-solid"></i>
                                <p>Eigne Infos edieren</p>
                            </div>
                            <el-button
                                type="primary"
                                round
                                @click="handleLink('info')"
                                >Eintreten</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="list list-phone-color">
                            <div class="list-text">
                                <i class="el-icon-phone"></i>
                                <p>Privat Chat</p>
                            </div>
                            <el-button
                                type="primary"
                                round
                                @click="handleLink('letter')"
                                >Eintreten</el-button
                            >
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="list list-tools-color">
                            <div class="list-text">
                                <i class="el-icon-s-tools"></i>
                                <p>Password ändern</p>
                            </div>
                            <el-button
                                type="primary"
                                round
                                @click="handleLink('password')"
                                >Eintreten</el-button
                            >
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="list list-info-color">
                            <div class="list-text">
                                <i class="el-icon-warning"></i>
                                <p>Cases beobachten</p>
                            </div>
                            <el-button
                                type="primary"
                                round
                                @click="handleLink('case')"
                                >Eintreten</el-button
                            >
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="list list-test-color">
                            <div class="list-text">
                                <i class="el-icon-picture"></i>
                                <p>Test Bilden</p>
                            </div>
                            <el-button
                                type="primary"
                                round
                                @click="handleLink('test')"
                                >Eintreten</el-button
                            >
                        </div>
                    </el-col>
                </el-row>
            </div>
        </main>
        <el-dialog title="Beobachten" :visible.sync="dialogVisible" width="30%">
            <el-row :gutter="20">
                <el-col :span="12" style="text-align: center"
                    ><el-button type="primary" @click="handleClickImageType(1)"
                        >Original Bilden</el-button
                    ></el-col
                >
                <el-col :span="12" style="text-align: center"
                    ><el-button type="primary" @click="handleClickImageType(2)"
                        >Bearbeitete Bilden</el-button
                    ></el-col
                >
            </el-row>
        </el-dialog>
        <BottomInfo />
    </div>
</template>

<script>
import TopNav from "../../components/TopNav";
import BottomInfo from "../../components/BottomInfo";
import store from "store";
import { baseUrl } from "@/utils/config";
export default {
    components: {
        TopNav,
        BottomInfo,
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        handleLink(type) {
            const userInfo = store.get("userInfo");
            switch (type) {
                case "info":
                    this.$router.push("/info");
                    break;
                case "password":
                    this.$router.push("/password");
                    break;
                case "letter":
                    this.$router.push("/letter");
                    break;
                case "test":
                    this.$router.push("/test");
                    break;
                case "case":
                    //获取角色
                    if (userInfo.roles === "patient") {
                        this.dialogVisible = true;
                    } else {
                        this.$router.push("/user-list?id=" + userInfo._id);
                    }
                    break;
                default:
                    break;
            }
        },
        handleClickImageType(type) {
            const userInfo = store.get("userInfo");
            switch (type) {
                case 1:
                    window.location.href =
                        baseUrl +
                        "/hospital_system_dicom_preview.html?user_id=" +
                        userInfo._id;
                    break;
                case 2:
                    window.location.href =
                        baseUrl +
                        "/hospital_system_dicom_preview.html?user_id=" +
                        userInfo._id;
                    break;
                default:
                    break;
            }
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
.list {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
}
.list-text {
    display: flex;
    align-items: center;
}
.list-text p {
    margin-left: 3px;
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
.el-row {
    margin-bottom: 20px;
}
</style>