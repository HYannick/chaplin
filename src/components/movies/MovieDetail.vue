<template>
    <transition name="el-fade-in-linear">
        <el-row v-if="show">
            <el-row :gutter="15">
                <el-col :span="24">
                    <div class="background__cover">
                        <div class="background__cover__overlay"></div>
                        <div class="movie__trailer" @click="playTrailer">
                            <transition name="el-fade-in-linear">
                                <div v-show="displayTitle" class="player__button">
                                    <i class="player__icon el-icon-caret-right"></i>
                                </div>
                            </transition>
                            <youtube class="yt__frame" v-show="trailerEnabled" @ready="ready" :video-id="movie.trailer" player-height="100%" player-width="100%" :player-vars="trailerOptions" @playing="animateTitle('playing')" @ended="animateTitle('stopped')"></youtube>
                        </div>

                        <image-loader classname="lazy__bg" :imageUrl="bgCover"></image-loader>
                        <transition name="el-fade-in-linear">
                            <div class="background__details" v-show="displayTitle">
                                <p class="movie__release">{{movie.releaseDate}}</p>
                                <h4 class="movie__title">{{movie.title}}</h4>

                                <p class="movie__infos">
                                    <span class="movie__duration">{{movie.duration}}</span> |
                                    <span class="movie__genre" v-for="(genre,index) in movie.genres" :key="index">{{genre}} </span> |
                                    <span class="move__options">{{movie.checklist}}</span>
                                </p>
                            </div>
                        </transition>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :xs="24" :sm="24" :md="{ 'span': 22, 'offset': 1 }" :lg="{ 'span': 22, 'offset': 1 }" class="wrapper__details" :class="{'slide-down': downWrapper}">
                    <el-row :gutter="15">
                        <el-col :span="24">
                            <div class="main__desc">
                                <el-col :xs="24" :sm="24" :md="6" :lg="6">
                                    <div class="cover">
                                        <image-loader classname="lazy" :imageUrl="cover"></image-loader>
                                        <router-link class="edit__button" v-show="auth.logged && auth.role == 'admin'" :to="`/movies/${movie._id}/edit`">
                                            <el-button class="chap-button" type="primary">Editer</el-button>
                                        </router-link>
                                        <a class="viewTrailer__mobile" :href="`https://www.youtube.com/watch?v=${movie.trailer}`">
                                            <el-button class="chap-button" type="primary">Bande d'annonce</el-button>
                                        </a>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="10" :lg="10">
                                    <div class="short__desc">
                                        <h5>Synopsis</h5>
                                        <div class="sub__infos">
                                            <span class="information">
                                                <pre>{{movie.information}}</pre>
                                            </span>
                                            <span class="disclaimer">
                                                <pre>{{movie.disclaimer}}</pre>
                                            </span>
                                        </div>
                                        <p>{{movie.synopsis}}</p>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <div class="movie__details">
                                        <h5>Détails</h5>
                                        <ul class="movie__authors">
                                            <li>De |</li>
                                            <li>{{movie.authors.join(' / ')}}</li>
                                        </ul>
                                        <ul class="movie__actors">
                                            <li>Avec |</li>
                                            <li>{{movie.actors.join(' / ')}}</li>
                                        </ul>
                                        <ul class="movie__authors">
                                            <li>Origine |</li>
                                            <li>{{movie.language}}</li>
                                        </ul>
                                        <ul class="movie__authors">
                                            <li>Genre(s) |</li>
                                            <li>{{movie.genres.join(' / ')}}</li>
                                        </ul>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row :gutter="15">
                        <el-col :span="24">
                            <div class="timesheet">
                                <big-title title="Horaires" orientation="center"></big-title>
                                <div v-if="dates.length">
                                    <div class="timesheet__item" v-for="(timesheet,index) in dates" :key="index">
                                        <p class="timesheet__date">{{timesheet.date | capitalize}}</p>
                                        <p class="timesheet__time">{{timesheet.time}}</p>
                                        <p class="timesheet__dubbing">{{timesheet.dubbing}}</p>
                                    </div>
                                </div>
                                <div v-else style="text-align: center">Aucun horaire pour le moment.</div>

                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="15">
                        <div class="gallery" v-if="imageSet.length">
                            <big-title title="Galerie" orientation="center"></big-title>
                            <el-col :span="24">
                                <div class="movie__gallery movie__gallery-first">
                                    <image-loader classname="lazy__set" :imageUrl="imageSet[1]"></image-loader>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <div class="movie__gallery">
                                    <image-loader classname="lazy__set" :imageUrl="imageSet[2]"></image-loader>
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <div class="movie__gallery">
                                    <image-loader classname="lazy__set" :imageUrl="imageSet[0]"></image-loader>
                                </div>
                            </el-col>
                        </div>

                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="related__movies" v-if="related.length">
                                <big-title title="Films similaires" orientation="center"></big-title>
                                <el-row :gutter="20">
                                    <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(movie, index) in related" :key="movie._id">
                                        <movie-card :movie="movie"></movie-card>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

        </el-row>
    </transition>
