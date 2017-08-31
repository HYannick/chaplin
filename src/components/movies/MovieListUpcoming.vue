<template>
    <transition name="el-fade-in-linear">
        <el-row>
            <el-col :span="24">
                <div class="diffused__movies">
                    <big-title title="En Salle"></big-title>
                    <movie-timeline :movies="movies" :maxRow="isMax" display="diffusion" @refresh="loadMovies"></movie-timeline>
                </div>
            </el-col>
        </el-row>
    </transition>
</template>

<script>
import Service from '../../services/services.js';
import DiffusedMovies from './MovieSched';
import BigTitle from '../utils/TitlesComponent';
import _ from 'lodash';
export default {
    components: {
        'movie-timeline': DiffusedMovies,
        'big-title': BigTitle
    },
    created() {
        Service.getUpcomingMovies(4).then(res => {
            this.movies = res.data.movieList;
            this.loaded = true;
            if (this.movies.length >= 2) {
                this.isMax = res.data.max;
            }
        });
    },
    data() {
        return {
            movies: [],
            isMax: true
        }
    },
    methods: {
        loadMovies(limit) {
            Service.getUpcomingMovies(limit).then(res => {
                this.movies = res.data.movieList;
                if (this.movies.length >= 2) {
                    this.isMax = res.data.max;
                }

            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.popular__movies {
    margin-top: 20px;
    position: relative;
    h2 {
        text-align: left;
        position: absolute;
        font-family: 'inconsolata', monospace;
        font-weight: bold;
        left: -100px;
        top: -40px;
        z-index: 999;
        opacity: 0.9;
        @media screen and (max-width: 765px) {
            position: initial;
            text-align: center;
        }
    }
}
</style>
