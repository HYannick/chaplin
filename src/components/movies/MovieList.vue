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
                            <router-link v-show="auth.logged && auth.role == 'admin'" to="/movies/add">
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
                <el-row :gutter="20">
                    <transition-group class="container__grid" name="list" v-on:enter="enter" v-on:leave="leave" tag="div">
                        <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="(movie, index) in searchRes   " :key="movie._id">
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
import Service from '../../services/services.js';
import MovieCard from './MovieCard';
import anime from 'animejs';
import { mapGetters } from 'vuex';
export default {
    components: {
        'movie-card': MovieCard
    },
    data() {
        return {
            movies: [],
            searchRes: [],
            search: ''
        }
    },
    computed: {
        ...mapGetters(['auth'])
    },
    created() {
        Service.getMovies().then(movies => {
            this.movies = movies.data
            this.searchRes = movies.data
        });
    },
    methods: {
        enter(el, done) {
            const self = this;
            const proposal = el;
            anime({
                targets: proposal,
                translateX: 0,
                opacity: 1,
                complete: function(anim) {
                    done();
                }

            })

        },
        leave(el, done) {
            const proposal = el;
            anime({
                targets: proposal,
                opacity: 0,
                complete: function(anim) {
                    done();
                }
            })

        },
        deleteMovie(id) {
            this.$confirm('Etes vous sûr de vouloir supprimer ce film ?')
                .then(_ => {
                    Service.removeMovie(id).then(res => {
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
            var movies = this.movies;
            var results = queryString ? movies.filter(this.createFilter(queryString)) : movies;
            // call callback function to return suggestions
            this.searchRes = this.search !== '' ? movies.filter(this.createFilter(queryString)) : movies;
            var res = results.map(result => {
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
.movie__item {
    position: relative;
    border-radius: 5px;
    margin-bottom: 15px;
    overflow: hidden;
    transition:0.3s;
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
            bottom: 0px;
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
