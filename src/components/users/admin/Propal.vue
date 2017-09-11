<template>
    <transition name="el-fade-in-linear">
        <div>
            <propal-form @reload-proposals="reloadP"></propal-form>
            <el-row>
                <h4>Propositions</h4>
                <el-row>
                    <transition-group name="list" v-on:enter="enter" v-on:leave="leave">
                        <el-col class="propal__wrapper" :class="{sorted: sorted}" :xs="24" :sm="12" :md="6" :lg="6" v-for="(propal, index) in proposals" :key="propal._id">
                            <div class="proposal">
                                <div class="propal">
                                    <div class="like__header">
                                        <span class="submitter">
                                            <b>{{propal.submitter.username || propal.submitter.email}}</b>
                                        </span>
                                        <h5 class="prop-title">
                                            <a :href="propal.url" target="_blank">{{propal.title}}</a>
                                        </h5>
                                    </div>

                                    <div class="nb__likes">
                                        <p class="prop-likes">{{propal.likes.length}}</p>
                                    </div>
                                    <image-loader classname="lazy" :imageUrl="`${apiFtp}/${propal.cover}`"></image-loader>
                                    <div class="like__footer">
                                        <div class="like__footer--block" @click="vote(propal._id, propal)">
                                            <icon :name="(isLiked(propal)) ? 'heart' : 'heart-o'" label="like" scale="1.5"></icon>
                                            <span>Voter</span>
                                        </div>
                                        <div class="like__footer--block" @click="deletePropal(propal._id)" v-if="auth.logged && auth.role == 'admin'">
                                            <icon name="trash" label="trash" scale="1.5"></icon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </transition-group>
                </el-row>
            </el-row>

        </div>
    </transition>
</template>

<script>
import Services from '../../../services/services';
import api from '../../../../config/api';
import { mapGetters } from 'vuex';
import ImageLoader from '../../utils/imageLoader/ImageLoader';
import PropalForm from './PropalForm';
import anime from 'animejs';
import _ from 'lodash';
export default {
    components: {
        'image-loader': ImageLoader,
        'propal-form': PropalForm
    },
    computed: {
        ...mapGetters(['auth']),
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
                translateX: 15,
                opacity: 0,
                complete: function(anim) {
                    done();
                }
            })

        },
        deletePropal(id) {
            Services.deleteProposal(id).then((res) => {
                this.reloadP();
            })
        },
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
            return propal.likes.indexOf(this.auth.userId) !== -1
        },
        vote(id, propal) {
            Services.likeProposal(id, this.auth.userId).then(proposals => {
                this.proposals = this.sortProposals(proposals.data)
            });
        },

        back() {
            this.$router.push(`/users/${this.auth.userId}`);
        }
    },
    created() {
        this.reloadP();
    },
    data() {
        return {
            apiRoot: api.rootUrl,
            apiFtp: api.ftpUrl,
            like: 0,
            proposals: [],
            sorted: false,
        }
    }
}
</script>

<style lang="scss">
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
    transition: 0.3s;
}

.like__footer {
    display: flex;
    position: absolute;
    bottom: -15%;
    color: #fff;
    padding: 10px;
    width: 100%;
    transition: 0.3s;
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

.nb__likes {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%) scale(1);
    color: #fff;
    opacity: 0.7;
    transition: 0.3s;
    font-size: 80px;
    p {
        margin: 0;
        line-height: 1;
    }
}

.propal {
    position: relative;
    overflow: hidden;
    background: #000;
    &:hover {
        .lazy {
            transform: scale(1.1);
            opacity: 0.5;
        }
        .like__header {
            opacity: 1;
        }
        .like__footer {
            bottom: 0;
        }
        .nb__likes {
            opacity: 1;
        }
    }
    .lazy {
        opacity: 0.6;
        transition: 0.3s;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 100%;
    display: block;
}
</style>
