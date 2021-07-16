<template>
    <div id="app" class="fillcontain">
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
@import "./style/common";
</style>

<style>
.input-with-select {
    width: 350px !important;
}
.haeder-search {
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
