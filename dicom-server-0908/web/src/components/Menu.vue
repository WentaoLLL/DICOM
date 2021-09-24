<template>

    <div class="container">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item>

                <template slot="title">
                    <i class="header-icon el-icon-info"></i><h4 style="margin:10px;color:#000000">Kurze Vorstellung</h4>
                </template>
                <p>Kurze VorstellungKurze VorstellungKurze VorstellungKurze VorstellungKurze VorstellungVorstellungKurze VorstellungVorstellungKurze VorstellungVorstellungKurze Vorstellung</p>
                <p>Kurze VorstellungKurze VorstellungKurze VorstellungKurze VorstellungKurze VorstellungVorstellungKurze VorstellungVorstellungKurze VorstellungVorstellungKurze Vorstellung</p>

            </el-collapse-item>
        </el-collapse>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                activeNames: ['1']
            };
        },
        methods: {
            handleChange(val) {
                console.log(val);
            }
        }
    }
</script>

<style scoped>
    nav {
        width: 100%;
        height: 56px;
        border-bottom: 1px solid #f0f0f0;
    }
    .container {
        width: 960px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 auto;
    }
    ul {
        display: flex;
    }
    li {
        list-style: none;
        color: #ea6f5a;
        margin-left: 16px;
        cursor: pointer;
    }
    .out {
        color: #888;
    }

    .user-info {
        font-size: 14px;
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
    .list-info-color {
        background-color: #b7d3ec;
    }
</style>