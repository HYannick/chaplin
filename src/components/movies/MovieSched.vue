<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="24">
                <el-row :gutter="20">
                    <div id="timeline" class="timeline" :class="{visible: loaded}">
                        <div class="timeline__left" v-show="display === 'homeSchedule'">
                            <span class="next__diffusion">Prochaine<br>séance</span>
                        </div>
                        <div class="timeline__right" v-show="display !== 'upcoming'">
                            <span class="next__dates">Prochaines<br>dates</span>
                        </div>
                        <el-col class="row__schedule" :span="24" v-for="(movie, index) in movies" :key="movie._id">
                            <div class="row__background">
                                <img :src="transformUrl(movie)"/>
                            </div>
                            <div class="row_content">
                                <div class="side__date" v-show="display === 'homeSchedule'">
                                    <p>
                                        <span class="side__day">{{availabilities(movie, 'side')[0].day}}</span>
                                        <span class="side__month">{{availabilities(movie, 'side')[0].month | capitalize}}</span>
                                    </p>
                                </div>

                                <el-col :xs="24" :sm="24" :md="5" :lg="5">
                                    <div class="timeline__item">
                                        <movie-card :movie="movie"></movie-card>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="10" :lg="10">
                                    <div class="timeline__item">
                                        <h5 class="m-title">{{movie.title}}</h5>
                                        <span class="information">
                                            <pre>{{movie.information}}</pre>
                                        </span>
                                        <span class="disclaimer">
                                            <pre>{{movie.disclaimer}}</pre>
                                        </span>
                                        <br>
                                        <p class="m-desc">{{movie.desc | truncate(240)}}</p>
                                        <router-link :to="`/movies/${movie._id}`" class="goTo" tag="a">En savoir plus
                                        </router-link>
                                    </div>
                                </el-col>
                                <div class="next__schedule" data-title="Toutes les séances"
                                     v-show="display !== 'upcoming'">
                                    <p v-for="(date, index) in availabilities(movie)" :key="index">{{date.day |
                                        capitalize}} <span class="sched__time">{{date.time}}</span></p>
                                </div>
                            </div>

                        </el-col>
                    </div>
                    <div class="foot__view-more" v-show="!maxRow">
                        <button class="view__more" @click="refresh()">
                            <span v-if="!completed">... Chargement ...</span>
                            <span v-else>Voir plus</span>
                        </button>
                    </div>
                </el-row>
            </el-col>
        </div>
    </transition>
</template>

