<template>
    <transition name="el-fade-in-linear">
        <div>
            <min-loader :toHide="loaded"></min-loader>
            <div class="user__wrapper" :class="{visible : loaded}">

                <div class="user__infos">
                    <p>
                        <span>Nom</span>| {{user.username}}</p>
                    <p>
                        <span>Email</span>| {{user.email}}</p>
                    <p>
                        <span>Statut</span> | {{formattedRole}}</p>
                    <router-link v-show="auth.logged" :to="`/users/${user._id}/edit`">
                        <el-button class="user__edit chap-button">Editer mon profil</el-button>
                    </router-link>
                </div>

                <el-form v-if="auth.logged && auth.role == 'admin'" ref="form" class="pushline" :model="form" label-position="top" label-width="120px">
                    <el-form-item label="Annonce">
                        <el-input placeholder="Ecrivez une annonce :)" v-model="form.pushline.title">
                            <el-button class="chap-button" slot="append" @click="onSubmit">Poster</el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                <el-row :gutter="20">
                    <div class="self__perms">
                        <big-title title="Mes permanences"></big-title>
                        <div v-if="subs.length">
                            <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="(sub, index) in subs" :key="sub.date">
                                <div class="perm">
                                    <movie-card :movie="sub.movies[0]"></movie-card>
                                    <div class="perm__item">
                                        <div class="perm_sheet">
                                            <span class="perm__title">{{sub.movies[0].title}}</span>
                                            <span>{{dateInCard(sub.date)}} |
                                                <b>{{sub.time}}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </div>
                        <div v-else>
                            <h5 style="text-align: center">Aucune permanence.</h5>
                        </div>
                    </div>
                </el-row>
                <el-row :gutter="20">
                    <div class="self__perms" v-if="auth.logged && auth.role == 'admin'">
                        <big-title title="Gestion des bénévoles" back="Bénévoles"></big-title>
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="Liste des bénévoles" name="first">
                                <transition name="el-fade-in-linear">
                                    <edit-table></edit-table>
                                </transition>
                            </el-tab-pane>
                            <el-tab-pane label="Newsletter" name="third">
                                <transition name="el-fade-in-linear">
                                    <cp-newsletter></cp-newsletter>
                                </transition>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-row>
            </div>
        </div>

    </transition>
</template>

<script>
import Services from '../../../services/services';
import MinLoader from '../../utils/icons/MinLoader';
import MovieCard from '../../movies/MovieCard';
import BigTitle from '../../utils/BigTitle';
import EditTable from './volunteers/EditTable';
import CPNewsletter from './volunteers/CPNewsletter';
import moment from 'moment';
import { mapGetters } from 'vuex';
import _ from 'lodash';
export default {
    components: {
        'movie-card': MovieCard,
        'big-title': BigTitle,
        'edit-table': EditTable,
        'cp-newsletter': CPNewsletter,
        'min-loader': MinLoader
    },
    computed: {
        ...mapGetters(['auth']),
        formattedRole() {
            if (this.user.role === 'admin') {
                return 'Administrateur'
            } else {
                return 'Bénévole'
            }
        }
    },
    methods: {
        dateInCard(date) {
            return moment.unix(date).format('dddd DD MMMM')
        },
        onSubmit() {
            const now = moment().unix();
            this.form.pushline.date = now
            Services.postAnnounce(this.form.pushline).then(res => {
                this.$notify({
                    title: 'Annonce à jour',
                    message: 'L\'annonce a bien été mise à jour !',
                    type: 'success'
                });
            }).catch(err => {
                this.$notify({
                    title: 'Erreur',
                    message: 'Une erreur s\'est produite',
                    type: 'error'
                });
            })
        }
    },
    created() {
        const now = moment().unix();
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
            Services.getUserSubscription(this.user._id).then(subs => {
                console.log(subs.data)
                this.subs = _.sortBy(subs.data.filter(sub => {
                    return sub.date >= now;
                }), ['date']);

                const legacySubs = subs.data.filter(sub => {
                    return sub.date <= now;
                }).map(toRemove => toRemove._id)

                if (legacySubs.length) {
                    Services.deleteSubs({ legacySubs }, this.auth.token).then(res => {
                        console.log(res);
                    })
                }
                this.loaded = true
            })
        });

        if (this.auth.logged && this.auth.role === 'admin') {
            Services.getAnnounce().then(res => {
                this.form.pushline = res.data[0] || { title: '', date: '' }
            })
        }
    },
    data() {
        return {
            user: {},
            subs: [],
            loaded: false,
            activeName: 'first',
            form: {
                pushline: {
                    title: '',
                    date: moment()
                }
            },

            createUserForm: {
                username: '',
                password: '',
                role: '',
                email: ''
            },
            formLabelWidth: '120px'
        }
    }
}
</script>

<style lang="scss">
.el-tabs__item.is-active {
    color: #000;
}

.el-tabs__active-bar {
    background-color: #000;
}

.user__wrapper,
.self__perms {
    margin-top: 30px;
}

.user__wrapper {
    transition: all 0.3s ease-in;
    opacity: 0;
    &.visible {
        opacity: 1
    }
}



.pushline {
    label {
        font-size: 20px;
        font-weight: bold;
    }
    input {
        border-radius: 0;
        background: rgba(49, 49, 49, 0.20);
        border: none;
        color: #333;
        font-weight: bold;
    }
}

.self__perms {
    h3 {
        margin-bottom: 50px;
    }
    .perm__item {
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        top: 0;
        left: 0;
        border-radius: 5px;
        .perm__title {
            font-weight: bold;
            font-size: 16px;
        }
        span {
            text-align: center;
            display: block;
        }
    }
    .movie__card {
        .lazy {
            padding-bottom: 90%;
        }
        margin-bottom: 10px;
        box-shadow: 10px 9px 19px 0px rgba(66, 66, 66, 0.2);
    }
    .perm {
        position: relative;
        margin-bottom: 20px;
    }
    .perm_sheet {
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        width: 100%;
        transform: translate(-50%, -50%);
        padding: 0 15px;
    }
}



.user__infos {
    display: table;
    margin-bottom: 30px;
    p {
        margin: 0;
        font-size: 18px;
        span {
            font-family: 'InconsolataBold', monospace;
            font-weight: bold;
            width: 70px;
            display: block;
            float: left;
        }
    }
}
</style>
