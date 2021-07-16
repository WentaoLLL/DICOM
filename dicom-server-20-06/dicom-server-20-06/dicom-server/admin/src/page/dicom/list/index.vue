<template>
    <div>
        <head-top />
        <div class="mian">
            <el-card class="box-card">
                <div class="haeder-search"></div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="_id" label="Case ID">
                    </el-table-column>
                    <el-table-column prop="user_id" label="Kranker ID">
                    </el-table-column>
                    <el-table-column prop="user_name" label="Kranker Name">
                    </el-table-column>
                    <el-table-column label="Bearbeiten">
                        <template scope="scope">
                            <el-popconfirm
                                title="Sicher zu löschen?"
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
    </div>
</template>

  <script>
import headTop from "@/components/headTop";
import { getDicomList, deleteDicomList } from "@/api/getData";

export default {
    components: {
        headTop,
    },
    data() {
        return {
            tableData: [],
            total: 0,
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
                this.$message.success("Löschen fertig!");
                this.renderList(1);
            }
        },
        renderList: async function (page = 1) {
            const resData = await getDicomList({ page });
            if (resData.code === 200) {
                let { data } = resData;
                this.tableData = data.map(p=>({
                    ...p,
                    user_name:p.user[0].name
                }));
                this.total = resData.count;
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
