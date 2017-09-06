<template>
    <transition name="el-fade-in-linear">
        <div>
    
            <el-menu theme="light" :default-active="activeIndex" class="el-menu-demo" mode="vertical" @select="handleSelect">
                <el-menu-item index="0">
                    <router-link class="little__chaplin" to="/">
                        <img src="../../static/img/mini_logo.png" />
                    </router-link>
                </el-menu-item>
    
                <el-menu-item index="1">
                    <router-link to="/">
                        Accueil
                    </router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/diffused">
                        En Salle
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/upcoming">
                        Prochainement
                    </router-link>
                </el-menu-item>
                <el-menu-item index="4">
                    <router-link to="/infos">
                        Tarifs
                    </router-link>
                </el-menu-item>
    
                <transition name="el-fade-in-linear">
                    <div v-if="!auth.logged">
                        <el-menu-item index="6">
                            <router-link to="/signin">
                                Se connecter
                            </router-link>
                        </el-menu-item>
                    </div>
    
                    <div v-else>
                        <el-menu-item index="7">
                            <router-link :to="`/users/${auth.userId}`">
                                Profil
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <a @click="disconnect">Se déconnecter</a>
                        </el-menu-item>
                    </div>
                </transition>
                <div class="social__network">
                    <facebook-icon></facebook-icon>
                    <twitter-icon></twitter-icon>
                    <pinterest-icon></pinterest-icon>
                </div>
            </el-menu>
    
        </div>
    
    </transition>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Services from '../services/services';
import FacebookIcon from './utils/icons/Facebook';
import TwitterIcon from './utils/icons/Twitter';
import PinterestIcon from './utils/icons/Pinterest';
export default {
    components: {
        'facebook-icon': FacebookIcon,
        'twitter-icon': TwitterIcon,
        'pinterest-icon': PinterestIcon
    },
    data() {
        return {
            activeIndex: '1',
            activeIndex2: '1',
            user: {},
            token: ''
        };
    },
    computed: {
        ...mapGetters([
            'auth'
        ]),

    },

    created() {
        if (this.auth.logged) {
            Services.getUser(this.auth.userId, this.token).then(res => {
                this.user = res.data;
            }).catch(err => {
                console.log(err)
            })
        }

    },
    beforeUpdate() {
        this.token = this.auth.token;
    },
    methods: {
        ...mapActions(['logout']),
        disconnect() {
            this.logout();
        },
        handleSelect(key, keyPath) {

        }
    }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');

.el-menu {
    background: #fff;
    margin-top: 50px;
    width: 230px;
    float: right;
    @media screen and (max-width: 768px) {
        float: none;
        margin: 50px auto 0;
        text-align: center;
        li {
            text-align: center;
            padding-left: 0 !important;
            a {
                 &:before {
                    right: initial;
                }
            }
            &:first-child a {
                position: initial;
               
            }
        }
    }
}

.social__network {
    display: table;
    max-width: 30px;
    width: 100%;
    float: right;
    margin: 20px 0;
    @media screen and (max-width: 768px) { 
        max-width: initial;
        width: initial;
        float: none;
        margin: 20px auto;
        a {
            display: block;
            float: left;
            width: 40px;
            margin: 0 5px;
        }
    }
}

.little__chaplin {
    display: table;
    position: absolute;
    z-index: 99;
    top: -30px;
    left: 30px;
}

.el-menu-item {
    text-align: right;
    height: initial;
    line-height: 1;
    padding: 0;
    &:hover,
    &.is-active {
        background: transparent;
        a {
            transform: translateX(10px);
            &:before {
                width: 40%;
            }
        }
    }
    a {
        transition: 0.3s;
        display: block;
        font-size: 24px;
        color: #333;
        padding-top: 15px;
        text-decoration: none;
        font-family: 'Inconsolata', monospace;
        &:before {
            content: '';
            background: #696969;
            position: absolute;
            top: 30px;
            right: -5px;
            opacity: 0.5;
            z-index: 99;
            width: 0;
            transition: 0.3s;
            height: 20px;
        }
    }
}


.logo {
    text-decoration: none;
    span {
        font-family: 'Inconsolata', monospace;
        font-size: 48px;
        text-transform: uppercase;
        line-height: 1.4;
        color: #fff;
    }
}
</style>