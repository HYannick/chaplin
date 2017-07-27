<template>
    <div>
        <h2>Profil | {{user.username}}</h2>
        <router-link :to="`/users/${auth.userId}/detail`">Profil</router-link>
        <router-link :to="`/users/${auth.userId}/perms`">Permanences</router-link>
        <router-link :to="`/users/${auth.userId}/propal`">Propositions</router-link>
        <router-link :to="`/users/${auth.userId}/chat`">Chat</router-link>
        <router-view></router-view>
       
    </div>
</template>
<script>
import Services from '../../services/services';
import moment from 'moment';
import api from '../../../config/api';
import ImageLoader from '../utils/imageLoader/ImageLoader';
import MovieTable from '../movies/MovieTable';
import { mapGetters } from 'vuex';
import Month from '../utils/datepicker/modules/month';
export default {
    components: {
        'image-loader': ImageLoader,
        'movie-table': MovieTable
    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
        });

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
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    data() {
        return {
            imgUrl: api.ftpUrl,
            user: {},
        }
    }
}
</script>
<style lang="scss" >

</style>
