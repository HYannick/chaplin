<template>
    <div>
        <el-row>
            <el-col :span="12">
                <h4>Settings | {{user.username || user._id}}</h4>
            </el-col>
            <el-col :span="12">
                <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo profile__nav" mode="horizontal">
                    <router-link :to="`/users/${auth.userId}/`">Profil</router-link>
                    <router-link :to="`/users/${auth.userId}/perms`">Permanences</router-link>
                    <router-link :to="`/users/${auth.userId}/propal`">Propositions</router-link>
                    <router-link :to="`/users/${auth.userId}/chat`">Chat</router-link>
                    <router-link v-show="auth.logged && auth.role == 'admin'" :to="`/users/${auth.userId}/movies`">Films</router-link>
                </el-menu>
            </el-col>
        </el-row>
        <el-row>
            <router-view></router-view>
        </el-row>
    
    </div>
</template>
<script>
import Services from '../../services/services';
import { mapGetters } from 'vuex';
export default {

    created() {
    
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
        });

    },
    beforeUpdate() {
        if (!this.auth.logged) {
            this.$router.push('/signin');
        }
    },
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    data() {
        return {
            user: {},
            activeIndex: '1',
            activeIndex2: '1',
        }
    }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

.profile__nav {
    background: none;
    margin-bottom: 30px;
    float: right;
    a {
        font-size: 20px;
        color: #333;
        opacity: 0.5;
        transition: 0.3s;
        margin-right: 10px;
        text-decoration: none;
        position: relative;
        &:before {
            content: '';
            background: #696969;
            position: absolute;
            top: 12px;
            right: -5px;
            opacity: 0.5;
            z-index: 99;
            width: 0;
            transition: 0.3s;
            height: 20px;
        }
    }
    .router-link-exact-active.router-link-active {
        opacity: 1;
        &:before {
            width: 80%;
        }
    }
}
</style>
