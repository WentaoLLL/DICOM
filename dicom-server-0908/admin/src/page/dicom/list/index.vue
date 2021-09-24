<template>
    <div>
        <head-top />
        <div class="mian">
            <el-card class="box-card">
                <div class="haeder-search"></div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="_id" label="Case ID"></el-table-column>
                    <el-table-column prop="image" label="Case Name"></el-table-column>
                    <el-table-column label="Type">
                        <template scope="scope">
                            <span>{{scope.row.type === 'image'?'K.I.':'Original'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="user_id" label="Kranker ID"></el-table-column>
                    <el-table-column prop="user_name" label="Kranker Name"></el-table-column>
                    <el-table-column label="Darstellung">
                        <template scope="scope">
                            <el-switch
                                :value="scope.row.examine === 1"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="val=>handleSwitch(val,scope.row)"
                            ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="Bearbeiten">
                        <template scope="scope">
                            <el-button
                                slot="reference"
                                type="text"
                                size="small"
                                @click="handlePreview(scope.row)"
                            >Preview</el-button>
                            <el-popconfirm title="Sicher zu löschen?" @confirm="handleDelete(scope.row)">
                                <el-button slot="reference" type="text" size="small">Löschen</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="footer-pagination">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        @current-change="handleCurrentChange"
                    ></el-pagination>
                </div>
            </el-card>
            <el-dialog title="Beobachten" :visible.sync="dialogVisible" width="30%">
                <img :src="`${baseUrl}/dicoms/${selectData.image}`" style="width:100%" />
            </el-dialog>
        </div>
    </div>
</template>

  <script>
import headTop from "@/components/headTop";
import { getDicomList, deleteDicomList, checkDicomList } from "@/api/getData";
import { baseUrl } from "@/config/env";
export default {
    components: {
        headTop,
    },
    data() {
        return {
            baseUrl,
            tableData: [],
            total: 0,
            selectData: {},
            dialogVisible: false,
        };
    },
    mounted: function () {
        this.renderList();
    },
    methods: {
        handleCurrentChange: function (val) {
            this.renderList(val);
        },
        // 删除
        handleDelete: async function (item) {
            const res = await deleteDicomList({ id: item._id });
            if (res.code === 200) {
                this.$message.success("Erfolgreich gelöscht!");
                this.renderList(1);
            }
        },
        renderList: async function (page = 1) {
            const resData = await getDicomList({ page });
            if (resData.code === 200) {
                let { data } = resData;
                this.tableData = data.map((p) => ({
                    ...p,
                    user_name: p.user[0].name,
                }));
                this.total = resData.count;
            }
        },
        handleSwitch: async function (val, info) {
            const res = await checkDicomList({
                id: info._id,
                examine: val ? 1 : 0,
            });
            if (res.code === 200) {
                this.$message.success("Erfolgreich gespeichert!");
                this.renderList(1);
            }
        },
        handlePreview: function (data) {
            this.selectData = data;
            if (data.type === "image") {
                this.dialogVisible = true;
            } else {
                const imgArray = [
                    "jpg",
                    "jpeg",
                    "png",
                    "bmp",
                    "gif",
                    "PNG",
                    "JPG",
                    "JPEG",
                    "GIF",
                ];
                if (imgArray.includes(data.image.split(".")[1])) {
                    this.dialogVisible = true;
                } else {
                    this.$message.error("Diese Format nicht richtig!");
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
.footer-pagination {
    text-align: right;
    margin-top: 10px;
}
</style>
