<template>
    <div class="talkbox">
        <ul class="infinite-list" style="overflow: auto">
            <li
                v-for="(message, index) in messages"
                :key="index"
                class="infinite-list-item">
                {{ message }}
            </li>
        </ul>
        <div class="srk">
            <p>
                用户名：
                <el-input
                    v-if="inputVisible"
                    ref="InputRef"
                    v-model="inputValue"
                    class="ml-1 w-20"
                    size="small"
                    autofocus
                    :style="{ width: `${buttonweight}px` }"
                    @keyup.enter="handleInputConfirm()"
                    @blur="handleInputConfirm()"></el-input>
                <el-button
                    v-else
                    ref="myButtonRef"
                    class="button-new-tag ml-1"
                    size="small"
                    style="height: 21px"
                    @click="showInput">
                    {{ userid }}
                </el-button>
                <span>当前在线人数:{{ num }}</span>
            </p>
            <div style="width: 100%; text-align: center">
                <input v-model="messageInput" type="text" @keyup.enter="send" />
                <button @click="send" style="margin-left: 5px">发送</button>
                <button @click="closeWebSocket" style="margin-left: 5px">
                    {{ loginOrExit }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { nextTick, ref } from "vue";
export default {
    setup() {
        const messageInput = ref("");
        const messages = ref([]);
        const websocket = ref(null);
        const count = ref(0);
        const userid = ref("user" + Math.floor(Math.random() * 1000));
        const num = ref(0);
        const inputValue = ref("");
        const inputVisible = ref(false);
        const InputRef = ref(null);
        const myButtonRef = ref(null);
        const buttonweight = ref(0);
        const loginOrExit = ref("关闭");

        const setMessageInnerHTML = (innerHTML) => {
            const userid = innerHTML.userid;
            const message = innerHTML.message;
            if (message.substring(message.length - 3) === "房间！") {
                messages.value = [...messages.value, message];
            } else {
                messages.value = [...messages.value, userid + ":" + message];
            }
            scrollToBottom();
        };

        const setWelcome = (message) => {
            messages.value = [...messages.value, message];
            scrollToBottom();
        };

        const closeWebSocket = () => {
            if (
                websocket.value !== undefined &&
                websocket.value.readyState === WebSocket.OPEN
            ) {
                websocket.value.close();
                num.value -= 1;
                loginOrExit.value = "连接";
            } else {
                initWebSocket();
                loginOrExit.value = "关闭";
            }
        };

        const send = () => {
            if (
                websocket.value !== undefined &&
                websocket.value.readyState === WebSocket.OPEN
            ) {
                if (messageInput.value !== "") {
                    websocket.value.send(messageInput.value);
                } else {
                    setWelcome("发送不能为空！");
                }
            } else {
                setWelcome("您已离开房间，请重新连接！");
            }

            messageInput.value = "";
        };
        const load = () => {
            count.value += 2;
        };

        const scrollToBottom = () => {
            const messageList = document.querySelector(".infinite-list");

            requestAnimationFrame(() => {
                messageList.scrollTop = messageList.scrollHeight;
            });
        };

        const updateName = (newName) => {
            userid.value = newName;
            websocket.value.send("newnameis:" + newName);
        };

        const handleInputConfirm = () => {
            if (inputValue.value) {
                updateName(inputValue.value);
            }
            inputVisible.value = false;
            inputValue.value = "";
        };

        const showInput = () => {
            inputVisible.value = true;
            buttonweight.value = myButtonRef.value.$el.offsetWidth;
            nextTick(() => {
                InputRef.value?.input?.focus(); // 使用可选链操作符
            });
        };

        const initWebSocket = () => {
            if ("WebSocket" in window) {
                websocket.value = new WebSocket(
                    "ws://193.111.30.89:1211/websocket/" + userid.value,
                );
                websocket.value.onerror = () => {
                    setWelcome("系统错误");
                };

                websocket.value.onopen = () => {
                    setWelcome("进入房间");
                };

                websocket.value.onmessage = (event) => {
                    const dataFromServer = JSON.parse(event.data);
                    num.value = dataFromServer.num;
                    setMessageInnerHTML(dataFromServer);
                };

                websocket.value.onclose = () => {
                    setWelcome("离开房间");
                };

                window.addEventListener("beforeunload", () => {
                    websocket.value.close();
                });
            } else {
                alert("不支持WebSocket");
            }
        };

        return {
            messageInput,
            messages,
            websocket,
            count,
            setMessageInnerHTML,
            closeWebSocket,
            send,
            load,
            initWebSocket,
            num,
            userid,
            inputValue,
            updateName,
            inputVisible,
            InputRef,
            showInput,
            handleInputConfirm,
            myButtonRef,
            buttonweight,
            loginOrExit,
        };
    },
    mounted() {
        this.initWebSocket();
    },
};
</script>

<style lang="scss" scoped>
/* 你的样式在这里添加 */

.talkbox {
    height: 600px;
    width: 500px;
    margin: auto;
}

.infinite-list {
    height: 700px;
    padding: 0;
    margin: 0;
    list-style: none;
}
.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: auto;
    color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
}

span {
    float: right;
}

@media (max-width: 600px) {
    .talkbox {
        margin: 0vw;
    }
    .srk {
        width: 100vw;
        margin-left: auto;
    }
    .infinite-list {
        height: 500px;
    }

    .infinite-list .infinite-list-item {
        height: 10vw; /* Set your mobile height in vw units */
    }
    .infinite-list {
        width: 100vw;
    }

    .infinite-list .infinite-list-item + .list-item {
        margin-top: 1vw; /* Set your mobile margin in vw units */
    }
}
</style>
