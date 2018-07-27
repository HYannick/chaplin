<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-col :span="24">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <h3>Liste de films</h3>
                    </el-col>
                    <el-col :span="6">
                        <div class="add__link">
                            <router-link v-show="logged && role == 'admin'" to="/movies/add">
                                <el-button class="chap-button">Ajouter un film</el-button>
                            </router-link>
                        </div>
                    </el-col>
                    <!--
                                <el-col :span="6">
                                    <el-autocomplete class="inline-input" v-model="search" :fetch-suggestions="querySearch" placeholder="Please Input" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                                </el-col>
                            -->
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="search__title bordering">
                            <el-form ref="searchTitle" :model="searchTitle" label-width="120px" label-position="top">
                                <el-row :gutter="20">
                                    <el-col :span="24">
                                        <el-form-item>
                                            <el-autocomplete class="autocomplete__search" v-model="searchTitle.title"
                                                             popper-class="movie-autocomplete"
                                                             icon="search"
                                                             placeholder="Rechercher par titre"
                                                             custom-item="movie-item"
                                                             :fetch-suggestions="querySearchAsync"
                                                             @select="searchByTitle"></el-autocomplete>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <!--<div class="search__filters">
                            <el-form ref="filteredRes" :model="filterResults" label-width="120px"
                                     label-position="top">
                                <el-row :gutter="20">
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="Origine">
                                            <el-input v-model="filterResults.language"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                        <el-form-item label="Genre">
                                            <el-select v-model="filterResults.genres" multiple placeholder="Select">
                                                <el-option v-for="item in genres" :key="item.value" :label="item.label"
                                                           :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="6" :lg="6">
                                        <el-form-item label="En salle">
                                            <el-switch on-text="" off-text=""
                                                       v-model="filterResults.diffused"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="12" :sm="12" :md="6" :lg="6">
                                        <el-form-item label="Prochainement">
                                            <el-switch on-text="" off-text=""
                                                       v-model="filterResults.upcoming"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                        <el-form-item>
                                            <el-button type="primary" @click="renderFiltered">Filtrer</el-button>
                                            <el-button>Cancel</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>-->
                    </el-col>
                    <transition-group class="container__grid" name="list" v-on:enter="enter" v-on:leave="leave"
                                      tag="div">
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(movie, index) in searchRes"
                                :key="movie._id">
                            <div class="movie__item">
                                <div class="admin__layer">
                                    <router-link tag="a" class="admin__layer--block" :to="`/movies/${movie._id}/edit`">
                                        <icon name="pencil" label="edit" scale="1.2"></icon>
                                    </router-link>
                                    <button class="admin__layer--block" @click="deleteMovie(movie._id)">
                                        <icon name="trash" label="trash" scale="1.2"></icon>
                                    </button>
                                </div>
                                <movie-card :movie="movie"></movie-card>
                            </div>
                        </el-col>
                    </transition-group>
                </el-row>
            </el-col>
        </div>
    </transition>
</template>

