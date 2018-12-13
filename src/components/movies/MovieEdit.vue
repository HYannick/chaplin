<template>
    <transition name="el-fade-in-linear">
        <el-row :gutter="20">
            <el-col :span="24">
                <h4>Modifier le film | {{form.title}}</h4>
                <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="120px"
                         class="form-add">
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8" style="padding-top:20px">
                            <cover-uploader :movie="id" @reset="resetCover" @uploaded="addToForm"></cover-uploader>

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
                                    <el-option v-for="item in genres" :key="item.value" :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="A l'affiche ?">
                                <el-switch v-model="form.diffused" on-text="Oui" off-text="Non" on-color="#13ce66"
                                           off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                            <el-form-item label="A afficher prochainement ?">
                                <el-switch v-model="form.upcoming" on-text="Oui" off-text="Non" on-color="#13ce66"
                                           off-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="16" :lg="16" class="bordering">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="Titre" prop="title">
                                        <el-input v-model="form.title"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="Dates">
                                        <cs-datepicker @change='updateDate' :value="now" format="DD/MM/YYYY"
                                                       name="Dates"></cs-datepicker>
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
                                    <el-form-item label="Origine(s)">
                                        <el-input v-model="form.language"
                                                  placeholder="Nationalité(s) du film"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="24">
                                    <el-form-item label="Information">
                                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                                                  placeholder="Informations sur le film (réalisateur/acteurs présent(s), événement spécial à l'occasion ...)"
                                                  v-model="form.information"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Avertissement">
                                        <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}"
                                                  placeholder="Limite d'âge, scènes sensibles ..."
                                                  v-model="form.disclaimer"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Description">
                                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}"
                                                  v-model="form.desc"></el-input>
                                    </el-form-item>
                                    <el-form-item label="Synopsis">
                                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}"
                                                  v-model="form.synopsis"></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Bande d'annonce">
                                        <el-input v-model="form.trailer"
                                                  placeholder="entrez un lien Youtube uniquement."></el-input>
                                        <transition name="el-fade-in-linear">
                                            <youtube v-show="form.trailer !== ''" :video-id="getTrailerUrl"
                                                     player-height="400px" player-width="100%"></youtube>
                                        </transition>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="Galerie d'images">
                                        <el-upload name="images" :action="`${apiRoot}/upload/images`" multiple
                                                   :file-list="fileList" list-type="picture-card"
                                                   :on-change="pushImages" :on-preview="handlePictureCardPreview"
                                                   :on-remove="handleRemove" :auto-upload="false" ref="upload">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog v-model="dialogVisible" size="large">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                        <el-button class="chap-button" style="margin-top: 10px" @click="postPreviews">
                                            Ajouter
                                        </el-button>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                        </el-col>

                    </el-row>

                    <el-form-item style="float: right; margin-top: 15px">
                        <el-button class="chap-button" type="primary" @click="onSubmit('form')">Mettre à jour
                        </el-button>
                        <el-button class="chap-button" type="danger" @click="deleteMovie">Supprimer</el-button>
                        <el-button class="chap-button" @click="back">Annuler</el-button>
                    </el-form-item>
                </el-form>
            </el-col>

        </el-row>
    </transition>
</template>


<script>
  import axios from 'axios';
  import {mapState} from 'vuex';
  import api from '../../../config/api';
  import helpers from '../../assets/js/helpers';
  import genres from './datas/genres.json';
  import Tags from '../utils/tags/Tags';
  import TagsList from '../utils/tags/TagsList';
  import CoverUploader from '../utils/CoverUploader';
  import DatePicker from '../utils/datepicker/DatePicker';
  import moment from 'moment';
  import Services from '../../services';

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
          information: '',
          disclaimer: '',
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
            {required: true, message: 'Veuillez entrer un titre', trigger: 'blur'},
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
        recycleBin: []
      }

    },
    components: {
      'cs-datepicker': DatePicker,
      'cs-tags': Tags,
      'cs-tagslist': TagsList,
      'cover-uploader': CoverUploader
    },
    computed: {
      getTrailerUrl() {
        return this.$youtube.getIdFromURL(this.form.trailer)
      },
      ...mapState(['logged', 'role', 'userId'])
    },
    beforeUpdate() {
      if (!this.logged || this.role !== 'admin') {
        this.$router.push('/signin');
      }
    },
    created() {
      Services.movies.getMovie(this.id).then(res => {
        this.form = res.data;
        res.data.imageSet.forEach(image => {
          this.fileList.push({'name': image, 'url': `${api.s3Url}/${image}`})
        });
        this.cover = `${api.s3Url}/${res.data.cover}`;
      });
    },
    methods: {
      formatDate(row) {
        return moment.unix(row.date).format('ddd DD MMM YYYY');
      },
      formatDubbing(row) {
        return row.dubbing || 'VF'
      },
      submitCover() {
        this.$refs.upCover.submit();
      },
      addToForm(res) {
        this.form.cover = res;
      },
      resetCover() {
        this.form.cover = '';
      },

      async postPreviews() {
        try {
          await Services.uploads.deleteImageSet(this.recycleBin)
          await helpers.asyncForEach(this.imageSet, async item => {
            const config = {
              headers: {'Content-Type': item.type}
            }
            const url = await Services.uploads.getSignedUrl()
            await axios.put(url.data.signedUrl, item, config)
            this.form.imageSet.push(url.data.key);
            this.$notify({
              title: 'Ajout d\'images',
              message: 'Affiche ajoutée !',
              type: 'success'
            });
          })
        } catch(e) {
          console.log(e.message)
          this.$notify({
            title: 'Erreur d\'images',
            message: e.message,
            type: 'error'
          });
        }

      },
      pushImages(file) {
        this.imageSet.push(file.raw)
      },
      handleRemove(file) {
        const filterData = (array, file) => array.filter((image => (image.name ? image.name : image) !== file.name));
        this.imageSet = filterData(this.imageSet, file);
        this.form.imageSet = filterData(this.form.imageSet, file);
        this.recycleBin.push(file.name)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
            Services.movies.updateMovie(this.id, this.form)
              .then(() => {
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
                  message: 'Une erreur s\'est produite' + e.message,
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
            Services.movies.removeMovie(this.id).then(res => {
              this.$notify({
                title: 'Suppression',
                message: 'Film supprimé !',
                type: 'success'
              });
              this.$router.push(`/users/${this.userId}/movies`);
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
        min-height: 500px;
        @media screen and (max-width: 1024px) {
            min-height: 330px;
        }
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

    .el-upload {
        .avatar {
            position: absolute;
            transform: translate(-50%, -50%) scale(1.2);
            top: 50%;
            left: 50%;
        }
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        line-height: 178px;
        text-align: center;
        min-height: 500px;
        @media screen and (max-width: 1024px) {
            min-height: 330px;
        }
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar {
        width: 100%;
        display: block;
        border-radius: 5px;
    }
</style>
