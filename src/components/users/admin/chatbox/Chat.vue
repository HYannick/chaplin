<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="18" :offset="2">
                <ul class="chat__list">
                    <li class="chat__item" v-for="(msg, index) in msgList" :key="index">
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
                <chat-message @post="refreshList"></chat-message>
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
    methods: {
        refreshList() {
            Services.getMsg().then(res => {
                console.log(res)
                this.msgList = res.data;
            })
        }
    },
    created() {
        this.refreshList();
    },
    data() {
        return {
            msgList: [
                {
                    author: 'Mathilde',
                    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in justo malesuada, mollis ligula at, facilisis ex. Nunc pellentesque fermentum varius. ',
                    date: '10/12/990'
                },
                {
                    author: 'Jacqueline',
                    message: 'Duis nec blandit enim. Duis viverra tempor lectus. Suspendisse ac dui enim. Pellentesque venenatis consequat dignissim. Sed consequat blandit diam, eu lobortis leo commodo quis. Cras augue leo, finibus iaculis vestibulum luctus, cursus nec odio. Mauris venenatis nibh cursus erat sagittis imperdiet.',
                    date: '10/12/990'
                },
                {
                    author: 'Paul',
                    message: 'Phasellus egestas pellentesque leo, vitae scelerisque ligula porttitor et. Sed finibus neque nec mi mollis dictum. Nunc finibus enim quis porttitor finibus. Phasellus mollis risus ut pellentesque dapibus. In hac habitasse platea dictumst. Vestibulum tempus neque ac lectus faucibus semper. Praesent auctor scelerisque vestibulum. Aliquam purus nibh, ullamcorper non rhoncus sed, fringilla et arcu. Quisque ex lorem, tincidunt sed laoreet vel, pulvinar a mi. Nam euismod justo nisl, sit amet ultricies magna dignissim a. Phasellus lacus erat, efficitur sed rhoncus sed, hendrerit id leo. Pellentesque in nisi scelerisque, sagittis nunc et, iaculis felis. Suspendisse leo sem, pretium nec lectus nec, dictum volutpat tortor. Quisque euismod, nibh eu rhoncus pellentesque, erat arcu egestas est, at tincidunt tellus metus sit amet velit.',
                    date: '10/12/990'
                },
                {
                    author: 'Laetitia',
                    message: 'Je hais les cornichons',
                    date: '10/12/990'
                }
            ]
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
