<template>
    <transition name="el-fade-in-linear">
        <div>
            <chat-container></chat-container>
        </div>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import Chat from './Chat';
export default {
    components: {
        'chat-container' : Chat
    },
    data() {
        return {
            socket: null,
            loggedIn: false,
            username: ''
        }
    },
    sockets: {
        connect: function() {
            console.log('socket connected')
        },
        customEmit: function(val) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    },
    created() {
       this.$socket.on('news', function(data) {
           console.log(data);
       })
    },
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        login(val) {
            console.log('emmiting')
            this.$socket.emit('emit_method', val);
        }

    }
}
</script>