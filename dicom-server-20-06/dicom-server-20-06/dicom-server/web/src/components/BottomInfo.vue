<template>
    <div>
        <footer>
            <div class="container">
                <p>Name：{{ userNmae }}</p>
                <p>ID：{{ id }}</p>
                <p>Telefon Nr.：{{ phone }}</p>
            </div>
        </footer>
    </div>
</template>

<script>
import store from "store";
export default {
    data() {
        return {
            id: "",
            userNmae: "",
            phone: "",
        };
    },
    mounted() {
        const userInfo = store.get("userInfo") || {};
        this.userNmae = userInfo.name || userInfo.emial;
        this.id = userInfo._id;
        this.phone = userInfo.phone;
    },
};
</script>

<style scoped>
footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #f0f0f0;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #b7d3ec;
    color: #2c3e50;
}
.container {
    width: 960px;
    height: 100%;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
}
.container p {
    font-size: 14px;
}
</style>