<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="24">
                <el-row :gutter="20">
                    <div class="timeline">
                        <div class="timeline__left">
                            <span class="next__diffusion">Prochaine<br>Séance</span>
                        </div>
                        <div class="timeline__right">
                            <span class="next__dates">Prochaines<br>Dates</span>
                        </div>
                        <el-col class="row__schedule" :xs="24" :sm="24" :md="24" :lg="24" v-for="(movie, index) in movies" :key="movie._id">
                            <div class="row__background">
                                <img :src="transformUrl(movie)" />
                            </div>
                            <div class="row_content">
                                <div class="side__date">
                                    <p>
                                        <span class="side__day">{{availabilities(movie, 'side')[0].day}}</span>
                                        <span class="side__month">{{availabilities(movie, 'side')[0].month | capitalize}}</span>
                                    </p>
                                </div>

                                <el-col :span="5">
                                    <div class="timeline__item">
                                        <movie-card :movie="movie"></movie-card>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <div class="timeline__item">
                                        <h5 class="m-title">{{movie.title}}</h5>
                                        <p class="m-date">{{availabilities(movie)[0]}}</p>
                                        <p class="m-desc"> {{movie.desc}}</p>
                                        <router-link :to="`/movies/${movie._id}`" class="goTo" tag="a">En savoir plus</router-link>
                                    </div>
                                </el-col>
                                <div class="next__schedule">
                                    <p v-for="(date, index) in availabilities(movie)" :key="index">{{date}}</p>
                                </div>
                            </div>

                        </el-col>
                    </div>

                </el-row>
            </el-col>
        </div>
    </transition>
</template>

<script>
import Service from '../../services/services.js';
import MovieCard from './MovieCard';
import BigTitle from '../utils/TitlesComponent';
import ImageLoader from '../utils/imageLoader/ImageLoader'
import moment from 'moment';
import api from '../../../config/api';
export default {
    components: {
        'movie-card': MovieCard,
        'image-loader': ImageLoader,
        'big-title': BigTitle
    },
    data() {
        return {
            movies: [],
        }
    },
    created() {
        Service.getMovies().then(res => {
             const now = moment().unix()
                this.movies = res.data;
                const mapped = this.movies.filter(movie => {
                    return movie.diffused;
                }).map(movie => {
                    return movie.dates
                });

                this.movies = [].concat(...mapped).filter(item => {
                    return moment(item.fullDate).unix() >= now;
                }).map(item => {
                    const date = moment(item.fullDate).unix();
                    const { time } = item;
                    const data = this.movies.filter(movie => {
                        return movie.dates.indexOf(item) !== -1;
                    }).map(({ title, _id, cover, desc, imageSet, dates }) => {
                        return {
                            title,
                            _id,
                            cover,
                            imageSet,
                            desc,
                            dates
                        }

                    });
                    return {
                        dates : data[0].dates,
                        time,
                        imageSet : data[0].imageSet,
                        title: data[0].title,
                        id: data[0]._id,
                        cover: data[0].cover,
                        desc: data[0].desc
                    };
                });
        
            })
     
    },
    filters: {
        capitalize: function(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },

    methods: {
        transformUrl(movie) {
            return `${api.ftpUrl}/${movie.imageSet[1]}`
        },
        availabilities(movie, display) {
            const now = moment();
            const { dates } = movie;
            var sorted = dates.filter(item => {
                return moment(item.fullDate) >= now;
            }).map(item => {
                if (display === 'side') {
                    return {
                        day: moment.unix(item.date).format('DD'),
                        month: moment.unix(item.date).format('MMM').slice(0, -1)
                    }
                } else {
                    return moment.unix(item.date).format('dddd DD MMMM')
                }
            });


            if (display !== 'side') {
                return sorted.slice(1)
            } else {
                return sorted
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.row_content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: table;
}
.timeline__item {
    .m-title{
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
    &:hover {
        .row__background {
            opacity: 0.2;
            transform: translateY(-50%) scale(1.1);
        }
    }
    .row__background {
        position: absolute;
        top: 50%;
        left: 0;
        width: 90%;
        transform: translateY(-50%) scale(1.09);
        opacity: 0;
        z-index: 1;
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
    position: absolute;
    right: 20px;
    top: 40%;
    padding: 20px 10px;
    transform: translateY(-50%);
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    font-family: 'inconsolataBold', monospace;
    max-width: 190px;
    width: 100%;
    p {
        margin: 0;
        display: block;
        transform: scale(1, 1.4);
    }
}

.timeline {
    position: relative;
    display: table;
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
    background: #fff;
    position: relative;
    transform: translateY(40%);
    position: absolute;
    left: -100px;
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
        font-size: 40px;
    }
}
</style>
