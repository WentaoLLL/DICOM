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
                        <el-breadcrumb-item>Case beobachten</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
            <el-card class="box-card">
                <div class="search-list-header">
                    <el-input placeholder="Bitte Name eingeben" v-model="name" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
                    </el-input>
                </div>
                <el-table :data="DoctorDicomData" style="width: 100%">
                    <el-table-column prop="user_id" label="Kranker ID"></el-table-column>
                    <el-table-column prop="name" label="Kranker Name"></el-table-column>
                    <el-table-column prop="isHistory" label="Bearbeitete?"></el-table-column>
                    <el-table-column label="Steuern">
                        <template slot-scope="scope">
                            <el-button
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handleLetter(scope.row)"
                            >Cases Beuchen</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <el-dialog title="Besuchen" :visible.sync="dialogVisible" width="30%">
                <el-row :gutter="20">
                    <el-col :span="12" style="text-align: center">
                        <el-button type="primary" @click="handleClickImageType(1)">Original(DICOM)</el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: center">
                        <el-button type="primary" @click="handleClickImageType(2)">Original(Image)</el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="20">
                    <el-col :span="12" style="text-align: center">
                        <el-button type="primary" @click="handleClickImageType(3)">Ai Bilder</el-button>
                    </el-col>
                </el-row>
            </el-dialog>
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
            DoctorDicomData: [],
            dialogVisible: false,
            selectData: {},
            name: "",
        };
    },
    mounted: function () {
        this.handlePreviewDicom();
    },
    methods: {
        handlePreviewDicom: async function () {
            const data = await fetch("/patient/list", {});
            if (data.code === 200) {
                this.DoctorDicomData = data.data.map((p) => ({
                    user_id: p._id,
                    name: p.name,
                    isHistory: p.history.length === 0 ? "Nein" : "Ja",
                }));
            }
        },
        handleLetter(data) {
            this.dialogVisible = true;
            this.selectData = data;
        },
        handleClickImageType(type) {
            const { id } = this.$route.query;
            switch (type) {
                case 1:
                    window.location.href =
                        baseUrl +
                        "/hospital_system_dicom_preview.html?user_id=" +
                        this.selectData.user_id;
                    break;
                case 2:
                    window.location.href = `${baseUrl}/hospital_system_image_preview.html?user_id=${this.selectData.user_id}&doctor_id=${id}&type=dcm`;
                    break;
                case 3:
                    window.location.href = `${baseUrl}/hospital_system_image_preview.html?user_id=${this.selectData.user_id}&doctor_id=${id}&type=image`;
                    break;
                default:
                    break;
            }
        },
        async onSearch() {
            const data = await fetch("/patient/list", {
                name: this.name,
            });
            if (data.code === 200) {
                this.DoctorDicomData = data.data.map((p) => ({
                    user_id: p._id,
                    name: p.name,
                    isHistory: p.history.length === 0 ? "Nein" : "Ja",
                }));
            }
        },
    },
};
</script>
<style  scoped>
main {
    width: 960px;
    margin: 0 auto;
    padding-top: 30px;
}
.el-row {
    margin-bottom: 20px;
}
.search-list-header {
    width: 50%;
    margin-bottom: 20px;
}
</style>
