<template>
    <transition name="el-fade-in-linear">
        <div>
            <movie-table :userLogged="user"></movie-table>
        </div>
    </transition>
</template>
<script>
import MovieTable from '../../movies/schedule/MovieTable';
export default {
    components: {
        'movie-table': MovieTable
    },
    data() {
        return {
            user: this.$route.params.id
        }
    }
}
</script>