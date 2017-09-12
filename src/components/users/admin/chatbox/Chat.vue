<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="18" :offset="2">
                <ul class="chat__list">
                    <li class="chat__item" v-for="(msg, index) in msgs" :key="index">
                        <div class="chat__item-msg" :class="{left: msg.author === auth.username}">
                            <el-row :gutter="20">
                                <div class="author">{{msg.author}}</div>
                                <div class="message">
                                    <pre>{{msg.message}}</pre>

                                </div>
                                <div class="date">
                                    <span>{{msg.date}}</span>
                                </div>
                            </el-row>
                        </div>
                    </li>
                </ul>
                <span class="typing">{{isTyping}}</span>
            </el-col>
            <el-col :span="18" :offset="2">
                <chat-message></chat-message>
            </el-col>
        </div>
    </transition>
</template>
<script>
import Services from '../../../../services/services';
import ChatMessage from './ChatMessage';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['auth'])
    },
    components: {
        'chat-message': ChatMessage
    },
    sockets: {
        connect(msg) {
            console.log('socket connected')
        },
        chat(msgs) {
            this.msgs.push(msg);
        },
        typing(user) {
            this.isTyping = `${user.username} est en train d'écrire ...`
        },
        stopTyping(user) {
            this.isTyping = ''
        },
        userLeft(user) {
            console.log(user)
            console.log(`${user.username} a quitté le salon`)
        },
        response(msg) {
            this.msgs.push(msg);
        },
        getMessages(msgs) {
            this.msgs = msgs;
        },
        newUser(val) {
            console.log(val)
        },
        userJoined(newUser) {
            console.log('joined')
            console.log(newUser)
        }
    },
    created() {
        console.log('created')
        this.login(this.auth.username);
        Services.getMsg().then(res => {
            this.msgs = res.data
        })
    },
    beforeDestroy() {
        console.log('disco')
        console.log(this.$socket)
        this.$socket.emit('logout', 'disconnected')
    },
    methods: {
        login(val) {
            console.log('emmiting')
            this.$socket.emit('login', val);
            this.$socket.emit('add user', val);
        }
    },

    data() {
        return {
            msgs: [],
            isTyping: ''
        }
    }
}
</script>
<style lang="scss" scoped>
.chat__list {
    padding: 20px;
    overflow-y: scroll;
    height: 70vh;
    li {
        list-style: none;
        display: table;
        margin-bottom: 30px;
        position: relative;
        width: 90%;
        max-width: 100%;
        margin: 0 auto 30px;
        .chat__item-msg {
            float: right;
            pre {
                white-space: pre-wrap;
                /* Since CSS 2.1 */
                white-space: -moz-pre-wrap;
                /* Mozilla, since 1999 */
                white-space: -pre-wrap;
                /* Opera 4-6 */
                white-space: -o-pre-wrap;
                /* Opera 7 */
                word-wrap: break-word;
                /* Internet Explorer 5.5+ */
            }
            &.left {
                float: left;
                .author {
                    background: #fff;
                    color: #312736;
                }
                .message {
                    background: #312736;
                    color: #fff;
                }
                .date {
                    background: #fff;
                    color: #312736;
                }
            }
        }
    }
    .author {
        font-weight: bold;
        position: absolute;
        top: -10px;
        color: #fff;
        background: #312736;
        left: -10px;
        padding: 5px 10px;
        border-radius: 5px;
    }
    .message {
        padding: 25px 20px;
        background: #fff;
        color: #312736;
        border-radius: 5px;
        min-width: 150px;
        box-shadow: 2px 2px 10px 0px rgba(66, 66, 66, 0.2);
    }
    .date {
        position: absolute;
        bottom: -10px;
        opacity: 0.9;
        padding: 5px 10px;
        font-weight: bold;
        color: #fff;
        background: #312736;
        right: -10px;
        border-radius: 5px;
        box-shadow: 2px 2px 10px 0px rgba(66, 66, 66, 0.2);
    }
}
</style>
