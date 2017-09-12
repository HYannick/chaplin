<template>
    <transition name="el-fade-in-linear">
        <chat-container></chat-container>
    </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import Chat from './Chat';
export default {
    components: {
        'chat-container': Chat
    },

}
</script>