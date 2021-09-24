<template>
    <div>
        <TopNav />


        <Sliders />

        <main>
            <div class="link-list">
                <el-row :gutter="20">
                    <el-col :span="12">

                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/1.png')" class="image"></el-image>
                        <div class="list list-info-color">
                            <div class="list-text">
                                <i class="el-icon-s-custom"></i>
                                <h5 style="margin:10px">Eigene Infos edieren</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('info')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/2.png')" class="image"></el-image>
                        <div class="list list-phone-color">
                            <div class="list-text">
                                <i class="el-icon-s-comment"></i>
                                <h5 style="margin:10px">Chat</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('letter')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/3.png')" class="image"></el-image>
                        <div class="list list-tools-color">
                            <div class="list-text">
                                <i class="el-icon-s-tools"></i>
                                <h5 style="margin:10px">Password ändern</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('password')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/4.png')" class="image"></el-image>
                        <div class="list list-info-color">
                            <div class="list-text">
                                <i class="el-icon-s-order"></i>
                                <h5 style="margin:10px">Cases beobachten</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('case')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/5.png')" class="image"></el-image>
                        <div class="list list-test-color">
                            <div class="list-text">
                                <i class="el-icon-picture"></i>
                                <h5 style="margin:10px">Testbilder</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('test')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-image lazy style="height: 100px;width: 100%;border-radius: 8px;" fit="cover" :src="require('/public/images/homeIMG/6.png')" class="image"></el-image>
                        <div class="list list-dicom-color">
                            <div class="list-text">
                                <i class="el-icon-upload"></i>
                                <h5 style="margin:10px">DICOM hochladen</h5>
                            </div>
                            <el-button type="primary" round @click="handleLink('dicom')"><i class="el-icon-arrow-right"></i></el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </main>

        <el-dialog title="Besuch" :visible.sync="dialogVisible" width="600px">
            <el-row :gutter="20">
                <el-col :span="8" style="text-align: center">
                    <el-button type="primary" @click="handleClickImageType(1)">Original（dicom）</el-button>
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <el-button type="primary" @click="handleClickImageType(2)">Original（image）</el-button>
                </el-col>
                <el-col :span="8" style="text-align: center">
                    <el-button type="primary" @click="handleClickImageType(3)">KI Bilder</el-button>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="search-list">
                <div class="search-list-header">
                    <el-input placeholder="Bitte Inhalt eingeben" v-model="dec" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
                    </el-input>
                </div>
                <div class="search-list-body">
                    <el-table :data="tableData" style="width: 100%" empty-text="Keine Datei">
                        <el-table-column prop="image" label="Archiv-Name"></el-table-column>
                        <el-table-column label="Type">
                            <template scope="scope">
                                <span>{{scope.row.type === 'image'?'KI Bilder':'Original'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_id" label="Patient-ID"></el-table-column>
                        <el-table-column prop="name" label="Patient-Name"></el-table-column>
                        <el-table-column prop="dec" label="Köperteil"></el-table-column>
                        <el-table-column label="Bearbeiten">
                            <template scope="scope">
                                <el-button
                                    slot="reference"
                                    type="text"
                                    size="small"
                                    @click="handleItem(scope.row)"
                                >Besuch</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>

        <BackTop />
<!--        <BottomInfo />-->
    </div>
</template>

<script>
import TopNav from "../../components/TopNav";
import Menu from "../../components/Menu";
import BottomInfo from "../../components/BottomInfo";
import Sliders from "../../components/Sliders";
// import Backtop from "../../components/BackTop";
import store from "store";
import { baseUrl } from "@/utils/config";
import fetch from "@/utils/fetch";

export default {
    components: {
        TopNav,
        BottomInfo,
        Sliders,
        Menu,
        // Backtop,
    },
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            dec: "",
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
                    } else if (userInfo.roles === "researcher") {
                        this.$router.push("/user-list?id=" + userInfo._id);
                    } else {
                        this.$router.push("/user-list?id=" + userInfo._id);
                    }
                    break;
                case "dicom":
                    this.$router.push("/dicom");
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
                    window.location.href = `${baseUrl}/hospital_system_image_preview.html?user_id=${userInfo._id}&type=dcm`;
                    break;
                case 3:
                    window.location.href = `${baseUrl}/hospital_system_image_preview.html?user_id=${userInfo._id}&type=image`;
                    break;
                default:
                    break;
            }
        },

        handleItem(item) {
            if (item.type === "image") {
                this.handleClickImageType(3);
            } else {
                if (item.image.includes("dcm")) {
                    this.handleClickImageType(2);
                } else {
                    this.handleClickImageType(1);
                }
            }
        },

        async onSearch() {
            const userInfo = store.get("userInfo");
            const data = await fetch("/search/dicom/all/list", {
                key_word: this.dec,
                user_id: userInfo._id,
            });
            if (data.code === 200) {
                this.tableData = data.data;
            }
        },
    },
};
</script>

<style scoped>
main {
    width: 960px;
    margin: 0 auto;
    padding-top: 10px;
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
.list-dicom-color {
    background-color: #1989fa7c;
}
.el-row {
    margin-bottom: 20px;
}
.search-list {
    width: 100%;
}
.search-list-header {
    width: 50%;
    margin-bottom: 20px;
}
.search-list-body {
    min-height: 300px;
}

</style>