<template>
    <div class="manage_page fillcontain">
        <div style="height: 100%; display: flex">
            <div style="min-height: 100vh">
                <el-menu
                    :default-active="defaultActive"
                    :default-openeds="defaultOpeneds"
                    style="min-height: 100vh"
                    theme="dark"
                    class="el-menu-vertical"
                    background-color="#324057"
                    text-color="#fff"
                    router
                >
                    <el-submenu
                        v-for="route in routerList"
                        :key="route.path"
                        :index="route.path"
                    >
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            {{ route.name }}
                        </template>
                        <el-menu-item
                            v-for="item in route.children"
                            :key="item.path"
                            :index="route.path + '/' + item.path"
                            :style="`display:${item.hidden ? 'none' : 'block'}`"
                            >{{ item.name }}</el-menu-item
                        >
                    </el-submenu>
                </el-menu>
            </div>
            <div  style="width: calc(100% - 200px); height: 100%; overflow: auto">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import store from "store";
import { routes } from '../router'
export default {
    data() {
        return {
            routerList: [],
        };
    },
    mounted: function () {
        this.routerList = routes.filter((p) => !p.hidden);
    },
    computed: {
        defaultActive: function () {
            return this.$route.path;
        },
        defaultOpeneds: function () {
            return this.$route.path.match(/^\/[A-Za-z]*|\/$/g) || [];
        },
    },
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
.manage_page {
}
</style>
<style>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
