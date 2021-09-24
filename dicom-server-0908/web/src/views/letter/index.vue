<template>
    <div>
        <TopNav />
        <main>

            <div class="ChatSideBar">
                <div class="content">
                    <el-row :gutter="18" style="height: 35px;width: 100%;margin-left:5px;border-radius: 8px;">
                        <el-breadcrumb separator-class="el-icon-arrow-right">
                            <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
                            <el-breadcrumb-item >Chat</el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-row>
                </div>
                <h3 class="ChatListGroup-SectionTitle">Benutzer</h3>
                <div class="ChatListGroup-SectionContent">
                    <div class="ChatUserList-List">
                        <div
                            :class="
                                selectId === item._id
                                    ? 'ChatUserListItem ChatUserListItem--active'
                                    : 'ChatUserListItem'
                            "
                            v-for="item in userList"
                            :key="item._id"
                            @click="handleClickUserList(item._id)"
                        >
                            <span>{{ item.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ChatBox">
                <header class="ChatBox-title">
                    <span>{{ selectInfo.name }}</span>
                </header>
                <div class="MessagesBox-wrapper">
                    <div class="MessagesBox">
                        <div v-for="item in letterList" :key="item._id">
                            <div class="Message-wrapper">
                                <p class="Message-time">
                                    <time datetime="2021-02-20T14:36:02.000Z">{{
                                        item.time
                                    }}</time>
                                </p>
                                <div
                                    :class="
                                        item.login_user_id === id
                                            ? 'Message Message--reverse'
                                            : 'Message'
                                    "
                                >
                                    <div class="css-r6ymz">
                                        {{ item._id === id ? "Ich" : item.name }}
                                    </div>
                                    <div class="Message-content">
                                        <div
                                            :class="
                                                item.login_user_id === id
                                                    ? 'TextMessage TextMessage-receiver'
                                                    : 'TextMessage TextMessage-sender'
                                            "
                                        >
                                            <div class="css-vurnku">
                                                {{ item.content }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="InputBox">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="Bitte Inhalt eingeben"
                        v-model="content"
                    >
                    </el-input>
                    <div class="InputBox-footer">
                        <el-button
                            type="primary"
                            :disabled="selectId === ''"
                            @click="handleSubmit"
                            >Senden</el-button
                        >
                    </div>
                </div>
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
export default {
    components: {
        TopNav,
        BottomInfo,
    },
    data() {
        return {
            id: "",
            userList: [],
            selectId: "",
            selectInfo: {},
            letterList: [],
            content: "",
        };
    },
    async mounted() {
        const userInfo = store.get("userInfo");
        const allUserList = await fetch("/all/user", {});
        if (allUserList.code === 200) {
            // 排除自己
            this.userList = allUserList.data.filter(
                (p) => p._id !== userInfo._id
            );
            this.id = userInfo._id;
        }
    },
    methods: {
        handleClickUserList(id) {
            this.selectInfo = this.userList.find((p) => p._id === id);
            this.selectId = id;
            this.queryletterList(
                id,
                this.userList.find((p) => p._id === id).name
            );
        },
        async handleSubmit() {
            if (this.content) {
                const userInfo = store.get("userInfo");
                const data = await fetch(
                    "/letter",
                    {
                        login_user_id: userInfo._id,
                        user_id: this.selectId,
                        content: this.content,
                    },
                    "post"
                );
                if (data.code === 200) {
                    this.queryletterList(this.selectId, this.selectInfo.name);
                } else {
                    this.$message({
                        message: data.msg,
                        type: "error",
                    });
                }
            } else {
                this.$message({
                    message: "Bitte Inhalt eingeben",
                    type: "error",
                });
            }
        },
        async queryletterList(id, _name) {
            const userInfo = store.get("userInfo");
            const data = await fetch("/letter", {
                login_user_id: userInfo._id,
                user_id: id,
            });
            if (data.code === 200) {
                const letterList = data.data.map((item) => {
                    let name = _name.slice(0, 1);
                    if (item.login_user_id === userInfo._id) {
                        name = "Ich";
                    }
                    return {
                        ...item,
                        name,
                    };
                });
                this.letterList = letterList;
            } else {
                this.$message({
                    message: "Daten nicht erfolgreich gesucht!",
                    type: "error",
                });
            }
        },
    },
};
</script>
<style scoped>
main {
    width: 960px;
    margin: 0 auto;
    margin-top: 30px;
    height: calc(100vh - 200px);
    max-height: 1000px;
    box-shadow: 0 0 4px 0 rgb(18 18 18 / 10%);
    display: flex;
    justify-content: flex-start;
}
.ChatSideBar {
    width: 286px;
    height: 100%;
    border-right: 1px solid #ebebeb;
}
.ChatListGroup-SectionContent {
    overflow-y: scroll;
    position: relative;
}
.ChatUserListItem {
    align-items: center;
    padding: 12px 20px 12px 29px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
}
.ChatUserListItem--active {
    background-color: #f6f6f6;
}

.ChatUserListItem span {
    font-size: 15px;
    font-weight: 500;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #444;
}

.ChatUserListItem time {
    font-size: 10px;
    color: #999;
}
.ChatListGroup-SectionTitle {
    padding: 16px 20px;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.33;
    color: #444;
}
.ChatBox {
    width: calc(100% - 286px);
    min-height: 600px;
}
.ChatBox-title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    margin: 0 14px;
    height: 50px;
    padding-bottom: 9px;
    padding-top: 21px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;
}
.MessagesBox-wrapper {
    height: calc(100% - 50px - 157px);
    flex: auto;
}
.MessagesBox {
    height: 100%;
    flex-shrink: 0;
    overflow-y: scroll;
}
.Message-time {
    padding-top: 15px;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    color: #999;
}
.Message {
    display: flex;
    margin: 20px;
}
.css-r6ymz {
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;
    background-color: #f6f6f6;
    color: #333;
    text-align: center;
    line-height: 40px;
    font-weight: 600;
    font-size: 16px;
}
.Message-content {
    margin: 0 10px;
}
.TextMessage-sender {
    color: #444;
    background-color: #f6f6f6;
}
.TextMessage {
    max-width: 388px;
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.4px;
    position: relative;
    margin-right: 8px;
    margin-left: 8px;
    text-align: left;
    min-height: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-break: break-all;
}
.TextMessage-sender:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    left: -4px;
    top: 14px;
    background: #f6f6f6;
}
.TextMessage-sender:after {
    transform: rotate(45deg);
}
.Message--reverse {
    flex-direction: row-reverse;
}
.InputBox {
    flex: auto;
    flex-direction: column;
    border-top: 1px solid #ebebeb;
}
.InputBox-footer {
    height: 60px;
    flex-shrink: 0;
    align-items: center;
    padding: 0 20px;
    display: flex;
    justify-content: flex-end;
}
.TextMessage-receiver {
    color: #fff;
    background-color: #06f;
}
.TextMessage-receiver:after {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    right: -4px;
    top: 14px;
    background: #06f;
    transform: rotate(45deg);
}
</style>