<script>
  import Vue from 'vue';
  import Services from '../../services';
  import MovieCard from './MovieCard';
  import anime from 'animejs';
  import {mapState} from 'vuex';
  import genres from './datas/genres.json';
  import api from '../../../config/api';

  Vue.component('movie-item', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('img', {attrs: {class: 'poster', src: `${api.s3Url}/${item.cover}`}}),
        h('div', {attrs: {class: 'infos'}}, [
          h('div', {attrs: {class: 'title'}}, [item.title]),
          h('p', {attrs: {class: 'desc'}}, ['De | ' + item.authors.join(' - ')]),
          h('p', {attrs: {class: 'desc'}}, ['Avec | ' + item.actors.join(' - ')]),
        ])
      ]);
    },
    props: {
      item: {type: Object, required: true}
    }
  });

  export default {
    components: {
      'movie-card': MovieCard
    },
    data() {
      return {
        movies: [],
        searchRes: [],
        search: '',
        genres,
        searchTitle: {
          title: ''
        },
        filterResults: {
          language: '',
          genres: [],
          diffused: false,
          upcoming: false
        }
      }
    },
    computed: {
      ...mapState(['logged', 'role'])
    },
    created() {
      Services.movies.getMovies().then(movies => {
        this.movies = movies.data
        this.searchRes = movies.data
      });
    },
    methods: {
      querySearchAsync(queryString, cb) {
        const movies = this.movies;
        const results = queryString ? movies.filter(this.createFilter(queryString)) : movies;
        cb(results);
      },
      createFilter(queryString) {
        return (movie) => {
          return (movie.title.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      searchByTitle(item) {
        this.$router.push(`/movies/${item._id}`)
      },
      renderFiltered() {
        if (!this.filterResults.genres.length) {
          this.filterResults.genres = this.genres.map(genre => genre.value)
        }
        Services.movies.getFilteredMovies(this.filterResults).then(result => this.searchRes = result.data.movies);
      },
      enter(el, done) {
        const self = this;
        const proposal = el;
        anime({
          targets: proposal,
          translateX: 0,
          opacity: 1,
          complete: function (anim) {
            done();
          }

        })

      },
      leave(el, done) {
        const proposal = el;
        anime({
          targets: proposal,
          opacity: 0,
          complete: function (anim) {
            done();
          }
        })

      },
      deleteMovie(id) {
        this.$confirm('Etes vous sûr de vouloir supprimer ce film ?')
          .then(_ => {
            Services.movies.removeMovie(id).then(res => {
              this.movies = res.data
              this.searchRes = res.data
              this.$notify({
                title: 'Suppression',
                message: 'Film supprimé !',
                type: 'success'
              });
            })
          })
          .catch(err => {
            this.$notify({
              title: 'Erreur',
              message: 'Une erreur s\'est produite',
              type: 'error'
            });
          });
      },
      querySearch(queryString, cb) {
        const movies = this.movies;
        const results = queryString ? movies.filter(this.createFilter(queryString)) : movies;
        // call callback function to return suggestions
        this.searchRes = this.search !== '' ? movies.filter(this.createFilter(queryString)) : movies;
        const res = results.map(result => {
          result.value = result.title;
          return result;
        });
        cb(res);
      },
      createFilter(queryString) {
        return (movie) => {
          return (movie.title.toLowerCase().includes(queryString.toLowerCase()));
        };
      },

      handleSelect(item) {
        console.log(item)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .search__title {
        padding: 20px;
        margin: 30px 0;
        position: relative;
        &:before {
            content: 'Rechercher un titre';
            position: absolute;
            top: -40px;
            left: 0px;
            font-weight: bold;
            font-size: 30px;
            opacity: 0.2;
        }
    }

    .autocomplete__search {
        width: 100%;
    }

    .movie-autocomplete {

        li {
            display: flex;
            align-items: flex-start;
            padding: 15px;
            width: 100%;

            .poster {
                width: 100px;
            }
            .title {
                margin-bottom: 10px;
            }
            .desc {
                line-height: 15px;
                opacity: 0.8;
                font-size: 12px;
                margin: 0;
            }
            .infos {
                padding: 15px;

            }
        }
    }

    .movie__item {
        position: relative;
        border-radius: 5px;
        margin-bottom: 15px;
        overflow: hidden;
        transition: 0.3s;

        .movie__card {
            margin: 0;

            .caption {
                border-radius: 5px;
            }

        }
        .lazy {
            opacity: 1;
            transition: 0.3s;
        }

        &:hover {
            background: #333;

            .lazy {
                transform: scale(1.1);
                opacity: 0.7;
            }

            .admin__layer {
                bottom: 0;
            }

        }
        .admin__layer {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            bottom: -20%;
            left: 0;
            padding: 10px;
            width: 100%;
            z-index: 99;
            transition: 0.3s ease-out;

            .admin__layer--block {
                color: #fff;
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 5px;
                width: 40px;
                height: 40px;
            }

        }
    }

    .add__link {
        float: right;
        display: block;
    }
</style>
