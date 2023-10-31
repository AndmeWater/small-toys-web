<template>
    <router-view />
</template>
<script lang="ts">
export default {
    components: {},
};
</script>
<style lang="scss">
@import "./font-style/font.css";

* {
    padding: 0px;
    margin: 0px;
}
html,
body {
    font-family: hywh, twt;
}
#app {
    width: 100%;
    height: 100%;
}
</style>
