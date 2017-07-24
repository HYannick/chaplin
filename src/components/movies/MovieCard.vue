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
console.log(api.rootUrl)
export default {
    props: ['movie'],
    components: {
        'image-loader': ImageLoader
    },
      
    computed: {
        availabilities() {
            const now = moment();
            const { dates } = this.movie;
            return dates.filter(date => {
                return moment.unix(date) > now;
            }).map(date => {
                return moment.unix(date).format('dddd DD MMM YYYY');
            });
        }
    },

    data() {
        return {
            cover: `${api.rootUrl}/uploads/${this.movie.cover}`,
            loadedImage: false
        }
    }
}
</script>
<style lang="scss" scoped>
.lazy {
    position: relative;
    overflow: hidden;
    padding-bottom: 150%;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%);
        transition: 0.5s ease-in-out;
        opacity: 0;
    }
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: #eef1f6;
        z-index: 99;
        width: 100%;
        height: 100%;
        transition: 0.5s ease-in-out;
    }

    &.loaded {
        img {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
        &:before {
            left: 100%;
            opacity: 1;
        }
    }
}

.infos {
    &__title {
        font-weight: bold;
        margin-bottom: 5px;
        span {
            font-size: 14px;
            font-weight: lighter;
        }
    }
    &__genres {
        padding: 0;
        width: 100%;
        display: table;
        li {
            display: block;
            float: left;
            padding: 5px;
            font-size: 12px;
            background: #333;
            color: #fff;
            margin-right: 10px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    &__dates {
        padding: 0;
        margin-top: 5px;
        padding-bottom: 5px;
        li {
            display: block;
            padding: 5px;
            font-size: 12px;
            &:nth-child(even) {
                background: #333;
                color: #fff;
            }
        }
    }
}

.movie__card {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    &:hover {
        .caption {
            img {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 0.8;
            }
        }

        .infos {
            bottom: 0;
            opacity: 1;
            transform: translateY(0);
        }
    }
    .caption {
        overflow: hidden;
        border-radius: 5px;

        position: relative;
        display: block;
    }

    .infos {
        position: absolute;
        bottom: -100px;
        left: 0;
        width: 100%;
        padding: 10px 10px;
        background: rgba(255, 255, 255, 0.95);
        margin: 0;
        transition: 0.3s;
        opacity: 0;
        transform: translateY(10px);
        p {
            margin: 0;
        }
    }
}
</style>