<template>
    <el-header height="80px">
        <el-row :gutter="20">
            <el-col :span="4">
                <img
                    src="../assets/logo.png"
                    class="logo"
                    @click="jumpYsHome()" />
            </el-col>

            <el-col :span="4" class="elcol">
                <div class="headdiv">
                    <div>
                        <div class="headhz" @click="jumpRole()">角色</div>
                        <div class="headen">Role</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4" class="elcol"
                ><div class="headdiv">
                    <div>
                        <div class="headhz">图册</div>
                        <div class="headen">atlas</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4" class="elcol"
                ><div class="headdiv">
                    <div>
                        <div class="headhz">资讯</div>
                        <div class="headen">Info</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="1" class="elcol"
                ><div class="headdiv">
                    <div>
                        <div class="headhz" @click="handleClick()">
                            {{ buttonText }}
                        </div>
                        <div class="headen">{{ engbuttonText }}</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script lang="ts">
import { computed } from "vue";
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
        const handleClick = () => {
            if (token) {
                localStorage.removeItem("token"); // 删除token cookie
                router.go(0);
            } else {
                // 执行登录逻辑
                router.push("/login");
            }
        };

        return { jumpRole, buttonText, handleClick, engbuttonText, jumpYsHome };
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
    border-radius: 4px;
    margin: 0 auto;
    box-shadow: inset 0 0 16px 6px rgba(255, 255, 255, 1);
    padding: 5px 20px;

    .headdiv {
        height: 45px;
        width: 80px;
        cursor: pointer;
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
    height: 43px;
    cursor: pointer;
}
</style>
