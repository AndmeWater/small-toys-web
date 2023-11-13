<template>
    <Header style="position: fixed; width: 100%"></Header>
    <div class="common-layout">
        <el-container>
            <el-main>main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
    name: "HomeView",
    // eslint-disable-next-line
    components: { Header },
    setup() {
        return 0;
    },
});
</script>

<style>
.common-layout {
    padding-top: 80px;
}
</style>
