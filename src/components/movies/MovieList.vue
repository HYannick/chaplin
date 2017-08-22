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
                                <el-button>Add a movie</el-button>
                            </router-link>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-autocomplete class="inline-input" v-model="search" :fetch-suggestions="querySearch" placeholder="Please Input" :trigger-on-focus="false" @select="handleSelect"></el-autocomplete>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="12" :sm="12" :md="8" :lg="8" v-for="(movie, index) in searchRes   " :key="movie._id">
                        <movie-card :movie="movie"></movie-card>
                    </el-col>
                </el-row>
            </el-col>
        </div>
    </transition>
</template>

<script>
import Service from '../../services/services.js';
import MovieCard from './MovieCard';
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
<style scoped lang="scss">
h1,
h2 {
    font-weight: normal;
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

.add__link {
    float: right;
    display: block;
}
</style>
