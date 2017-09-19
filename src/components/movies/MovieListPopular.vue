<template>
    <transition name="el-fade-in-linear">
        <el-row>
            <el-col :span="24">
                <div class="popular__movies">
                    <el-row :gutter="10">
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(movie, index) in movies" :key="movie._id">
                            <movie-card :movie="movie"></movie-card>
                        </el-col>
                    </el-row>
                </div>
            </el-col>

        </el-row>
    </transition>
</template>

<script>
import Service from '../../services/services.js';
import MovieCard from './MovieCard';
import _ from 'lodash';
export default {
    props: ['limit'],
    components: {
        'movie-card': MovieCard
    },
    created() {
        Service.getDiffusedMovies(this.limit).then(res => {
            this.movies = _.shuffle(res.data.movieList)
        });
    },
    data() {
        return {
            movies: []
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
