<template>
    <transition name="el-fade-in-linear">
        <div>
            <preloader :toHide="loaded"></preloader>

            <div v-show="loaded">
                <div class="home__announce">
                    <announce-icon></announce-icon>
                    <p>{{announce.title}}</p>
                </div>
                <el-carousel :interval="6000" height="0">
                    <el-carousel-item v-for="movie in carouselMovies" :key="movie._id">
                        <div class="slide__overlay"></div>
                        <image-loader classname="lazy__bg" :imageUrl="`${apiRoot}/${movie.imageSet[0]}`"></image-loader>
                        <div class="slide__desc">
                            <span>{{movie.releaseDate}}</span>
                            <h3>{{movie.title}}</h3>
                            <p>{{movie.desc | truncate(240)}}</p>
                            <router-link :to="`/movies/${movie._id}`" class="goTo" tag="a">En savoir plus</router-link>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <el-col :span="24" class="wrapper">
                    <div class="movie__list">
                        <big-title title="A l'affiche" orientation="top"></big-title>
                        <movie-list-popular :limit="4"></movie-list-popular>
                    </div>
                    <div class="timeline__schedule">

                        <a class="view__pdf chap-button" target="_blank" :href="`${apiPDF}`">
                            <span>
                                <icon name="file-pdf-o"></icon> Voir le programme</span>
                        </a>

                        <big-title title="Au programme" orientation="top"></big-title>

                        <div class="movie__planning">
                            <movie-timeline :movies="movies" :maxRow="isMax" display="homeSchedule" @refresh="loadMovies" :completed="complete"></movie-timeline>
                        </div>
                    </div>
                </el-col>
            </div>

        </div>

    </transition>
</template>

<script>
import Services from '../services';
import ImageLoader from './utils/imageLoader/ImageLoader';
import MovieCard from './movies/MovieCard';
import MovieListPopular from './movies/MovieListPopular';
import MovieSched from './movies/MovieSched';
import Preloader from './utils/icons/Loader';
import BigTitle from './utils/BigTitle';
import AnnounceIcon from './utils/icons/Announce';
import api from '../../config/api';
export default {
    components: {
        'movie-card': MovieCard,
        'movie-list-popular': MovieListPopular,
        'movie-timeline': MovieSched,
        'image-loader': ImageLoader,
        'preloader': Preloader,
        'big-title': BigTitle,
        'announce-icon': AnnounceIcon
    },
    filters : {
      truncate(text, stop, clamp) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
      }
    },
    created() {
        Services.movies.getDiffusedMovies(4).then(res => {
            this.movies = res.data.movieList;
            this.carouselMovies = res.data.movieList;
            this.loaded = true;
        });
        Services.announces.getAnnounce().then(res => this.announce = res.data[0] || { title: '', date: '' })
    },
    data() {
        return {
            movies: [],
            carouselMovies: [],
            apiRoot: api.ftpUrl,
            apiPDF: api.pdfUrl,
            announce: {},
            loaded: false,
            complete: true,
            isMax: false
        }
    },
    methods: {
        loadMovies(limit) {
            this.complete = false;
            Services.announces.getDiffusedMovies(limit).then(res => {
                this.complete = true;
                this.movies = res.data.movieList;
                this.isMax = res.data.max;
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../assets/fonts/font-face.css";
* {
    font-family: 'inconsolataRegular', monospace;
}

h1,
h2,
h3,
h4 {
    font-family: 'inconsolataBold', monospace;
}
pre {
    white-space: pre-wrap;
    /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
}
.view__pdf {
    float: right;
    position: relative;
    z-index: 99;
    text-decoration: none;
    border: 1px solid #000;
    color: #000;
}

.home__announce {
    position: relative;
    display: flex;
    font-size: 20px;
    margin-bottom: 20px;
    z-index: 0;
    p {
        margin-left: 10px;
        font-family: 'inconsolataBold', monospace;
        margin-bottom: 0;
    }
    &:before {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 40px;
        z-index: -1;
        background: #f3f3f3;
        width: 90%;
        height: 70%;
    }
}

.timeline__schedule {
    margin-top: 70px;
}

.movie__planning {
    position: relative;
    margin-top: 40px;
    h2 {
        text-align: left;
        position: absolute;
        font-weight: bold;
        right: -15px;
        top: -50px;
        z-index: 999;
        opacity: 0.9;
    }
    display: table;
    width: 100%;
}

.slide__desc {
    position: absolute;
    max-width: 400px;
    width: 100%;
    bottom: 10%;
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
    margin-top: 70px;
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

.el-carousel {
    @media screen and (max-width: 768px) {
        display: none;
    }
}

.el-carousel__container {
    position: relative;
    padding-bottom: 50%;
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
