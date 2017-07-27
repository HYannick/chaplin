<template>
    <transition name="el-fade-in-linear">
        <el-table :data="tableData" style="width: 100%" border :default-sort="{prop: 'date', order: 'ascending'}">
            <el-table-column type="expand">
                <template scope="props">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <image-loader classname="lazy" :imageUrl="`${imgUrl}/${props.row.cover}`"></image-loader>
                        </el-col>
                        <el-col :span="12">
                            <p>Date: {{ dateInCard(props.row.date) }}</p>
                            <p>Titre: {{ props.row.title }}</p>
                            <p>Synopsis: {{ props.row.desc }}</p>
                            <router-link :to="`/movies/${props.row.id}`">
                                <el-button>Voir fiche</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="Séance" width="150" sortable :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="time" label="Horaire" width="120" sortable>
            </el-table-column>
            <el-table-column prop="title" label="Film" width="200">
            </el-table-column>
            <el-table-column v-show="auth.logged" prop="volunteer" label="Adhérent">
            </el-table-column>
            <el-table-column v-show="auth.logged" fixed="right" label="S'inscrire" width="120">
                <template scope="scope">
                    <el-button @click="handleClick(scope.$index, tableData)" size="small">S'inscrire</el-button>
                </template>
            </el-table-column>
        </el-table>
    </transition>
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
    props: ['userLogged'],
    created() {
        const now = moment().unix();
        Services.getMovies(this.auth.userId, this.auth.token).then(res => {
            this.movies = res.data;

            const mapped = this.movies.filter(movie => {
                return movie.diffused;
            }).map(movie => {
                return movie.dates
            });

            this.tableData = [].concat(...mapped).filter(item => {
                return item.date > now;
            }).map(item => {
                const date = moment(item.fullDate).unix();
                const { time } = item;
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
        dateInCard(date) {
            return moment.unix(date).format('dddd DD MMMM YYYY')
        },
        formatDate(row, column) {
            return moment.unix(row.date).format('ddd DD MMM YYYY');
        },
        handleClick(index, rows) {
            const data = {
                userId: this.userLogged,
                date: rows[index].date,
                time: rows[index].time,
                movieId: rows[index].id
            }
            console.log(data)
        },
    },
    data() {
        return {
            imgUrl: api.ftpUrl,
            user: {},
            movies: [],
            tableData: []
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
