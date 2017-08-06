<template>
    <transition name="el-fade-in-linear">
        <div>
            <propal-form @reload-proposals="reloadP"></propal-form>
            <el-row>
                <h4>Propositions</h4>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="(propal, index) in proposals" :key="propal._id">
                        <a :href="`${propal.url}`" target="_blank" class="proposal">
                            <span>
                                <b>{{propal.submitter.username || propal.submitter.email}}</b>
                            </span>
                            <h5>{{propal.title}}</h5>
                            <p>{{propal.likes.length}}</p>
                            <image-loader classname="lazy" :imageUrl="`${apiFtp}/${propal.cover}`"></image-loader>
                            <el-button @click="vote(propal._id)">Voter</el-button>
                        </a>
                    </el-col>
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
export default {
    components: {
        'image-loader': ImageLoader,
        'propal-form': PropalForm
    },
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        reloadP() {
            Services.getProposals().then(movies => {
                this.proposals = movies.data
            });
        },
        back() {
            this.$router.push('/movies');
        },
        vote(id) {
            console.log('voting to :: ', id)
       
            Services.likeProposal(id, this.auth.userId).then(res => {
                Services.getProposals().then(movies => {
                    this.proposals = movies.data
                });
            });
        },

        back() {
            this.$router.push(`/users/${this.auth.userId}`);
        }
    },
    created() {
        Services.getProposals().then(movies => {
            this.proposals = movies.data
        });
    },
    data() {
        return {
            apiRoot: api.rootUrl,
            apiFtp: api.ftpUrl,
            like: 0,
            proposals: []
        }
    }
}
</script>

<style lang="scss">
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
.proposal{
    transition: 0.3s;
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

.form-add-proposal {
    background: #e8e8e8;
    border-radius: 10px;
    padding: 15px;
}
</style>
