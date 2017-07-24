<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-carousel :interval="6000" height="450px">
                <el-carousel-item v-for="movie in carouselMovies" :key="movie._id">
                    <div class="slide__overlay"></div>
                    <div class="lazy__bg" :class="{loaded : loadedImage}" v-images-loaded:on.progress="imageProgress">
                        <img class="caption" :src="`${apiRoot}/uploads/${movie.imageSet[0]}`" />
                    </div>
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
import imagesLoaded from 'vue-images-loaded';
import MovieCard from './movies/MovieCard';
import MovieListPopular from './movies/MovieListPopular';
import api from '../../config/api';
export default {
    components: {
        'movie-card': MovieCard,
        'movie-list-popular': MovieListPopular
    },
    directives: {
        imagesLoaded
    },
    created() {
        Service.getMovies().then(res => {
            this.carouselMovies = res.data.splice(0, 3)
        });

    },
    data() {
        return {
            carouselMovies: [],
            apiRoot: api.rootUrl,
            loadedImage: false
        }
    },
    methods: {
        imageProgress(instance, image) {
            this.loadedImage = image.isLoaded;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/fonts/font-face.css";
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

.lazy {
    padding-bottom: 150%;
    img {
        transform: translate(-60%, -50%);
    }
    &.loaded {
        img {
            transform: translate(50%, -50%);
        }
        &:before {
            left: 100%;
            opacity: 1;
        }
    }
}

.lazy__set {
    padding-bottom: 50%;
    &.loaded {
        img {
            transform: translate(50%, -50%);
        }
        &:before {
            left: 100%;
            opacity: 1;
        }
    }
}

.lazy__bg {
    padding-bottom: 50%;
    img {
        transform: translate(60%, -50%);
    }
    &.loaded {
        img {
            transform: translate(50%, -50%);
        }
        &:before {
            left: -100%;
            opacity: 1;
        }
    }
}

.lazy,
.lazy__set,
.lazy__bg {
    position: relative;
    overflow: hidden;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        transition: 0.5s ease-in-out;
        opacity: 0;
    }
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: #eef1f6;
        z-index: 99;
        width: 100%;
        height: 100%;
        transition: 0.5s ease-in-out;
    }

    &.loaded {
        img {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
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
