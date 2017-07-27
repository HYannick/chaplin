<template>
    <div>
        UserDetail {{user.email}}
        <div v-for="movie in movies" :key="movie._id">
            {{movie.title}} {{movie.dates}}
        </div>
        <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'ascending'}">
            <el-table-column type="expand">
                <template scope="props">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <image-loader classname="lazy" :imageUrl="`${imgUrl}/${props.row.cover}`"></image-loader>
                        </el-col>
                        <el-col :span="12">
                            <p>Date: {{ props.row.date }}</p>
                            <p>Titre: {{ props.row.title }}</p>
                            <p>Synopsis: {{ props.row.desc }}</p>
                            <router-link :to="`/movies/${props.row.id}`">
                                <el-button>Voir fiche</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="Date" width="180" sortable>
            </el-table-column>
            <el-table-column prop="time" label="Hour" width="180" sortable>
            </el-table-column>
            <el-table-column prop="title" label="Titre" width="200">
            </el-table-column>
            <el-table-column prop="volunteer" label="Bénévoles">
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="120">
                <template scope="scope">
                    <el-button @click="handleClick(scope.$index, tableData)" size="small">Subscribe</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import Services from '../../services/services';
import moment from 'moment';
import api from '../../../config/api';
import ImageLoader from '../utils/imageLoader/ImageLoader';
import { mapGetters } from 'vuex';
import Month from '../utils/datepicker/modules/month';
export default {
    components: {
        'image-loader': ImageLoader
    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
        });


        const now = moment();
        const month = new Month(now.month(), now.year());
        this.month = month;
        this.days = this.getDaysFormat();
        Services.getMovies(this.auth.userId, this.auth.token).then(res => {
            this.movies = res.data;
            console.log(this.movies)
            const mapped = this.movies.filter(movie => {
                return movie.diffused
            }).map(movie => {
                return movie.dates
            })
            this.tableData = [].concat(...mapped).map(item => {
                const date = moment(item.fullDate).format('DD-MM-YYYY');
                const {time} = item;
                const data = this.movies.filter(movie => {
                    return movie.dates.indexOf(item) !== -1;
                }).map(({ title, _id, cover, desc }) => {
                    return {
                        title,
                        _id,
                        cover,
                        desc
                    }

                });

                return {
                    date,
                    time,
                    title: data[0].title,
                    id: data[0]._id,
                    cover: data[0].cover,
                    desc: data[0].desc
                };
            });

        })

    },
    beforeUpdate() {
        if (!this.auth.logged) {
            this.$router.push('/signin');
        }
    },
    computed: {
        ...mapGetters(['auth']),

    },
    methods: {
        handleClick(index, rows) {
            const data = {
                userId: this.auth.userId,
                date: rows[index].date,
                movieId: rows[index].id
            }
            console.log(data)
        },
        getDaysFormat() {
            const days = this.month.getDays();
            const formatted = days.map(day => {
                return day.unix();
            })
            return formatted;
        }
    },
    data() {
        return {
            imgUrl: api.ftpUrl,
            user: {},
            movies: [],
            days: [],
            month: null,
            tableData: []
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
