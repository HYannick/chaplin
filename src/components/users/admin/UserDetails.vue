<template>
    <transition name="el-fade-in-linear">
        <div>
            UserDetails {{user.email}}
            <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" v-for="(sub, index) in subs" :key="sub.date">
                    {{dateInCard(sub.date)}} | <b>{{sub.time}}</b>
                
                    <movie-card :movie="sub.movies[0]"></movie-card>
                </el-col>
            </el-row>
        </div>
    </transition>
</template>

<script>
import Services from '../../../services/services';
import MovieCard from '../../movies/MovieCard';
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
    components: {
        'movie-card' : MovieCard
    },
    computed: {
        ...mapGetters(['auth']),
    },
    methods : {
        dateInCard(date) {
            return moment.unix(date).format('dddd DD MMMM YYYY')
        }
    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
            Services.getUserSubscription(this.user._id).then(subs => {
                this.subs = subs.data;
            })
        });

    },
    data() {
        return {
            user: {},
            subs: []
        }
    }
}
</script>