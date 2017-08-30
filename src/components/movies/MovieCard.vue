<template>
    <div class="movie__card">
        <router-link :to="`/movies/${movie._id}`" class="caption" tag="a">
            <image-loader classname="lazy" :imageUrl="cover"></image-loader>
        </router-link>
    </div>
</template>
<script>
import moment from 'moment';
import api from '../../../config/api';
import ImageLoader from '../utils/imageLoader/ImageLoader';
export default {
    props: ['movie'],
    components: {
        'image-loader': ImageLoader
    },

    computed: {
        availabilities() {
            const now = moment();
            const { dates } = this.movie;
            return dates.filter(item => {
                return moment(item.fullDate) >= now;
            }).map(item => {
                return moment.unix(item.date).format('dddd DD MMM YYYY');
            });
        }
    },

    data() {
        return {
            cover: `${api.ftpUrl}/${this.movie.cover}`,
            loadedImage: false
        }
    }
}
</script>
<style lang="scss">
.movie__card {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    border-radius: 5px;
    &:hover {
        .caption {
            .image {
                transform: translate(-50%, -50%) scale(1.2);
                opacity: 0.8;
                border-radius: 5px;
            }
        }
    }
    .caption {
        overflow: hidden;
        position: relative;
        display: block;
    }
}
</style>