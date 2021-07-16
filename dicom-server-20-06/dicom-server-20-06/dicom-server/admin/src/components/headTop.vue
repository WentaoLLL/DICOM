<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item> -->
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align="start">
            <img src="http://localhost:10086/images/head.jpeg" class="avator" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="signout">Ausloggen</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>

import { baseImgPath } from '@/config/env'
import store from 'store'

export default {
    data() {
        return {
            baseImgPath,
            avatar: ""
        }
    },
    mounted() {
        const userInfo = store.get('userInfo') || {}
        this.avatar = userInfo.avatar
    },
    methods: {
        async handleCommand(command) {
            if (command == 'signout') {
                store.set('isLogin', false)
                this.$message({
                    type: 'success',
                    message: 'Ausloggen fertig!'
                });
                this.$router.push('/login');
            }
        },
    }
}
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
    background-color: #eff2f7;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
}
.avator {
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
    object-fit: cover;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