</template>
<script>
import Service from '../../services/services.js';
import MovieCard from './MovieCard';
import ImageLoader from '../utils/imageLoader/ImageLoader';
import BigTitle from '../utils/BigTitle';
import { mapGetters, mapActions } from 'vuex';
import api from '../../../config/api';
import moment from 'moment';
export default {
    props: ['id'],
    components: {
        'image-loader': ImageLoader,
        'movie-card': MovieCard,
        'big-title': BigTitle
    },
    filters: {
        capitalize: function(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    created() {
        this.getMovieReady(this.id)
    },

    data() {
        return {
            show: true,
            related: [],
            movie: {},
            bgCover: "",
            cover: "",
            imageSet: [],
            volunteers: [],
            dates: [],
            trailerEnabled: false,
            displayTitle: true,
            downWrapper: false,
            trailerOptions: {
                autoplay: 0,        // Auto-play the video on load
                controls: 1,        // Show pause/play buttons in player
                showinfo: 0,        // Hide the video title
                modestbranding: 0,  // Hide the Youtube Logo
                loop: 0,            // Run the video in a loop
                fs: 1,
                rel: 0,             // Hide the full screen button
                cc_load_policy: 0,  // Hide closed captions
                iv_load_policy: 3,  // Hide the Video Annotations
                autohide: 0,
            }
        }
    },
    computed: {
        ...mapGetters(['auth'])
    },
    beforeRouteUpdate(to, from, next) {
        this.getMovieReady(to.params.id)
        next()
    },
    methods: {
        getMovieReady(id) {
            this.show = false

            this.$nextTick(() => {
                const now = moment().unix();
                Service.getMovie(id).then(res => {
                    this.movie = res.data;
                    this.dates = this.movie.dates.filter(date => moment(date.fullDate).unix() >= now).map(({ date, fullDate, time, dubbing }) => {
                        return { 'unix': date, 'date': moment(fullDate).format('dddd DD MMMM'), time, dubbing: dubbing || 'VF' }
                    })
                    this.imageSet = this.movie.imageSet.map(image => `${api.ftpUrl}/${image.id}`)
                    this.bgCover = `${api.ftpUrl}/${this.movie.imageSet[0].id}`;
                    this.cover = `${api.ftpUrl}/${this.movie.cover}`;
                    Service.getRelatedMovies(id, this.movie.genres).then(movies => {
                        this.show = true
                        this.related = movies.data.slice(0, 4)
                    });
                });

            })

        },
        ready(player) {
            this.player = player;
        },
        playTrailer() {
            this.trailerEnabled = true;
            this.player.playVideo();
        },
        animateTitle(state) {
            if (state == 'playing') {
                this.displayTitle = false;
                this.downWrapper = true;
            } else {
                this.displayTitle = true;
                this.downWrapper = false;
                this.trailerEnabled = false;
            }
        }
    }
}
</script>

<style lang="scss">
* {
    font-family: 'inconsolataRegular', monospace;
}
.sub__infos{
    margin: 5px 0 15px;
}
.information {
    font-family: 'inconsolataBold', monospace;
    font-weight: bold;
    display: block;
    opacity: 0.7;
}

.disclaimer {
    font-family: 'inconsolataBold', monospace;
    font-style: italic;
    font-weight: bold;
    display: block;
    font-size: 12px;
    color: #FF4949;
}

.gallery,
.related__movies,
.timesheet {
    margin: 70px 0 50px;
    h3 {
        text-align: center;
        margin-bottom: 50px;
    }
}

.gallery {
    .movie__gallery {
        box-shadow: 10px 9px 19px 0px rgba(66, 66, 66, 0.2);
        border-radius: 5px
    }
}

.related__movies {
    .movie__card {
        box-shadow: 10px 9px 19px 0px rgba(66, 66, 66, 0.2);
    }
}

.timesheet {
    &__item {
        font-size: 28px;
        font-weight: bolder;
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
        @media screen and (max-width: 768px) {
            font-size: 26px;
            text-align: center;
        }
        p {
            display: inline-block;
            text-align: center;
            font-family: 'inconsolataBold', monospace;
            margin: 0;
        }
    }
    &__date {
        @media screen and (min-width: 768px) {
            width: 350px;
        }
    }
    &__time,
    &__dubbing {
        opacity: 0.6
    }
}


.viewTrailer__mobile {
    margin: 10px;
    button {
        width: 100%;
        display: block;
    }

    @media screen and (min-width: 768px) {
        display: none;
    }
}

.edit__button {
    display: block;
    margin-top: -1px;
    button {
        width: 100%;
        border-radius: 0;
    }
}

.movie__details {
    margin-bottom: 30px;
    @media screen and (min-width: 768px) {
        border-left: 1px solid rgba(170, 170, 170, 0.44);
        padding-left: 15px;
        margin: 0;
    }
}

.player__button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.2);
    transition: 0.3s ease-out;
    z-index: 99;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #fff;

    .player__icon {
        color: #fff;
        position: absolute;
        top: 50%;
        font-size: 24px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.movie__trailer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;

    .yt__frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
}

.background__details {
    position: absolute;
    bottom: 8%;
    left: 28%;
    color: #fff;
    z-index: 1;
    h4 {
        color: #fff;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        position: initial;
        color: #333;
        h4 {
            color: #333;
            font-size: 25px;
        }
        p {
            color: #333;
        }
    }
}

.movie {
    &__release {
        margin: 0;
    }
    &__title {
        margin: 0;
        line-height: 1;
    }
    &__duration {
        font-size: 16px;
    }
    &__genre {
        opacity: 0.8;
        font-size: 16px;
    }
    &__options {
        opacity: 0.8;
        font-size: 16px;
    }
    &__authors,
    &__actors {
        padding: 0;
        li {
            display: inline-block;
            margin-right: 5px;
            opacity: 0.6;
            &:first-child {
                font-weight: bold;
                opacity: 0.8;
            }
        }
    }
    &__gallery {
        position: relative;
        overflow: hidden;
        margin-bottom: 15px;

        img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-60%, -50%);
            transition: 0.3s;
        }
        &:hover {
            img {
                transform: translate(-50%, -50%);
            }
        }
    }
}

.wrapper__details {
    padding-top: 15px;
    transform: translateY(-40px);
    background: #fff;
    position: relative;
    z-index: 999;
    transition: 0.3s ease-out;
    &.slide-down {
        transform: translateY(0);
        .cover {
            transform: translateY(0);
        }
    }
    @media screen and (max-width: 768px) {
        transform: translateY(0);
    }
}

.main__desc {
    .cover {
        transform: translateY(-120px);
        transition: 0.3s ease-out;
        @media screen and (max-width: 768px) {
            transform: translateY(0);
        }
        .lazy {
            border-radius: 0;
        }
    }
}

.background__cover {

    @media screen and (min-width: 768px) {
        padding-bottom: 50%;
        overflow: hidden;
        position: relative;
        height: 0;
        cursor: pointer;
    }
    &:hover {
        img {
            transform: translate(-50%, -50%) scale(1.05) !important;
        }
        .player__button {
            transform: translate(-50%, -50%) scale(1);
        }
    }
    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        z-index: 1;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    .lazy__bg {
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
    img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.8;
        transition: 0.3s ease-out;
        @media screen and (max-width: 768px) {
            display: none;
        }
    }
}
</style>