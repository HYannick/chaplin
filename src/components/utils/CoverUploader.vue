<template>
  <el-form-item label="Affiche du film">
    <el-upload class="avatar-uploader" name="cover" :action="`${apiRoot}/upload/cover`" :show-file-list="false" :disabled="pending" :on-progress="uploadProgress" :on-success="handleAvatarSuccess" :on-change="handleCoverPreview" :auto-upload="false" ref="upCover">
      <img v-if="cover" :src="cover" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="chap-button"  style="margin-top: 10px" type="primary" :disabled="!coverInHere" :loading="pending" @click="submitCover">Ajouter</el-button>
    <el-button class="chap-button" style="margin-top: 10px" type="danger" :disabled="!coverInHere" @click="changeCover">Supprimer</el-button>
  </el-form-item>
</template>

<script>
import api from '../../../config/api';
import Services from '../../services/services';
export default {
  props: ['movie'],
  data() {
    return {
      apiRoot: api.rootUrl,
      cover: '',
      postedCover: '',
      pending: false,
      coverInHere: false
    }
  },
  created() {
    if (this.movie) {
      Services.getMovie(this.movie).then(res => {
        this.cover = `${api.ftpUrl}/${res.data.cover}`;
        this.coverInHere = true;
        this.postedCover = res.data.cover;
      });
    }
  },
  methods: {
    submitCover() {
      this.$refs.upCover.submit();
    },
    changeCover() {
      if (this.postedCover.length) {
        Services.deleteCover(this.postedCover).then(res => {
          this.$emit('resetCover')
          this.cover = '';
          this.coverInHere = false;
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
      } else {
        this.cover = '';
        this.coverInHere = false;
      }

    },
    uploadProgress(e, file, fileList) {
      console.log(e)
      this.pending = true;
      this.coverInHere = false;
    },
    handleCoverPreview(file) {
      this.cover = file.url;
      this.coverInHere = true;
    },
    handleAvatarSuccess(res, file) {
      this.pending = false;
      this.$emit('uploaded', res.cover[0].filename)
      this.postedCover = res.cover[0].filename;
      this.coverInHere = true;
      this.$notify({
        title: 'Ajout d\'affiche',
        message: 'Images ajoutée !',
        type: 'success'
      });
    },
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
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
  border-radius: 0;
}
</style>
