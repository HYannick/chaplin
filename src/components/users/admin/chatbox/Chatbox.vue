<template>
    <transition name="el-fade-in-linear">
        <div class="chat__wrapper" v-show="visible">
            <el-col :span="2">
                <div class="connected__users">
                    <div class="user" v-for="(user, index) in userList" :key="index">
                        {{user.slice(0, 2)}}
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="22" :lg="22">
                <ul class="chat__list" ref="chatList">
                    <li class="chat__item" v-for="(msg, index) in msgs" :key="index">
                        <div class="chat__item-msg" :class="{left: msg.author === auth.username}">
                            <el-row :gutter="20">
                                <div class="author">{{msg.author}}</div>
                                <div class="message" ref="message">
                                    <div v-if="!msg.message.includes('http')">
                                        <pre>{{msg.message}}</pre>
                                    </div>
                                    <div v-else v-html="formatMessage(msg.message)"></div>
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
            <el-col :xs="24" :sm="24" :md="{span: 22, offset:2}" :lg="{span: 22, offset:2}">
                <chat-message></chat-message>
            </el-col>
        </div>
    </transition>
</template>
<script>
    import Services from '../../../../services/services';
    import ChatMessage from './ChatMessage';
    import {mapGetters} from 'vuex';

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = Math.easeOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeOutQuad = function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    };


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
                this.userList = user.numUsers;
                console.log(`${user.username} a quitté le salon`)
            },
            response(msg) {
                this.msgs.push(msg);
                setTimeout(() => {
                    this.scrollToEnd()
                })
            },
            getMessages(msgs) {
                this.msgs = msgs;
                // tricky here
                setTimeout(() => {
                    this.scrollToEnd()
                })
            },
            newUser(val) {
                console.log(val)
                this.userList = val.numUsers;
            },
            userJoined(newUser) {
                console.log(newUser.username + ' joined the room')
                this.userList = newUser.numUsers;
                console.log('here is the userlist: ' + this.userList)
            }
        },
        created() {
            this.login(this.auth.username);
            Services.getMsg().then(res => {
                this.msgs = res.data
                this.visible = true;
                setTimeout(() => {
                    const container = this.$refs['chatList'];
                    container.scrollTop = container.scrollHeight;
                })
            })
        },
        beforeDestroy() {
            this.$socket.emit('logout', 'disconnected')
        },
        methods: {
            formatMessage($string) {
                //cf : https://stackoverflow.com/questions/18920671/detect-url-links-and-replace-image-with-img-tag-and-links-with-a-href
                const __urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                const __imgRegex = /\.(?:jpe?g|gif|png)$/i;
                const __youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
                const exp = __urlRegex;

                function youtube_parser(url) {
                    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                    const match = url.match(regExp);
                    return (match && match[7].length == 11) ? match[7] : false;
                }

                return $string.replace(exp, function (match) {
                        __imgRegex.lastIndex = 0;
                        if (__imgRegex.test(match)) {
                            return '<br><img style="max-width: 100%" src="' + match + '" class="chat__thumb" /><br>';
                        }
                        else if (__youtubeRegex.test(match)) {
                            return '<br><div style="min-width: 560px"></div><iframe  width="100%" height="415" src="https://www.youtube.com/embed/' + youtube_parser(match) + '" frameborder="0" allowfullscreen></iframe></div><br>'
                        } else {
                            return '<a class="chat__link" href="' + match + '" target="_blank">' + match + '</a>';
                        }
                    }
                );
            },
            login(val) {
                this.$socket.emit('add user', val);
            },
            scrollToEnd() {
                const container = this.$refs['chatList'];
                scrollTo(container, container.scrollHeight, 500);
            }
        },

        data() {
            return {
                msgs: [],
                isTyping: '',
                userList: [],
                visible: false,
            }
        }
    }
</script>
<style lang="scss" scoped>
    .chat__wrapper {
        margin-top: 50px;
    }

    .chat__link {
        color: #fff;
    }

    .connected__users {
        @media screen and (max-width: 458px) {
            display: none;
        }
    }

    .user {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        margin: 0 auto 10px;
        background: #312736;
        font-size: 20px;
        color: #fff;
        border-radius: 15px;
        text-transform: uppercase;
    }

    .chat__list {
        padding: 0 20px;
        overflow-y: scroll;
        height: 70vh;
        border-radius: 5px;
        background: #f3f3f3;
        li {
            list-style: none;
            display: table;
            margin-bottom: 30px;
            position: relative;
            width: 90%;
            max-width: 100%;
            margin: 0 auto 30px;
            .chat__item-msg {
                float: left;
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
                    .author {
                        background: #fff;
                        color: #312736;
                    }
                    .message {
                        background: #312736;
                        color: rgb(210, 210, 210);
                        a{
                            font-size: 28px;
                        }
                    }
                    .date {
                        color: #fff;
                        background: #312736;
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
            box-shadow: 2px 2px 10px 0px rgba(66, 66, 66, 0.2);
        }
        .message {
            padding: 25px 20px;
            background: #fff;
            color: #312736;
            border-radius: 5px 5px 0 0;
            min-width: 150px;
            box-shadow: 2px 2px 10px 0px rgba(66, 66, 66, 0.2);
        }
        .date {
            bottom: -10px;
            text-align: right;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: bold;
            background: #fff;
            color: #312736;
            right: -10px;
            border-radius: 0 0 5px 5px;
            box-shadow: 2px 2px 10px 0px rgba(66, 66, 66, 0.2);
        }
    }
</style>
