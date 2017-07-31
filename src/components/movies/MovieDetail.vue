<template>
    <transition name="el-fade-in-linear">
        <el-row>
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
            <el-row :gutter="15">
                <el-col :span="22" :offset="1" class="wrapper__details" :class="{'slide-down': downWrapper}">
                    <el-row :gutter="15">
                        <el-col :span="24">
                            <div class="main__desc">
                                <el-col :span="6">
                                    <div class="cover">
                                        <image-loader classname="lazy" :imageUrl="cover"></image-loader>
                                         <router-link class="edit__button" v-show="auth.logged && auth.role == 'admin'" :to="`/movies/${movie._id}/edit`">
                                            <el-button type="primary">Edit</el-button>
                                        </router-link>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="short__desc">
                                        <h5>Synopsis</h5>
                                        <p>{{movie.desc}}</p>
                                       
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="movie__details">
                                        <h5>Détails</h5>
                                        <ul class="movie__actors">
                                            <li>Acteurs |</li>
                                            <li v-for="(actor, index) in movie.actors" :key="index">{{actor}}</li>
                                        </ul>
    
                                        <ul class="movie__authors">
                                            <li>Auteurs |</li>
                                            <li v-for="(author, index) in movie.authors" :key="index">{{author}}</li>
                                        </ul>
                                        <ul class="movie__authors">
                                            <li>Origine |</li>
                                            <li>{{movie.language}}</li>
                                        </ul>
                                        <ul class="movie__authors">
                                            <li>Langue |</li>
                                            <li v-for="(check,index) in movie.checkList" :key="index">{{check}}</li>
                                        </ul>
                                    </div>
                                </el-col>
                            </div>
                        </el-col>
                    </el-row>
    
                    <el-table :data="dates" style="width: 100%">
                        <el-table-column prop="date" label="Date">
                        </el-table-column>
                        <el-table-column prop="time" label="Time">
                        </el-table-column>
                    </el-table>
                    <el-row :gutter="15">
                        <el-col :span="24">
                            <div class="movie__gallery movie__gallery-first">
                                <image-loader classname="lazy__set" :imageUrl="imageSet[1]"></image-loader>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="movie__gallery">
                                <image-loader classname="lazy__set" :imageUrl="imageSet[2]"></image-loader>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="movie__gallery">
                                <image-loader classname="lazy__set" :imageUrl="imageSet[0]"></image-loader>
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
import ImageLoader from '../utils/imageLoader/ImageLoader';
import { mapGetters, mapActions } from 'vuex';
import api from '../../../config/api';
import moment from 'moment';
export default {
    props: ['id'],
    components: {
        'image-loader': ImageLoader
    },
    created() {
        Service.getMovie(this.id).then(res => {
            this.movie = res.data;
            console.log(this.movie)
            this.dates = res.data.dates.map(({ fullDate, time }) => {
                return { 'date': moment(fullDate).format('dddd DD MMM YYYY'), time }
            })
            this.imageSet = this.movie.imageSet.map(image => `${api.rootUrl}/uploads/${image}`)
            this.bgCover = `${api.ftpUrl}/${res.data.imageSet[0]}`;
            this.cover = `${api.ftpUrl}/${res.data.cover}`;

        });
    },

    beforeUpdate() {
        let data = {
            userId: this.auth.userId,
            movieId: this.movie._id
        }
    },

    data() {
        return {
            movie: {},
            bgCover: "",
            cover: "",
            imageSet: [],
            volunteers : [],
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
    methods: {
        ...mapActions(['checkSubscription']),
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
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}
.edit__button{
    display: block;
    margin-top: -1px;
    button{
        width: 100%;
        border-radius: 0;
    }
}
.movie__details {
    border-left: 1px solid rgba(170, 170, 170, 0.44);
    padding-left: 15px;
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
    z-index: 1;
    transition: 0.3s ease-out;
    &.slide-down {
        transform: translateY(0);
        .cover {
            transform: translateY(0);
        }
    }
}

.main__desc {
    .cover {
        transform: translateY(-120px);
        transition: 0.3s ease-out;
    }
}

.background__cover {
    padding-bottom: 50%;
    overflow: hidden;
    position: relative;
    height: 0;
    cursor: pointer;
    &:hover {
        img {
            transform: translate(-50%, -50%) scale(1.3) !important;
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
    }
    img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.8;
        transition: 0.3s ease-out;
    }
}
</style>