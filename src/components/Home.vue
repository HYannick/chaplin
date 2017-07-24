<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-carousel :interval="6000" height="450px">
                <el-carousel-item v-for="movie in carouselMovies" :key="movie._id">
                    <div class="slide__overlay"></div>
                    <image-loader classname="lazy__bg" :imageUrl="`${apiRoot}/uploads/${movie.imageSet[0]}`"></image-loader>
                   
                    <div class="slide__desc">
                        <span>{{movie.releaseDate}}</span>
                        <h3>{{movie.title}}</h3>
                        <p>{{movie.desc}}</p>
                        <router-link :to="`/movies/${movie._id}`" class="goTo" tag="a">En savoir plus</router-link>
                    </div>
    
                </el-carousel-item>
            </el-carousel>
            <el-col :span="24" class="wrapper">
                <div class="movie__list">
                    <movie-list-popular></movie-list-popular>
                </div>
            </el-col>
    
        </div>
    
    </transition>
</template>

<script>
import Service from '../services/services';
import ImageLoader from './utils/imageLoader/ImageLoader';
import MovieCard from './movies/MovieCard';
import MovieListPopular from './movies/MovieListPopular';
import api from '../../config/api';
export default {
    components: {
        'movie-card': MovieCard,
        'movie-list-popular': MovieListPopular,
        'image-loader': ImageLoader
    },
    created() {
        Service.getMovies().then(res => {
            this.carouselMovies = res.data.splice(0, 3)
        });

    },
    data() {
        return {
            carouselMovies: [],
            apiRoot: api.rootUrl
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/fonts/font-face.css";
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

.slide__desc {
    position: absolute;
    max-width: 400px;
    width: 100%;
    bottom: 50px;
    right: 0;
    z-index: 9;
    background: rgba(255, 255, 255, 0.8);
    padding: 10px 40px 10px 15px;
    h3 {
        font-weight: bold;
        span {
            font-size: 18px;
            font-weight: lighter;
        }
    }
}

.slide__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    left: 0;
    z-index: 1;
}

.goTo {
    color: #333;
    padding: 10px 15px;
    position: relative;
    display: table;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    z-index: 9;
    text-transform: uppercase;
    transition: 0.3s;
    &:hover {

        &:before {
            width: 90%;
        }
    }
    &:before {
        content: '';
        background: #fff;
        position: absolute;
        top: 20px;
        width: 0;
        right: -5px;
        opacity: 0.95;
        z-index: -1;
        transition: 0.3s;
        height: 20px;
    }
}

.links__list {
    position: absolute;
    width: 100%;
    top: -30px;
    ;
}



.movie__list {
    padding-top: 50px;
}

.links__dir {
    padding: 15px 20px;
    text-align: center;
    border-radius: 2px;
    background: #8492A6;
    color: #D3DCE6;
    width: 100%;
    font-size: 16px;
    display: table;
}

.main__head {
    margin-top: 20px;
}

.main__title {
    font-family: 'chaplin';
    color: #fff;
    text-align: center;
    text-transform: uppercase;
}

.subtitle {
    color: #fff;
    text-align: center;
}

.el-carousel__item {
    opacity: 0.5;
    img {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.is-active {
        opacity: 1;
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
