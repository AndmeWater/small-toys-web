<template>
    <div class="login-ym">
        <img
            src="../assets/loginlogo.png"
            alt=""
            id="zslogo"
            class="mouselink"
            style="position: fixed"
            @click="bkhome()" />
        <div class="bgtp mouselink"></div>
        <div class="login-box">
            <div class="kelipic"></div>
            <div class="logindiv">
                <h2 style="margin-top: 5px">原神</h2>
                <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    class="demo-ruleForm">
                    <div>
                        <el-form-item class="input-ys" prop="userid">
                            <el-input
                                v-model="ruleForm.userid"
                                placeholder="请输入账号或者邮箱"
                                autocomplete="off" />
                        </el-form-item>
                        <el-form-item class="input-ys" prop="password">
                            <el-input
                                v-model="ruleForm.password"
                                placeholder="请输入密码"
                                type="password"
                                autocomplete="off" />
                        </el-form-item>
                    </div>
                    <div
                        class="ydsm"
                        style="
                            display: flex;
                            align-items: center;
                            margin-top: 40px;
                            margin-left: 40px;
                        ">
                        <el-checkbox
                            v-model="checked1"
                            @click="subyhxy()"
                            style="transform: scale(0.9)"
                            size="small" />
                        <el-link type="primary" @click="openweb()"
                            >同意《OP协议》</el-link
                        >
                    </div>
                    <el-form-item
                        class="input-ys"
                        style="margin-top: 10px; margin-left: 60px">
                        <el-button
                            @click="submitForm(ruleFormRef)"
                            type="success"
                            round
                            >启动</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { LoginData } from "@/type/Login";
import { login } from "@/request/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const data = new LoginData();
const ruleFormRef = ref<FormInstance>();
//表单
const ruleForm = ref(data);
//路由
const router = useRouter();

//同意协议
const checked1 = ref(true);

const subyhxy = () => {
    open();
    setTimeout(() => {
        checked1.value = true;
    }, 250);
};
const open = () => {
    ElMessage.error("蒸馍，你不扶器。不想成为OP?");
};
//密码检测
const checkpwd = (rule: any, value: string, callback: any) => {
    const regexNumber = /[0-9]/; // 大写字母
    const regexLowerCase = /[A-Za-z]/; // 小写字母
    const regexSymbol = /[!@#$%^&*.`~()]/; // 符号

    const containsNumber = regexNumber.test(value);
    const containsLowerCase = regexLowerCase.test(value);
    const containsSymbol = regexSymbol.test(value);

    let num = 0;

    if (containsNumber) num++;
    if (containsLowerCase) num++;
    if (containsSymbol) num++;
    if (num >= 2) {
        callback(); // 验证通过
    } else {
        callback(new Error("密码必须包含字母、数字和符号中的任意两种"));
    }
};

const rules = {
    userid: [
        { required: true, message: "请输入账号或者邮箱！", trigger: "blur" },
        { min: 3, max: 32, message: "账号长度在3-32位之间！", trigger: "blur" },
    ],
    password: [
        { required: true, message: "请输入密码！", trigger: "blur" },
        { min: 6, max: 32, message: "密码长度在6-32位之间！", trigger: "blur" },
        { validator: checkpwd, trigger: "blur" },
    ],
};
//表单提交
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            login(data).then((res: any) => {
                if (res === null || res === undefined) {
                    console.log("网络连接错误！");
                    ElMessage.error("网络连接错误,请重试！");
                    return false;
                }

                if (res.data.code === "1") {
                    ElMessage.success("登录成功！");
                    localStorage.setItem("token", res.data.token); //保存token
                    router.push("/");
                } else {
                    ElMessage.error("密码输入错误或用户不存在！");
                }
            });
        } else {
            console.log("error submit!");
            return false;
        }
    });
};
//打开新网页
const openweb = () => {
    let url =
        "https://webstatic.mihoyo.com/upload/static-resource/2022/08/10/2ddcf1122e76dd9eca6a9bb3bfc8d74d_889895620420174827.pdf";
    window.open(url);
};
const bkhome = () => {
    router.push("/");
};
</script>
<style lang="scss" scoped>
.login-ym {
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, cyan, transparent),
        linear-gradient(225deg, magenta, transparent),
        linear-gradient(45deg, yellow, transparent);
    background-size: cover;
    position: absolute;
    background-position: center;
    /* 居中对齐 */
    border: none;
    left: 0;
    top: 0;
    #zslogo {
        width: 90px;
        margin-top: 30px;
        margin-left: 50px;
        // cursor: pointer;
        transition: all 0.7s;
        &:hover {
            transform: scale(1.2);
        }
    }
    .bgtp {
        background: url(../assets/loginbg.png);
        width: 40%;
        height: 100%;
        margin-left: 60%;
        background-size: cover;
        // cursor: pointer;
        cursor: url("../assets/mouse/help.png"), auto;
        transition: all 0.7s;
        &:hover {
            transform: scale(1.1);
        }
    }
    .login-box {
        height: 500px;
        width: 1000px;
        margin-top: 350px;
        margin-left: 200px;
        position: absolute;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        .kelipic {
            float: left;
            height: 300px;
            width: 531px;
            border-top-left-radius: 20px;
            border-bottom-left-radius: 20px;
            background: url("../assets/keli.png");
            background-color: blanchedalmond;
            background-size: contain;
            background-repeat: no-repeat;
        }
        .logindiv {
            text-align: center;
            font-size: large;
            height: 300px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            width: 300px;
            float: left;
            background-color: #f4f6fa;
            .demo-ruleForm {
                margin-top: 20px;
                width: 240px;
                margin-left: 20px;
            }
        }
    }
}
</style>
