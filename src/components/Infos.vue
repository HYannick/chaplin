<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-row>
                <el-col :span="24">
                    <div class="background__cover">
                        <img src="" </div>
                </el-col>
                <el-col :span="12">
                    <gmap-map :center="center" :zoom="18" style="width: 100%; height: 300px">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
                    </gmap-map>
                </el-col>
            </el-row>
            </div>
    
    </transition>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import Service from '../services/services';

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDgekJpEuFLvMrFENwFdpi46rmKeZV9a50'
    }
});

export default {
    components: {

    },
    created() {


    },
    data() {
        return {
            center: { lat: 45.5001538, lng:6.0483445 },
            markers: [{
                position: { lat: 45.5001538, lng: 6.0483445 }
            }]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/fonts/font-face.css";
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

.background__cover {
    height: 400px;
    overflow: hidden;
    position: relative;
    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 1;
    }
    img {
        width: 100%;
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -20%);
        opacity: 0.8;
    }
}
</style>
