<template>
  <div id="app">
    <el-row>
      <el-col :xs="24" :sm="24" :md="4" :lg="4">
        <ch-header></ch-header>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" class="main__wrapper">
        <router-view></router-view>
      </el-col>
      <el-col :span="6" class="fixed__side">
        <div class="sidebar">
          <div class="title__cinema">
            <h2>CHAPLIN</h2>
            <h4>Cinéma de Montmélian</h4>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="18">
        <ch-footer></ch-footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    'ch-header': Header,
    'ch-footer': Footer
  }
}
</script>

<style scoped lang="scss">
@import './assets/fonts/font-face.css';
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
body {
  background: #fff;
}

.fixed__side {
  position: fixed;
  right: 0;
  top: 0;
  @media screen and (max-width: 765px) {
    display: none;
  }
}

.title__cinema {
  text-align: center;
  margin-top: 40px;
  h2 {
    font-family: 'chaplin', monospace;
    margin-bottom: 0;
    line-height: 1;
    font-size: 45px;
  }
  h4 {
    margin: 0;
    font-family: 'Inconsolata', monospace;
    font-size: 16px;
    line-height: 1;
  }
}

.sidebar {
  background: url('../static/img/side_bg.png') bottom left no-repeat #dadada;
  background-size: cover;
  height: 100vh;
  overflow: hidden;
  .chaplin__side {
    width: 100%;
  }
}

.main__wrapper {
  position: relative;
  padding: 40px;
}
</style>
