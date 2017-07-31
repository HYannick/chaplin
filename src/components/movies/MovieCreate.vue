<template>
    <transition name="el-fade-in-linear">
        <el-row :gutter="20">
            <el-col :span="24">
                <h4>Ajouter un film</h4>
                <el-form ref="form" label-position="top" :rules="rules" :model="form" label-width="120px" class="form-add">
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                            <el-form-item label="Movie Cover">
                                <el-upload class="avatar-uploader" name="cover" :action="`${apiRoot}/upload/cover`" :show-file-list="false" :on-success="handleAvatarSuccess" :on-change="handleCoverPreview" :auto-upload="false" ref="upCover">
                                    <img v-if="cover" :src="cover" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    {{form.cover}}
                                </el-upload>
                                <el-button style="margin-top: 10px" type="primary" @click="submitCover">Upload Cover</el-button>
                                <el-button style="margin-top: 10px" type="danger" @click="changeCover">Delete Cover</el-button>
                            </el-form-item>
    
                            <el-form-item label="Auteur(s)">
                                <cs-tags v-model="form.authors"></cs-tags>
                                <cs-tagslist v-model="form.authors"></cs-tagslist>
                            </el-form-item>
    
                            <el-form-item label="Acteurs(s)">
                                <cs-tags v-model="form.actors"></cs-tags>
                                <cs-tagslist v-model="form.actors"></cs-tagslist>
                            </el-form-item>
    
                            <el-form-item label="Genre(s)">
                                <el-select v-model="form.genres" multiple placeholder="Select">
                                    <el-option v-for="item in genres" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
    
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="16" :lg="16">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Titre" prop="title">
                                        <el-input v-model="form.title"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Dates">
                                        <cs-datepicker @change='updateDate' :value="now" format="DD/MM/YYYY" name="Dates"></cs-datepicker>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-table :data="form.dates" style="width: 100%; margin-bottom: 15px">
                                        <el-table-column prop="date" label="Date">
                                        </el-table-column>
                                        <el-table-column prop="time" label="Time">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                    <el-form-item label="Durée">
                                        <el-input v-model="form.duration"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="12">
                                    <el-form-item label="Date de sortie">
                                        <el-input v-model="form.releaseDate"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                    <el-form-item label="Options">
                                        <el-checkbox-group v-model="form.checkList">
                                            <el-checkbox label="VF"></el-checkbox>
                                            <el-checkbox label="VOSTR"></el-checkbox>
                                            <el-checkbox label="3D"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                    <el-form-item label="Langues">
                                        <el-input v-model="form.language"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Description">
                                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="form.desc"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Synopsis">
                                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="form.synopsis"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="trailer">
                                        <el-input v-model="form.trailer"></el-input>
                                        <transition name="el-fade-in-linear">
                                            <youtube v-show="form.trailer !== ''" :video-id="getTrailerUrl" player-height="400px" player-width="100%"></youtube>
                                        </transition>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Movie Gallery">
                                        <el-upload name="images" :action="`${apiRoot}/upload/images`" list-type="picture-card" :on-success="handleListSuccess" :on-change="pushImages" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false" ref="upload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog v-model="dialogVisible" size="large">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                        <el-button style="margin-top: 10px" @click="submitImages">Upload Images</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">Create</el-button>
                        <el-button @click="resetForm('form')">Reset</el-button>
                        <el-button @click="back">Cancel</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </transition>
</template>


