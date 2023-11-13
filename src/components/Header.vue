<template>
    <el-header height="80px">
        <el-row :gutter="20" v-show="homeheader">
            <el-col :span="4">
                <img
                    src="../assets/logo.png"
                    class="logo mouselink"
                    @click="jumpYsHome()" />
            </el-col>

            <el-col :span="4" class="elcol">
                <div class="headdiv mouselink">
                    <div>
                        <div class="headhz" @click="jumpRole()">角色</div>
                        <div class="headen">Role</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4" class="elcol"
                ><div class="headdiv mouselink">
                    <div>
                        <div class="headhz" @click="jumpAtlas()">图册</div>
                        <div class="headen">atlas</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4" class="elcol"
                ><div class="headdiv mouselink">
                    <div>
                        <div class="headhz" @click="jumpInfo()">资讯</div>
                        <div class="headen">Info</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="1" class="elcol"
                ><div class="headdiv mouselink">
                    <div>
                        <div class="headhz" @click="handleClick()">
                            {{ buttonText }}
                        </div>
                        <div class="headen">{{ engbuttonText }}</div>
                    </div>
                </div>
            </el-col>
            <el-icon
                :size="30"
                id="ArrowUpBold"
                class="mouselink"
                @click="dhlup()"
                ><ArrowUpBold
            /></el-icon>
        </el-row>
        <div
            style="height: 80px; width: 100%; background-color: aqua"
            v-show="!homeheader">
            hhhh
            <el-icon
                :size="30"
                id="ArrowUpBold"
                class="mouselink"
                @click="dhlup()"
                ><ArrowDownBold
            /></el-icon>
        </div>
    </el-header>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "Header-home",
    components: {},
    setup() {
        const router = useRouter();
        const token = localStorage.getItem("token");
        // 根据token的值，返回不同的按钮文字
        const buttonText = computed(() => {
            if (token !== null) {
                return "退出";
            } else {
                return "登录";
            }
        });
        const engbuttonText = computed(() => {
            if (token !== null) {
                return "Exit";
            } else {
                return "Login";
            }
        });

        const jumpRole = () => {
            router.push("/role");
        };
        const jumpYsHome = () => {
            location.href = "https://www.yuanshen.com/";
        };
        const jumpInfo = () => {
            router.push("/info");
        };
        const jumpAtlas = () => {
            router.push("/atlas");
        };

        const handleClick = () => {
            if (token) {
                localStorage.removeItem("token"); // 删除token cookie
                router.go(0);
            } else {
                // 执行登录逻辑
                router.push("/login");
            }
        };

        const homeheader = ref(true);
        const dhlup = () => {
            if (token === null) {
                ElMessage.error("请登录后再操作！");
                return;
            }
            homeheader.value = !homeheader.value;
            console.log(homeheader);
        };
        return {
            jumpRole,
            buttonText,
            handleClick,
            engbuttonText,
            jumpYsHome,
            jumpInfo,
            jumpAtlas,
            dhlup,
            homeheader,
        };
    },
};
</script>

<style>
.elcol {
    :hover {
        background-color: aqua;
    }
}
.el-col {
    &:hover {
        transform: scale(1.03);
        transition: all 0.8s;
    }
    border-radius: 4px;
    margin: 0 auto;
    padding: 5px 20px;
    .headdiv {
        height: 55px;
        width: 80px;
        /* cursor: pointer; */
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        .headhz {
            font-family: hywh;
            font-size: x-large;
        }
        .headen {
            font-size: small;
            font-family: twt;
        }
    }
}
.logo {
    height: 45px;
    cursor: pointer;
}
#ArrowUpBold {
    margin: auto;
    &:hover {
        transform: scale(1.07);
        transition: all 0.6s;
    }
}
</style>
