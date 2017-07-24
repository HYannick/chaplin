<template>
  <div id="app">
    <el-col :span="4">
      <ch-header></ch-header>
    </el-col>
    <el-col :span="14" class="main__wrapper">
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
  </div>
</template>

<script>
import Header from './components/Header.vue';
export default {
  name: 'app',
  components: {
    'ch-header': Header
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
  padding: 20px;
}
</style>
