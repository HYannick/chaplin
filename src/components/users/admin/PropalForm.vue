<template>
    <el-row>
        <el-col :span="12" :offset="6">
            <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="120px" class="form-add-proposal">
                <h5>Proposer un film</h5>
                <el-row :gutter="20">
                    <el-col :md="12">
                        <el-form-item label="Movie Cover">
                            <el-upload class="avatar-uploader" name="cover" :action="`${apiRoot}/upload/cover`" :show-file-list="false" :on-success="handleAvatarSuccess" :on-change="handleCoverPreview" :auto-upload="false" ref="upCover">
                                <img v-if="cover" :src="cover" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                {{form.cover}}
                            </el-upload>
                            <el-button style="margin-top: 10px" type="primary" size="small" @click="submitCover">Upload Cover</el-button>
                            <el-button style="margin-top: 10px" type="danger" size="small" @click="changeCover">Delete Cover</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="Titre" prop="title">
                            <el-input v-model="form.title"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item label="Lien" prop="title">
                            <el-input v-model="form.url"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :md="12">
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit('form')">Update</el-button>
                            <el-button @click="back">Cancel</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
import Services from '../../../services/services';
import api from '../../../../config/api';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        submitCover() {
            this.$refs.upCover.submit();
        },
        changeCover() {
            this.cover = '';
        },
        handleCoverPreview(file) {
            this.cover = file.url;
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.cover = URL.createObjectURL(file.raw);
            this.form.cover = res.cover[0].filename;
            this.$notify({
                title: 'Ajout d\'affiche',
                message: 'Affiche enregistrée !',
                type: 'success'
            });
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format !');
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB !');
            }
            return isJPG && isLt2M;
        },
        back() {
            this.$router.push('/movies');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        vote() {
            console.log('voted!')
        },
        onSubmit(formName) {
            console.log('Submitting ...');
            console.log(this.form)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Services.postProposal(this.form)
                        .then(res => {
                            this.$emit('reload-proposals');
                            this.$notify({
                                title: 'Film à jour',
                                message: 'Le film a bien été mis à jour !',
                                type: 'success'
                            });

                        })
                        .catch(err => {
                            this.$notify({
                                title: 'Une erreur s\'est produite',
                                message: err,
                                type: 'error'
                            });
                        });
                } else {
                    this.$notify({
                        title: 'Erreur',
                        message: 'Une erreur s\'est produite',
                        type: 'error'
                    });
                    return false;
                }
            })
        },

        back() {
            this.$router.push(`/users/${this.auth.userId}`);
        }
    },
    created() {
        this.form.submitter = this.auth.userId;
    },
    data() {
        return {
            apiRoot: api.rootUrl,
            form: {
                submitter: '',
                title: '',
                cover: '',
                url: ''
            },
            like: 0,
            rules: {
                title: [
                    { required: true, message: 'Veuillez entrer un titre', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: 'Veuillez entrer un lien', trigger: 'blur' },
                ]
            },
            cover: '',
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
