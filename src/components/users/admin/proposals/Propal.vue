<template>
    <transition name="el-fade-in-linear">
        <div>
            <propal-form @reload-proposals="reloadP"></propal-form>
            <el-row>
                <el-row :gutter="10">
                    <div class="header__proposals">
                        <h4 style="float: left">Propositions</h4>
                        <recap-propal :proposals="proposals"></recap-propal>
                    </div>
                </el-row>
                <el-row :gutter="10">
                    <transition-group class="container__grid" name="list" v-on:enter="enter" v-on:leave="leave" tag="div">
                        <div :class="['propal__wrapper', {first: findIndex(propal.likes.length)}, `item-${index}`, {sorted: sorted}]" v-for="(propal, index) in proposals" :key="propal._id">
                            <div class="proposal">
                                <div class="propal">
                                    <div class="like__header">
                                        <span class="submitter">
                                            <b>{{propal.submitter.username || propal.submitter.emailça}}</b>
                                        </span>
                                        <h5 class="prop-title">
                                            <a :href="propal.url" target="_blank">{{propal.title}}</a>
                                        </h5>
                                    </div>

                                    <div class="nb__likes">
                                        <p class="prop-likes">{{propal.likes.length}}</p>
                                    </div>
                                    <div class="approvals">
                                        <span v-for="(user, index) in propal.likes" :key="index">{{user.username}}</span>
                                    </div>
                                    <image-loader classname="lazy" :imageUrl="`${apiFtp}/${propal.cover}`"></image-loader>

                                    <div class="like__footer">
                                        <div class="like__footer--block" v-if="propal.submitter._id !== userId" @click="vote(propal._id, propal)">
                                            <icon :name="(isLiked(propal)) ? 'heart' : 'heart-o'" label="like" scale="1.5"></icon>
                                            <span>Voter</span>
                                        </div>
                                        <div class="like__footer--block" @click="deletePropal(propal._id)" v-if="logged && role == 'admin'">
                                            <icon name="trash" label="trash" scale="1.5"></icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </el-row>
            </el-row>
        </div>
    </transition>
</template>

<script>
import Services from '../../../../services/services';
import api from '../../../../../config/api';
import { mapState } from 'vuex';
import ImageLoader from '../../../utils/imageLoader/ImageLoader';
import PropalForm from './PropalForm';
import RecapPropal from './RecapPropal';
import anime from 'animejs';
import _ from 'lodash';
export default {
    components: {
        'image-loader': ImageLoader,
        'propal-form': PropalForm,
        'recap-propal': RecapPropal
    },
    computed: {
        ...mapState(['userId', 'role', 'logged']),
    },
    methods: {
        enter(el, done) {
            const self = this;
            const proposal = el;
            anime({
                targets: proposal,
                translateX: 0,
                opacity: 1,
                complete: function(anim) {
                    self.sorted = true;
                    done();
                }

            })

        },
        leave(el, done) {
            const proposal = el;
            anime({
                targets: proposal,
                opacity: 0,
                complete: function(anim) {
                    done();
                }
            })

        },
        deletePropal(id) {
            this.$confirm('Etes vous sûr de vouloir supprimer cette proposition ?')
                .then(_ => {
                    Services.deleteProposal(id).then((res) => {
                        this.reloadP();
                        this.$notify({
                            title: 'Succès',
                            message: 'Proposition supprimée !',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.$notify({
                            title: 'Erreur',
                            message: 'Une erreur s\'est produite',
                            type: 'error'
                        });
                    })
                })


        },
        findIndex(likes) {
            if (_.findLastIndex(this.proposals, ['nbLike', likes]) === 0) {
                return true;
            }
        }
        ,
        sortProposals(proposals) {
            proposals.forEach(movie => {
                movie.nbLike = movie.likes.length;
            });

            return _.sortBy(proposals, ['nbLike']).reverse();
        },
        reloadP() {
            Services.getProposals().then(proposals => {
                this.proposals = this.sortProposals(proposals.data)
            });
        },
        back() {
            this.$router.push('/movies');
        },
        isLiked(propal) {
            const mapped = propal.likes.map(likes => likes._id);
            return mapped.indexOf(this.userId) !== -1
        },
        vote(id, propal) {
            Services.likeProposal(id, this.userId).then(proposals => {
                this.proposals = this.sortProposals(proposals.data)
            });
        },

        back() {
            this.$router.push(`/users/${this.userId}`);
        },
        print() {

        }
    },
    created() {
        this.reloadP();
    },
    data() {
        return {
            dialogFormVisible: false,
            apiRoot: api.rootUrl,
            apiFtp: api.ftpUrl,
            like: 0,
            proposals: [],
            sorted: false,
        }
    }
}
</script>

<style scoped lang="scss">
.print__proposals {
    float: right;
}
.header__proposals{
    margin-bottom: 30px;
    display: table;
    width: 100%;
}
.container__grid {
    display: -ms-grid;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1em;
    grid-auto-rows: minmax(100px, auto);
    -ms-grid-columns: 1fr 1fr 1fr 1fr;
    -ms-grid-gap: 1em;
    -ms-grid-auto-rows: minmax(100px, auto);
    .first {
        grid-column: 1/3;
        grid-row: 1/3;
        -ms-grid-column: 1;
        -ms-grid-row: 3;
    }
}

.like__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9;
    color: #fff;
    padding: 5px;
    text-align: center;
    opacity: 0;
    transition: 0.3s ease-out;
}

.like__footer {
    display: flex;
    position: absolute;
    bottom: -15%;
    color: #fff;
    padding: 10px;
    width: 100%;
    transition: 0.3s ease-out;
    &--block {
        flex-grow: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            margin-left: 10px;
        }
        button {
            color: #fff;
            background: transparent;
            border: none;
        }
    }
}

.prop-title {
    font-size: 20px;
    line-height: 32px;
    margin: 0;
    a {
        color: #fff;
    }
}

.nb__likes,
.approvals {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%) scale(1);
    color: #fff;
    opacity: 0.8;
    transition: 0.3s;
    font-size: 80px;
    p {
        margin: 0;
        line-height: 1;
    }
}

.approvals {
    opacity: 0;
    transition: 0.3s;
    span {
        font-size: 14px;
        text-align: center;
        display: block;
    }
}

.propal {
    position: relative;
    overflow: hidden;
    background: #000;
    border-radius: 5px;
    &:hover {
        .lazy {
            transform: scale(1.1);
            opacity: 0.2;
        }
        .like__header {
            opacity: 1;
        }
        .like__footer {
            bottom: 0;
        }
        .nb__likes {
            opacity: 0;
        }
        .approvals {
            opacity: 1;
        }
    }
    .lazy {
        opacity: 0.6;
        transition: 0.3s ease-out;
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    background: #fbfdff;
}

.el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: 200%;
    height: initial;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.propal__wrapper {
    opacity: 0;
    transform: translateX(15px);
    &.sorted {
        transform: translateX(0px);
    }
    transition: 0.3s;
}

.proposal {
    cursor: pointer;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    line-height: 178px;
    text-align: center;
    min-height: 330px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
    width: 100%;
    display: block;
}
</style>
