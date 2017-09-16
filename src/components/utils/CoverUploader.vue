<template>
  <el-form-item label="Affiche du film">
    <el-upload class="avatar-uploader" name="cover" :action="`${apiRoot}/upload/cover`" :show-file-list="false" :disabled="pending" :on-progress="uploadProgress" :on-success="handleAvatarSuccess" :on-change="handleCoverPreview" :auto-upload="true" ref="upCover">
      <min-loader v-show="pending"></min-loader>
      <img v-if="cover" :src="cover" class="avatar" :class="{pending: pending}">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="chap-button" style="width: 100%" type="danger" :disabled="!coverInHere" @click="changeCover">Supprimer l'image</el-button>
  </el-form-item>
</template>

<script>
import api from '../../../config/api';
import Services from '../../services/services';
import MinLoader from '../utils/icons/MinLoader';
export default {
  props: ['movie'],
  components: {
    'min-loader': MinLoader
  },
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
.avatar.pending{
  opacity: 0.2;
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
    @media screen and (max-width: 1024px){
          min-height: 330px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar {
  width: 100%;
  display: block;
  border-radius: 0;
  transition: 0.3s;
}
</style>
