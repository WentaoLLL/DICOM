<template>
    <div>
        <TopNav />
        <main>
            <div class="content">
                <el-row
                    :gutter="18"
                    style="height: 35px;width: 100%;margin-left:5px;border-radius: 8px;"
                >
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
                        <el-breadcrumb-item>DICOM Upload</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
            <el-steps :active="active" finish-status="success" style="margin-top:50px">
                <el-step title="DICOM-Archive erstellen">1</el-step>
                <el-step title="Image hinzufügen">2</el-step>
            </el-steps>
            <div class="form-content">
                <el-form ref="form" :model="form" label-width="80px" v-if="active===0">
                    <el-form-item label="Kranker" v-if="patientList.length">
                        <el-select v-model="form.user_id" placeholder="Bitte wählen">
                            <el-option
                                v-for="item in patientList"
                                :key="item.user_id"
                                :label="item.name"
                                :value="item.user_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="file">
                        <el-upload
                            style="margin-top: 20px"
                            class="avatar-uploader"
                            drag
                            :action="uploadUrl"
                            :limit="1"
                            :file-list="fileList"
                            :on-remove="handleAvatarRemove"
                            :on-success="handleAvatarSuccess"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                Image hier stellen oder
                                <em>hier klicken</em>
                            </div>
                            <!--                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="Type">
                        <el-select v-model="form.type" placeholder="Bitte wählen">
                            <el-option label="KI Bild" value="image"></el-option>
                            <el-option label="Originales Bild" value="dcm"></el-option>
                        </el-select>
                    </el-form-item>

                                        <el-form-item label="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <el-form-item label="dec">
                        <el-input v-model="form.dec"></el-input>
                    </el-form-item>

                    <el-form-item label="date">
                        <el-date-picker
                            v-model="form.create_time"
                            type="date"
                            placeholder="select date"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>
                <el-form ref="form" :model="formFlie" label-width="80px" v-else>
                    <el-form-item label="File">
                        <!--                        <el-upload-->
                        <!--                            class="avatar-uploader"-->
                        <!--                            :action="uploadUrl"-->
                        <!--                            :file-list="formFlieList"-->
                        <!--                            :on-remove="handleAvatarRemove"-->
                        <!--                            :on-success="handleAvatarSuccess"-->
                        <!--                        >-->
                        <!--                            <el-button type="primary">Bitte auswählen</el-button>-->
                        <!--                        </el-upload>-->
                        <el-upload
                            style="margin-top: 20px"
                            class="avatar-uploader"
                            drag
                            :action="uploadUrl"
                            :limit="1"
                            :file-list="fileList"
                            :on-remove="handleAvatarRemove"
                            :on-success="handleAvatarSuccess"
                        >
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">
                                Image hier stellen oder
                                <em>hier klicken</em>
                            </div>
                            <!--                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
                    </el-form-item>

                </el-form>
            </div>
            <div class="button-content">
                <el-button @click="next">Nächster Schritt</el-button>
            </div>
        </main>
        <BottomInfo />
    </div>
</template>

<script>
import TopNav from "../../components/TopNav";
import BottomInfo from "../../components/BottomInfo";
import fetch from "@/utils/fetch";
import store from "store";
import { baseUrl } from "@/utils/config";

export default {
    components: {
        TopNav,
        BottomInfo,
    },
    data() {
        return {
            form: {
                image: "",
                type: "dcm",
                user_id: "",
                dec: "",
                create_time: "",
                name:"",
            },
            formFlie: {
                parent_id: "",
            },
            fileList: [],
            formFlieList: [],
            patientList: [],
            uploadUrl: baseUrl + "/upload",
            active: 0,
        };
    },
    mounted() {
        const userInfo = store.get("userInfo");
        if (userInfo.roles === "patient") {
            this.$set(this.form, "user_id", userInfo._id);
        } else {
            this.queryPatientList();
        }
    },
    methods: {
        async next() {
            if (this.active === 0) {
                const data = await fetch(
                    "/dicom",
                    {
                        ...this.form,
                    },
                    "post"
                );
                if (data.code === 200) {
                    this.$message({
                        message: "DICOM-Archive schon erstellt!",
                        type: "success",
                    });
                    this.$set(this.formFlie, "parent_id", data.data._id);
                    this.active++;
                } else {
                    this.$message({
                        message: data.msg,
                        type: "error",
                    });
                }
                return;
            }
            if (this.active === 1) {
                this.formFlieList.forEach(async (item) => {
                    await fetch(
                        "/dicoms",
                        {
                            ...this.formFlie,
                            image: item.url,
                        },
                        "post"
                    );
                });
                this.active++;
                this.$message({
                    message: "Images schon hinzugefügt",
                    type: "success",
                });
            }
        },
        queryPatientList: async function () {
            const data = await fetch("/patient/list", {});
            if (data.code === 200) {
                this.patientList = data.data.map((p) => ({
                    user_id: p._id,
                    name: p.name,
                }));
            }
        },
        handleCancel() {
            this.$router.push("/home");
        },
        handleAvatarSuccess(res, file) {
            const { md5 } = res.data;
            if (this.active === 0) {
                this.$set(this.form, "image", `${md5}`);
            } else {
                this.formFlieList.push({ name: md5, url: md5 });
            }
        },
        handleAvatarRemove(file) {
            if (this.active === 0) {
                this.$set(this.form, "image", "");
            } else {
                this.formFlieList = this.formFlieList.filter(
                    (p) => p.name !== file.name
                );
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
.form-content {
    width: 250px;
    margin: 20px auto;
}
.button-content {
    padding-top: 20px;
    text-align: center;
}
</style>