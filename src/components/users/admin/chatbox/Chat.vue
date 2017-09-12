<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="18" :offset="2">
                <ul class="chat__list">
                    <li class="chat__item" v-for="(msg, index) in msgs" :key="index">
                        <el-row :gutter="20">
                            <div class="author">{{msg.author}}</div>
                            <div class="message">{{msg.message}}</div>
                            <div class="date">
                                <span>{{msg.date}}</span>
                            </div>
                        </el-row>
                    </li>
                </ul>
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
        connect: function(msg) {
            console.log('socket connected')           
        },
        chat: function(msgs) {
            console.log('chat')
            this.msgs.push(msg);
        },
        response: function(msg) {
            console.log('response')
            this.msgs.push(msg);
        },
        getMessages: function(msgs) {
            console.log('getMessages')
            this.msgs = msgs;
        }
    },
    created() {
        console.log('created')
        this.login(this.auth.username);
        Services.getMsg().then(res => {
            this.msgs = res.data
        })
    },
    methods: {
        login(val) {
            console.log('emmiting')
            this.$socket.emit('login', val);
        }
    },

    data() {
        return {
            msgs: []
        }
    }
}
</script>
<style lang="scss" scoped>
.chat__list {
    padding: 0;
    li {
        list-style: none;
        display: table;
        margin-bottom: 20px;
        position: relative;
    }
    .author {
        font-weight: bold;
        position: absolute;
        top: -10px;
        background: #fff;
        left: -10px;
        padding: 5px 10px;
        border-radius: 5px;
    }
    .message {
        padding: 25px 20px;
        background: #bebebe;
        border-radius: 5px;
    }
    .date {
        position: absolute;
        bottom: -10px;
        opacity: 0.8;
        padding: 5px 10px;
        font-weight: bold;
        background: #fff;
        right: -10px;
        border-radius: 5px;
    }
}
</style>
