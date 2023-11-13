<template>
    <router-view />
    <MouseWT></MouseWT>
    <MouseDJ></MouseDJ>
</template>
<script lang="ts">
import MouseWT from "@/components/MouseWT.vue";
import MouseDJ from "@/components/MouseDJ.vue";
export default {
    components: { MouseWT, MouseDJ },
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
    cursor: url("./assets/mouse/pointer.png"), default;
}
.el-input {
    .el-input__inner {
        cursor: url("./assets/mouse/text.png"), text;
    }
}
img,
div,
button,
a {
    .mouselink {
        cursor: url("./assets/mouse/link.png"), pointer;
    }
}
#app {
    width: 100%;
    height: 100%;
}
</style>
