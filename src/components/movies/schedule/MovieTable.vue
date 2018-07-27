<template>
    <transition name="el-fade-in-linear">
        <div>
            <min-loader :toHide="loaded"></min-loader>
            <div class="table__wrapper" :class="{visible : loaded}">
                <el-table :data="tableData" style="width: 100%" border
                          :default-sort="{prop: 'date', order: 'ascending'}">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <image-loader classname="lazy"
                                                  :imageUrl="`${imgUrl}/${props.row.cover}`"></image-loader>
                                </el-col>
                                <el-col :span="12">
                                    <p>Date: {{ dateInCard(props.row.date) }}</p>
                                    <h5>{{ props.row.title }}</h5>
                                    <p>Synopsis: {{ props.row.desc }}</p>
                                    <router-link :to="`/movies/${props.row.id}`">
                                        <el-button class="chap-button">Voir fiche</el-button>
                                    </router-link>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" label="Séance" :width="170" :formatter="formatDate">
                    </el-table-column>
                    <el-table-column prop="time" label="Horaire" :width="90">
                    </el-table-column>
                    <el-table-column prop="title" label="Film">
                    </el-table-column>
                    <el-table-column v-if="logged" prop="volunteer" label="Bénévole" :width="100">
                    </el-table-column>
                    <el-table-column v-if="logged" label="" :width="80">
                        <template scope="props">
                            <subscribe-button :row="props.row" :userId="userLogged"
                                              @change="refreshTable"></subscribe-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

    </transition>
</template>
<script>
  import Services from '../../../services';
  import MinLoader from '../../utils/icons/MinLoader';
  import moment from 'moment';
  import api from '../../../../config/api';
  import ImageLoader from '../../utils/imageLoader/ImageLoader';
  import {mapState} from 'vuex';
  import _ from 'lodash';
  import Month from '../../utils/datepicker/modules/month';
  import SubscribeBtn from './SubscribeBtn';

  export default {
    components: {
      'image-loader': ImageLoader,
      'subscribe-button': SubscribeBtn,
      'min-loader': MinLoader
    },
    props: ['userLogged'],

    created() {
      this.refreshTable();
    },

    computed: {
      ...mapState(['userId', 'logged', 'token']),
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
        Services.movies.getMovies(this.userId, this.token).then(res => {
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
            const {time} = item;
            const {dubbing} = item
            const data = this.movies.filter(movie => {
              return movie.dates.indexOf(item) !== -1;
            }).map(({title, _id, cover, desc, volunteers}) => {
              return {
                title,
                _id,
                cover,
                desc,
                volunteers
              }

            });
            const vol = data[0].volunteers.filter(volunteer => {
              return volunteer.date === date.toString() && volunteer.time === time
            })


            return {
              date,
              time,
              dubbing,
              title: data[0].title,
              id: data[0]._id,
              cover: data[0].cover,
              desc: data[0].desc,
              volunteer: (vol.length === 0) ? '' : vol[0].enrolled[0].username
            };
          });
          this.loaded = true;
        })
      }
    },
    data() {
      return {
        imgUrl: api.ftpUrl,
        user: {},
        movies: [],
        tableData: [],
        loaded: false
      }
    }
  }
</script>
<style lang="scss" scoped>
    .table__wrapper {
        transition: all 0.3s ease-in;
        opacity: 0;
        &.visible {
            opacity: 1
        }
    }
</style>
