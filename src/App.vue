<template>
  <div id="app">
    <el-row>
      <el-col :xs="24" :sm="24" :md="6" :lg="4">
        <ch-header></ch-header>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="14" class="main__wrapper">
        <router-view></router-view>
      </el-col>
      <el-col :span="6" class="fixed__side">
        <div class="sidebar"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="18">
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

<style lang="scss">
@import './assets/fonts/font-face.css';
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
body {
  background: #fff;
}

.bordering {
    border-radius: 10px;
    border: 4px solid #eef1f6;
    padding-top: 15px;
}

.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover{
  background: transparent;
  opacity: 0.5;
  color: grey !important;
  &:hover{
    &:before{
      background: transparent;
    }
  }
}
.chap-button.el-button--danger {
  color: #ff4949;
  &:before {
    background-color: #ff4949;
    border-color: #ff4949;
  }
}

.chap-button.el-button--primary {
  color: #20a0ff;
  &:before {
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
}

.chap-button.el-button--success {
  color: #13ce66;
  &:before {
    background-color: #13ce66;
    border-color: #13ce66;
  }
}

.chap-button {
  border-radius: 0;
  margin-top: 5px;
  position: relative;
  font-size: 18px;
  transition: 0.3s;
  padding: 10px 30px;
  z-index: 1;
  outline: none;
  background: transparent;

  @media screen and (max-width: 468px) {
    width: 100%;
    margin-left: 0 !important;
  }
  &:hover {
    color: #fff;
    border-color: #fff;
    &:before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%) scale(0);
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 00;
    transition: 0.3s;
  }
}

.fixed__side {
  position: fixed;
  right: 0;
  top: 0;
  @media screen and (max-width: 1024px) {
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
  min-height: 100vh;
}
</style>