<script>
  import Service from '../../services';
  import MovieCard from './MovieCard';
  import BigTitle from '../utils/BigTitle';
  import ImageLoader from '../utils/imageLoader/ImageLoader'
  import moment from 'moment';
  import api from '../../../config/api';
  import _ from 'lodash';

  export default {
    props: ['maxRow', 'movies', 'display', 'completed'],
    components: {
      'movie-card': MovieCard,
      'image-loader': ImageLoader,
      'big-title': BigTitle
    },
    data() {
      return {
        limit: 4,
        isMax: false,
        loaded: false
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      truncate(text, stop, clamp) {
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
      }
    },

    methods: {
      refresh() {
        this.limit += 2;
        this.$emit('refresh', this.limit);
      },

      transformUrl(movie) {
        return `${api.s3Url}/${movie.imageSet[1]}`
      },
      availabilities(movie, display) {
        const now = moment();
        const {dates} = movie;
        return dates.filter(item => {
          return moment(item.fullDate) >= now;
        }).map(item => {
          if (display === 'side') {
            return {
              day: moment.unix(item.date).format('DD'),
              month: moment.unix(item.date).format('MMM').slice(0, -1),
            }
          } else {
            return {
              day: moment.unix(item.date).format('dddd DD MMMM'),
              time: item.time
            }
          }
        });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @media screen and (max-width: 768px) {
        .timeline__right,
        .timeline__left {
            display: none;
        }
    }

    .foot__view-more {
        position: relative;
        height: 200px;
        z-index: 4;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: start;
        @media screen and (min-width: 768px) {
            width: 115%;
            transform: translateX(-15%);
        }
        button {
            margin-top: 30px;
            position: relative;
            font-size: 18px;
            transition: 0.3s;
            padding: 10px 55px;
            z-index: 1;
            outline: none;
            box-shadow: inset 0 0 0 2px #000;
            &:hover {
                color: #fff;
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
        &:before {
            content: '';
            position: absolute;
            top: -100px;
            left: 0;
            background: #fff;
            width: 100%;
            height: 100px;
            background: -moz-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
            background: -webkit-linear-gradient(top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
            background: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#00ffffff', GradientType=0);
        }
    }

    .row_content {
        position: relative;
        z-index: 2;
        width: 100%;
        display: table;
    }

    .timeline__item {
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
        .m-title {
            font-family: 'inconsolataBold', monospace;
            font-weight: bold;
            font-size: 30px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
        .m-date {
            opacity: 0.5;
            font-family: 'inconsolataBold', monospace;
            font-weight: bold;
        }
    }

    .row__schedule {
        position: relative;
        @media screen and (max-width: 768px) {
            margin-bottom: 20px;
        }
        &:hover {
            .row__background {
                opacity: 0.2;
                transform: translateY(-50%) scale(1.1);
            }
            .next__schedule {
                box-shadow: inset 0 0 0 2px #000;
                &:before {
                    opacity: 1;
                    top: -42px;
                }
            }
        }
        .row__background {
            position: absolute;
            top: 50%;
            left: 0;
            width: 90%;
            transform: translateY(-50%) scale(1.09);
            opacity: 0;
            z-index: -1;
            transition: 0.3s ease-in-out;
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 9;
                box-shadow: inset 0px 0px 50px 50px #fff;
            }
        }
        img {
            width: 100%;
            position: relative;
            transform: scale(0.95);
        }
    }

    .timeline__item {
        .movie__card {
            box-shadow: 10px 9px 19px 0px rgba(66, 66, 66, 0.2);
        }
    }

    .timeline__head {
        overflow: hidden;
        position: relative;
        height: 50px;
        display: flex;
        align-items: center;
    }

    .goTo {
        &:before {
            background: rgba(51, 51, 51, 0.30);
        }
    }

    .next__schedule {
        background: #fff;
        padding: 70px 10px 20px;
        text-align: left;
        font-weight: bold;
        font-size: 16px;
        font-family: 'inconsolataBold', monospace;
        width: 100%;
        transition: 0.3s;
        display: table;
        box-shadow: inset 0 0 0 2px #000;
        position: relative;
        @media screen and (min-width: 770px) {
            position: absolute;
            z-index: 10;
            right: 0;
            top: 40%;
            box-shadow: none;
            transform: translateY(-50%);
            max-width: 220px;
            padding: 20px 10px;
        }

        &:before {
            content: attr(data-title);
            font-family: 'inconsolataBold', monospace;
            font-size: 18px;
            font-weight: bolder;
            text-align: center;
            position: absolute;
            width: 100%;
            left: 50%;
            display: block;
            z-index: 0;
            padding: 5px;
            transform: translateX(-50%) scale(1, 1.4);
            top: -50px;
            opacity: 0;
            background: #000;
            color: #fff;
            transition: 0.3s;
            @media screen and (max-width: 768px) {
                opacity: 1;
                top: 8px;
            }
        }
        p {
            font-size: 14px;
            margin: 0;
            display: block;
            transform: scale(1, 1.4);
            position: relative;
            span {
                position: absolute;
                right: 0;
                opacity: 0.7;
            }
        }
    }

    .timeline {
        position: relative;
        display: table;
        width: 100%;
        padding-top: 50px;
        .next__dates,
        .next__diffusion {
            text-align: center;
            font-size: 20px;
            line-height: 1;
            font-weight: bold;
            font-family: 'inconsolataBold', monospace;
            opacity: 0.5;
            position: absolute;
            top: -50px;
        }

        .next__dates {
            left: 50%;
            transform: translateX(-50%)
        }

        .next__diffusion {
            left: 50%;
            transform: translateX(-50%)
        }

        &__left {
            position: absolute;
            width: 2px;
            height: 100%;
            top: 50px;
            left: -50px;
            background: #000;
        }

        &__right {
            position: absolute;
            width: 2px;
            height: 100%;
            top: 50px;
            right: 120px;
            background: #000;
        }
    }

    .side__date {
        text-align: center;
        border-radius: 5px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        left: -100px;
        @media screen and (max-width: 768px) {
            display: none;
        }
        &:before {
            content: '';
            position: absolute;
            top: 0;
            width: 5px;
            height: 100%;
            left: 50%;
            background: #fff;
            transform: translateX(-50%);
        }
        p {
            line-height: 1.3;
            font-weight: bolder;
        }

        .side__day {
            font-family: 'inconsolataBold', sans-serif;
            font-size: 80px;
            transform: scale(1, 1.6);
            display: block;
        }

        .side__month {
            font-family: 'inconsolataBold', sans-serif;
            position: relative;
            font-size: 40px;
        }
    }
</style>
