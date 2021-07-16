<template>
    <div>
        <TopNav />
        <main>
            <el-card class="box-card">
                <el-table :data="DoctorDicomData" style="width: 100%">
                    <el-table-column prop="user_id" label="Kranker ID">
                    </el-table-column>
                    <el-table-column prop="name" label="Kranker Name">
                    </el-table-column>
                    <el-table-column prop="isHistory" label="Bearbeitete?">
                    </el-table-column>
                    <el-table-column label="Edieren">
                        <template scope="scope">
                            <el-button
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handleLetter(scope.row)"
                                >Cases beobachten</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
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
                    isHistory:p.history.length===0?'Nein':'Ja'
                }));
            }
        },
        handleLetter(data) {
            const { id } = this.$route.query;
            window.location.href = `${baseUrl}/hospital_system_dicom_preview.html?user_id=${data.user_id}&doctor_id=${id}`;
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
</style>
