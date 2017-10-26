<template>
  <transition name="el-fade-in-linear">
    <el-row :gutter="20">
      <el-col :span="24">
        <h4>Ajouter un film</h4>
        <el-form ref="form" class="pushline" label-position="top" label-width="120px">
          <el-form-item label="Préremplir via Allociné">
            <el-input placeholder="Entrez une url allociné pour pré-remplir la fiche" v-model="scrapUrl">
              <el-button class="chap-button" slot="append" @click="scrapbookUrl">Pré-remplir</el-button>
            </el-input>
          </el-form-item>
        </el-form>
        <el-form ref="form" label-position="top" :rules="rules" :model="form" label-width="120px" class="form-add">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" style="padding-top:20px">
              <cover-uploader @reset="resetCover" @uploaded="addToForm"></cover-uploader>

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
            <el-col :xs="24" :sm="24" :md="16" :lg="16" class="bordering">
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
                  <el-form-item label="Origine(s)">
                    <el-input v-model="form.language" placeholder="Nationalité(s) du film"></el-input>
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
                              placeholder="Limite d'âge, scènes sensibles ..." v-model="form.disclaimer"></el-input>
                  </el-form-item>
                  <el-form-item label="Description">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="form.desc"></el-input>
                  </el-form-item>
                  <el-form-item label="Synopsis">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="form.synopsis"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="Bande d'annonce">
                    <el-input v-model="form.trailer" placeholder="entrez un lien Youtube uniquement."></el-input>
                    <transition name="el-fade-in-linear">
                      <youtube v-show="form.trailer !== ''" :video-id="getTrailerUrl" player-height="400px"
                               player-width="100%"></youtube>
                    </transition>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="Galerie d'images">
                    <el-upload name="images" :action="`${apiRoot}/upload/images`" list-type="picture-card"
                               :on-success="handleListSuccess" :on-change="pushImages"
                               :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false"
                               ref="upload">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="large">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-button class="chap-button" style="margin-top: 10px" @click="submitImages">Ajouter</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item style="float: right; margin-top: 15px">
            <el-button class="chap-button" type="primary" @click="onSubmit('form')">Créer</el-button>
            <el-button class="chap-button" @click="resetForm('form')">Reset</el-button>
            <el-button class="chap-button" @click="back">Annuler</el-button>
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
  import CoverUploader from '../utils/CoverUploader';
  import TagsList from '../utils/tags/TagsList';
  import moment from 'moment';
  import api from '../../../config/api';
  import Services from '../../services/services';
  import {getIdFromURL, getTimeFromURL} from 'vue-youtube-embed';
  import {mapGetters} from 'vuex';
  import genres from './datas/genres.json';

  export default {
    data() {
      return {
        apiRoot: api.rootUrl,
        maxUpload: false,
        form: {
          title: '',
          synopsis: '',
          cover: '',
          information: '',
          disclaimer: '',
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
            {required: true, message: 'Veuillez entrer un titre', trigger: 'blur'},

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
        scrapUrl: '',
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
      'date-item': DateItem,
      'cover-uploader': CoverUploader
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
      scrapbookUrl() {
        Services.getScrapbooked({url: this.scrapUrl}).then(res => {
          const o = Object.assign({}, this.form, res.data)
          this.form = o;
          console.log(o)
        })
      },
      formatDate(row, column) {
        return moment.unix(row.date).format('ddd DD MMM YYYY');
      },
      formatDubbing(row, column) {
        return row.dubbing || 'VF'
      },
      submitImages() {
        if (this.imageSet.length) {
          this.$refs.upload.submit();
        } else {
          console.error('No files added')
        }
      },
      addToForm(res) {
        this.form.cover = res;
      },
      resetCover() {
        this.form.cover = '';
      },

      pushImages(file, fileList) {
        this.imageSet.push(file);
      },
      handleRemove(file, fileList) {
        /* if (this.form.imageSet.length) {
             Services.deleteCover(file.name).then(res => {
                 this.$notify({
                     title: 'Suppression',
                     message: 'Image supprimée !',
                     type: 'success'
                 });
             }).catch(err => {
                 this.$notify({
                     title: 'Erreur',
                     message: 'Une erreur s\'est produite',
                     type: 'error'
                 });
             })
         }*/
        const dataSet = this.imageSet.filter((image => {
          return image.name !== file.name
        }));
        this.imageSet = dataSet;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleListSuccess(res, file) {
        console.log(res);
        this.form.imageSet.push(res.images[0].filename);
        console.log(this.form.imageSet);
        this.$notify({
          title: 'Ajout d\'images',
          message: 'Affiche ajoutée !',
          type: 'success'
        });
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
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.trailer = this.trailerId;
            Services.postMovie(this.form)
              .then(res => {
                this.$notify({
                  title: 'Ajout du film',
                  message: 'Film posté !',
                  type: 'success'
                });
                this.$router.push(`/users/${this.auth.userId}/movies`);
                console.log(res);
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

  .el-upload {
    .avatar {
      position: absolute;
      transform: translate(-50%, -50%) scale(1.2);
      top: 50%;
      left: 50%;
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: 500px;
    @media screen and (max-width: 1024px) {
      min-height: 330px;
    }
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
</style>