<script>
import axios from 'axios';
import DatePicker from '../utils/datepicker/DatePicker';
import DateItem from '../utils/datepicker/DateItem';
import Tags from '../utils/tags/Tags';
import TagsList from '../utils/tags/TagsList';
import moment from 'moment';
import api from '../../../config/api';
import Services from '../../services/services';
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed';
import { mapGetters } from 'vuex';
import genres from './datas/genres.json';
export default {
    data() {
        return {
            apiRoot: api.rootUrl,
            form: {
                title: '',
                synopsis: '',
                cover: '',
                bgCover: '',
                language: '',
                checkList: [],
                duration: '',
                imageSet: [],
                actors: [],
                genres: [],
                releaseDate: '',
                desc: '',
                dates: [],
                authors: [],
                trailer: '',
                diffused: false,
            },
            rules: {
                title: [
                    { required: true, message: 'Veuillez entrer un titre', trigger: 'blur' },

                ]
            },
            dialogImageUrl: '',
            trailerId: '',
            languages: [{
                value: 'Anglais',
                label: 'Anglais'
            }, {
                value: 'Français',
                label: 'Français'
            }, {
                value: 'Espagnol',
                label: 'Espagnol'
            }, {
                value: 'Allemand',
                label: 'Allemand'
            }, {
                value: 'Italien',
                label: 'Italien'
            }],

            genres,
            dialogVisible: false,
            cover: '',
            bgCover: '',
            imageSet: [],
            dates: [],
            formaD: [],
            authentification: false,
            now: moment().format()
        }

    },

    components: {
        'cs-datepicker': DatePicker,
        'cs-tags': Tags,
        'cs-tagslist': TagsList,
        'date-item': DateItem
    },
    computed: {
        getTrailerUrl() {
            this.trailerId = this.$youtube.getIdFromURL(this.form.trailer);
            return this.$youtube.getIdFromURL(this.form.trailer)
        },
        formatDates() {
            return this.form.dates.map((date) => {
                return moment.unix(date).format('LLLL');
            })
        },
        ...mapGetters(['auth'])
    },
    beforeUpdate() {
        if (!this.auth.logged || this.auth.role !== 'admin') {
            this.$router.push('/signin');
        }
    },
    methods: {
        submitCover() {
            this.$refs.upCover.submit();
        },
        changeCover() {
            this.cover = '';
        },
        submitImages() {
            if (this.imageSet.length != 0) {
                this.$refs.upload.submit();
            } else {
                console.error('No files added')
            }
        },

        pushImages(file, fileList) {
            this.imageSet.push(file);
        },
        handleRemove(file, fileList) {
            const dataSet = this.imageSet.filter((image => {
                return image.name !== file.name
            }));

            this.imageSet = dataSet;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCoverPreview(file) {
            this.cover = file.url;
        },
        handleAvatarSuccess(res, file) {
            console.log(res);
            this.cover = URL.createObjectURL(file.raw);
            this.form.cover = res.cover[0].filename;
            this.$notify({
                title: 'Success',
                message: 'Images uploaded !',
                type: 'success'
            });
        },
        handleListSuccess(res, file) {
            console.log(res);
            this.form.imageSet.push(res.images[0].filename);
            console.log(this.form.imageSet);
            this.$notify({
                title: 'Success',
                message: 'Images uploaded !',
                type: 'success'
            });
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('Avatar picture must be JPG format!');
            }
            if (!isLt2M) {
                this.$message.error('Avatar picture size can not exceed 2MB!');
            }
            return isJPG && isLt2M;
        },
        updateDate(date) {
            this.form.dates = date;
        },
      
        back() {
            this.$router.push('/movies');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {
            console.log(this.form);
            console.log(formName)
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    this.form.trailer = this.trailerId;
                    Services.postMovie(this.form)
                        .then(res => {
                            this.$notify({
                                title: 'Success',
                                message: 'Film posté !',
                                type: 'success'
                            });
                            this.$router.push('/movies');
                            console.log(res);
                        })
                        .catch(err => {
                            this.$notify({
                                title: 'Error',
                                message: err,
                                type: 'error'
                            });
                        });
                } else {
                    this.$notify({
                        title: 'Error',
                        message: 'An error occured',
                        type: 'error'
                    });
                    return false;
                }

            });
        }
    }
}
</script>

<style lang="scss">
.form-add {
    margin-top: 30px;
}

.el-select {
    width: 100%;
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