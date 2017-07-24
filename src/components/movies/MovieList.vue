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
    
                </el-row>
                <el-row :gutter="20">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="(movie, index) in movies   " :key="movie._id">
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
    created() {
        Service.getMovies().then(movies => this.movies = movies.data);
    },
    computed: {
        ...mapGetters(['auth'])
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
