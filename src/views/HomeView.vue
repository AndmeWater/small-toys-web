<template>
    <Header style="position: fixed; width: 100%"></Header>
    <div class="common-layout">
        <el-container>
            <el-main
                >main
                <e-button @click="tztalk()">聊天页面</e-button>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "HomeView",
    // eslint-disable-next-line
    components: { Header },
    setup() {
        const router = useRouter();
        const tztalk = () => {
            router.push("/talk");
        };
        return { tztalk };
    },
});
</script>

<style>
.common-layout {
    padding-top: 80px;
}
</style>
