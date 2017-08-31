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
                            <h5>{{ props.row.title }}</h5>
                            <p>Synopsis: {{ props.row.desc }}</p>
                            <router-link :to="`/movies/${props.row.id}`">
                                <el-button>Voir fiche</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="Séance" :width="160" :formatter="formatDate">
            </el-table-column>
            <el-table-column prop="time" label="Horaire" :width="100">
            </el-table-column>
            <el-table-column prop="title" label="Film">
            </el-table-column>
            <el-table-column v-if="auth.logged" prop="volunteer" label="Adhérent" :width="140">
            </el-table-column>
            <el-table-column v-if="auth.logged" label="" :width="140">
                <template scope="props">
                    <subscribe-button :row="props.row" :userId="userLogged" @change="refreshTable"></subscribe-button>
                </template>
            </el-table-column>
        </el-table>
    </transition>
</template>
<script>
import Services from '../../../services/services';
import moment from 'moment';
import api from '../../../../config/api';
import ImageLoader from '../../utils/imageLoader/ImageLoader';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import Month from '../../utils/datepicker/modules/month';
import SubscribeBtn from './SubscribeBtn';
export default {
    components: {
        'image-loader': ImageLoader,
        'subscribe-button': SubscribeBtn,
    },
    props: ['userLogged'],
    
    created() {
        this.refreshTable();
    },

    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        dateInCard(date) {
            return moment.unix(date).format('dddd DD MMMM YYYY')
        },
        formatDate(row, column) {
            return moment.unix(row.date).format('dddd DD MMM');
        },
        refreshTable() {
             const now = moment().unix();
            Services.getMovies(this.auth.userId, this.auth.token).then(res => {
                this.movies = res.data;

                const mapped = this.movies.filter(movie => {
                    return movie.diffused;
                }).map(movie => {
                    return movie.dates
                });

                this.tableData = [].concat(...mapped).filter(item => {
                    return moment(item.fullDate).unix() >= now;
                }).map(item => {
                    const date = moment(item.fullDate).unix();
                    const { time } = item;
                    const data = this.movies.filter(movie => {
                        return movie.dates.indexOf(item) !== -1;
                    }).map(({ title, _id, cover, desc, volunteers }) => {
                        return {
                            title,
                            _id,
                            cover,
                            desc,
                            volunteers
                        }

                    });
                    const vol = data[0].volunteers.filter(volunteer => {
                        return volunteer.date == date && volunteer.time == time
                    })


                    return {
                        date,
                        time,
                        title: data[0].title,
                        id: data[0]._id,
                        cover: data[0].cover,
                        desc: data[0].desc,
                        volunteer: (vol.length === 0) ? '' : vol[0].enrolled[0].username
                    };
                });
                console.log(this.tableData)
            })
        }
    },
    data() {
        return {
            imgUrl: api.ftpUrl,
            user: {},
            movies: [],
            tableData: [],
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
