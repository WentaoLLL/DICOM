<template>
    <div>
        <head-top />
        <div class="mian">
            <el-card class="box-card">
                <div class="haeder-search">
                    <el-input
                        placeholder="Bitte Benutzername oder Telefon Nr. eingeben!"
                        v-model="key_word"
                        class="input-with-select"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="handleSearch"
                        ></el-button>
                    </el-input>
                </div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="Name">
                    </el-table-column>
                    <el-table-column prop="age" label="Alte"> </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="Telefon Nr."
                    ></el-table-column>
                    <el-table-column prop="emial" label="E-Mail">
                    </el-table-column>
                    <el-table-column label="Role">
                        <template scope="scope">
                            <span>{{
                                scope.row.roles === "doctor" ? "Arzt" : "Kranker"
                            }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Bearbeiten">
                        <template scope="scope">
                            <el-button
                                v-if="scope.row.roles !== 'doctor'"
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handleLetter(scope.row, 'patient')"
                                >Case beobachten</el-button
                            >

                            <el-button
                                v-else
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handlePreviewDicom(scope.row._id)"
                                >Bearbeitete Cases</el-button
                            >
                            <el-button
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handleEid(scope.row)"
                                >edieren</el-button
                            >

                            <el-popconfirm
                                title="Sicher zu löschen"
                                confirm-button-text="Bestimmt"
                                cancel-button-text="Zurückgehen"
                                @confirm="handleDelete(scope.row)"
                            >
                                <el-button
                                    slot="reference"
                                    type="text"
                                    size="small"
                                    >Löschen</el-button
                                >
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footer-pagination">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="handleCurrentChange"
                    >
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <el-dialog
            title="Bearbeitete Cases"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose"
        >
            <el-card class="box-card">
                <el-table :data="DoctorDicomData" style="width: 100%">
                    <el-table-column prop="user_id" label="Kranker ID">
                    </el-table-column>
                    <el-table-column prop="name" label="Kranker Name">
                    </el-table-column>
                    <el-table-column label="edieren">
                        <template scope="scope">
                            <el-button
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handleLetter(scope.row, 'doctor')"
                                >Case beobachten</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Zurückgehen</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >Bestimmt</el-button
                >
            </span>
        </el-dialog>

        <el-dialog
            title="Role"
            :visible.sync="dialogVisibleRole"
            width="50%"
            :before-close="handleClose"
        >
            <el-select v-model="roles" placeholder="Bitte auswählen!">
                <el-option label="Arzt" value="doctor"> </el-option>
                <el-option label="Kranker" value="patient"> </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleRole = false">Zurückgehen</el-button>
                <el-button type="primary" @click="handleEditEoles"
                    >Bestimmt</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

  <script>
import headTop from "@/components/headTop";
import {
    getUserList,
    deleteUserList,
    getDoctorDicomList,
    postUserRoles,
} from "@/api/getData";
import { baseUrl } from "@/config/env";

export default {
    components: {
        headTop,
    },
    data() {
        return {
            tableData: [],
            total: 0,
            key_word: "",
            dialogVisible: false,
            dialogVisibleRole: false,
            DoctorDicomData: [],
            roles: "",
            selectData: {},
        };
    },
    mounted: function () {
        this.renderList();
    },
    methods: {
        // 处理搜索
        handleSearch: function () {
            // 获取数据
            this.renderList();
        },
        // 删除
        handleDelete: async function (item) {
            const res = await deleteUserList({ id: item._id });
            if (res.code === 200) {
                this.$message.success("Löschen fertig!");
                this.renderList();
            } else {
                this.$message.error(res.msg);
            }
        },
        handleClose: function () {
            this.dialogVisible = false;
        },
        handlePreviewDicom: async function (id) {
            const data = await getDoctorDicomList({ id });
            if (data.code === 200) {
                this.DoctorDicomData = data.data.map((p) => ({
                    image_id: p.image_id,
                    user_id: p.user_id,
                    name: p.user[0].name,
                }));
                this.dialogVisible = true;
            }
        },
        handleCurrentChange: function (val) {
            this.renderList(val);
        },
        renderList: async function (page = 1) {
            const resData = await getUserList({
                page,
                key_word: this.key_word,
            });
            if (resData.code === 200) {
                let { data } = resData;
                this.tableData = data;
                this.total = resData.count;
            }
        },
        handleLetter(data, type) {
            if (type === "patient") {
                window.location.href = `${baseUrl}/hospital_system_dicom_preview.html?user_id=${data._id}`;
            } else {
                window.location.href = `${baseUrl}/hospital_system_dicom_preview.html?user_id=${data.user_id}`;
            }
        },
        handleEid(data) {
            this.dialogVisibleRole = true;
            this.selectData = data;
        },
        async handleEditEoles() {
            if (this.roles === "") {
                this.$message.error("Bitte Role wählen!");
            } else {
                const data = await postUserRoles({
                    id: this.selectData._id,
                    roles: this.roles,
                });
                if (data.code === 200) {
                    this.$message.success("Edit fertig!");
                    this.dialogVisibleRole = false;
                    this.renderList();
                } else {
                    this.$message.error(data.msg);
                }
            }
        },
    },
};
</script>
<style lang="less" scoped>
.mian {
    padding: 16px;
}
.haeder-search {
    margin-bottom: 20px;
}
.footer-pagination {
    text-align: right;
    margin-top: 10px;
}
</style>
