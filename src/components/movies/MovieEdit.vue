<template>
    <transition name="el-fade-in-linear">
        <el-row :gutter="20">
            <el-col :span="24">
                <h4>Modifier le film | {{form.title}}</h4>
                <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="120px" class="form-add">
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                            <el-form-item label="Movie Cover">
                                <el-upload class="avatar-uploader" name="cover" :action="`${apiRoot}/upload/cover`" :show-file-list="false" :on-success="handleAvatarSuccess" :on-change="handleCoverPreview" :auto-upload="false" ref="upCover">
                                    <img v-if="cover" :src="cover" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <el-button style="margin-top: 10px" type="primary" @click="submitCover">Ajouter</el-button>
                                <el-button style="margin-top: 10px" type="danger" @click="changeCover">Supprimer</el-button>
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
                            <el-form-item label="A l'affiche ?">
                                <el-switch v-model="form.diffused" on-text="Oui" off-text="Non" on-color="#13ce66" off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="A afficher prochainement ?">
                                <el-switch v-model="form.upcoming" on-text="Oui" off-text="Non" on-color="#13ce66" off-color="#ff4949">
                                </el-switch>
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
                                        <el-table-column prop="date" label="Date" :formatter="formatDate">
                                        </el-table-column>
                                        <el-table-column prop="time" label="Heure">
                                        </el-table-column>
                                        <el-table-column prop="dubbing" label="Doublage" :formatter="formatDubbing">
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
                                    <el-form-item label="Bande d'annonce">
                                        <el-input v-model="form.trailer"></el-input>
                                        <transition name="el-fade-in-linear">
                                            <youtube v-show="form.trailer !== ''" :video-id="getTrailerUrl" player-height="400px" player-width="100%"></youtube>
                                        </transition>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Movie Gallery">
                                        <el-upload name="images" :action="`${apiRoot}/upload/images`" :file-list="fileList" list-type="picture-card" :on-change="pushImages" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false" ref="upload" :on-success="handleListSuccess">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog v-model="dialogVisible" size="large">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                        <el-button style="margin-top: 10px" @click="submitImages">Ajouter</el-button>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-col>

                    </el-row>

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">Mettre à jour</el-button>
                        <el-button type="danger" @click="deleteMovie">Supprimer</el-button>
                        <el-button @click="back">Annuler</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

        </el-row>
    </transition>
</template>


<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import api from '../../../config/api';
import genres from './datas/genres.json';
import Tags from '../utils/tags/Tags';
import TagsList from '../utils/tags/TagsList';
import DatePicker from '../utils/datepicker/DatePicker';
import moment from 'moment';
import Services from '../../services/services';
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed';

export default {
    props: ['id'],
    data() {
        return {
            apiRoot: api.rootUrl,
            form: {
                title: '',
                synopsis: '',
                cover: '',
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
                upcoming: false
            },
            rules: {
                title: [
                    { required: true, message: 'Veuillez entrer un titre', trigger: 'blur' },
                ]
            },
            dialogImageUrl: '',
            trailerId: '',
            genres,
            fileList: [],
            dialogVisible: false,
            cover: '',
            imageSet: [],
            now: moment().format(),
        }

    },
    components: {
        'cs-datepicker': DatePicker,
        'cs-tags': Tags,
        'cs-tagslist': TagsList
    },
    computed: {
        getTrailerUrl() {
            return this.$youtube.getIdFromURL(this.form.trailer)
        },
        ...mapGetters(['auth'])
    },
    beforeUpdate() {
        if (!this.auth.logged || this.auth.role !== 'admin') {
            this.$router.push('/signin');
        }
    },
    //TODO : handle confirm on changing route
    /*beforeRouteLeave (to, from, next) {
        this.$confirm('Are you sure move ?')
                .then(_ => {
                    next();
                })
                .catch(err => {
                   console.error(err);
                });
    },*/
    created() {
        Services.getMovie(this.id).then(res => {
            this.form = res.data;
            res.data.imageSet.forEach(image => {
                this.fileList.push({ 'name': image, 'url': `${api.ftpUrl}/${image}` })
            });
            this.cover = `${api.ftpUrl}/${res.data.cover}`;

        });
    },
    methods: {
        formatDate(row, column) {
            return moment.unix(row.date).format('ddd DD MMM YYYY');
        },
        formatDubbing(row, column) {
            return row.dubbing || 'VF'
        },
        submitCover() {
            this.$refs.upCover.submit();
        },
        changeCover() {
            Services.deleteCover(this.form.cover).then(res => {
                this.cover = '';
                this.form.cover = '';
                this.$notify({
                    title: 'Suppression',
                    message: 'Affiche supprimée !',
                    type: 'success'
                });
            }).catch(err => {
                this.$notify({
                    title: 'Erreur',
                    message: 'Une erreur s\'est produite',
                    type: 'error'
                });
            })
        },
        submitImages() {
            if (this.form.imageSet.length != 0) {
                this.$refs.upload.submit();
            } else {
                console.error('No files added')
            }
        },
        handleAvatarSuccess(res, file) {
            this.cover = URL.createObjectURL(file.raw);
            this.form.cover = res.cover[0].filename;
            this.$notify({
                title: 'Ajout d\'affiche',
                message: 'Affiche ajoutée !',
                type: 'success'
            });
        },
        handleListSuccess(res, file) {
            this.$notify({
                title: 'Ajout d\'images',
                message: 'Images ajoutées !',
                type: 'success'
            });
        },
        pushImages(file, fileList) {

            let list = fileList.map(file => file.name);

            this.form.imageSet = list;
        },
        handleRemove(file, fileList) {
            const dataSet = this.form.imageSet.filter((image => {
                return image !== file.name
            }));
            this.form.imageSet = dataSet;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCoverPreview(file) {
            this.cover = file.url;
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
        updateDate(date) {
            this.form.dates = date;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {
            console.log('Submitting ...');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.trailer = this.$youtube.getIdFromURL(this.form.trailer);
                    Services.updateMovie(this.id, this.form)
                        .then(res => {
                            this.$notify({
                                title: 'Mise à jour',
                                message: 'Film mis à jour !',
                                type: 'success'
                            });
                            this.$router.push(`/movies/${this.id}`)
                        })
                        .catch(err => {
                            this.$notify({
                                title: 'Erreur',
                                message: 'Une erreur s\'est produite',
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
        deleteMovie() {
            this.$confirm('Etes vous sûr de vouloir supprimer ce film ?')
                .then(_ => {
                    Services.removeMovie(this.id).then(res => {
                        this.$notify({
                            title: 'Suppression',
                            message: 'Film supprimé !',
                            type: 'success'
                        });
                        this.$router.push('/movies')
                    })
                })
                .catch(err => {
                    this.$notify({
                        title: 'Erreur',
                        message: 'Une erreur s\'est produite',
                        type: 'error'
                    });
                });
        },

        back() {
            this.$router.push(`/movies/${this.id}`);
        }
    }
}
</script>

<style lang="scss">
.form-add {
    margin-top: 30px;
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
    border-radius: 5px;
}
</style>
