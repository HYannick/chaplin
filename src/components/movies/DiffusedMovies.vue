<template>
    <transition name="el-fade-in-linear">
        <el-row>
            <el-col :span="24">
                <div class="diffused__movies " :class="{visible : loaded}">
                    <big-title title="En salle" orientation="bottom"></big-title>
                    <diffused-movies :movies="movies" :maxRow="isMax" display="diffusedList" @refresh="loadMovies"
                                     :completed="complete"></diffused-movies>
                </div>
            </el-col>
        </el-row>
    </transition>
</template>

<script>
  import Services from '../../services';
  import DiffusedMovies from './MovieSched';
  import MinLoader from '../utils/icons/MinLoader';
  import BigTitle from '../utils/BigTitle';

  export default {
    components: {
      'diffused-movies': DiffusedMovies,
      'big-title': BigTitle,
      'min-loader': MinLoader
    },
    created() {
      Services.movies.getDiffusedMovies(4).then(res => {
        this.movies = res.data.movieList
        this.loaded = true;
      });
    },
    data() {
      return {
        movies: [],
        isMax: false,
        loaded: false,
        complete: true,
      }
    },
    methods: {
      loadMovies(limit) {
        this.loaded = false;
        this.complete = false;
        Services.movies.getDiffusedMovies(limit).then(res => {
          this.movies = res.data.movieList;
          if (this.movies.length >= 2) {
            this.isMax = res.data.max;
          }
          this.loaded = true;
          this.complete = true;

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

    .diffused__movies {
        transition: all 0.3s ease-in;
        opacity: 0;
        &.visible {
            opacity: 1
        }
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
