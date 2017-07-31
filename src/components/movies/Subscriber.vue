<template>
    <div>
        <p>{{subscriber}}</p>
    </div>
</template>
<script>
import Services from '../../services/services';
import { mapGetters } from 'vuex';
export default {
    props: ['row', 'userId', 'movieId'],


    computed: {
        ...mapGetters(['auth']),
    },
    created() {
        const { id, date, time } = this.row;
        Services.getMovieSubscriptions(id).then(res => {
            var filt = res.data.filter(item => {
                return item.date === date.toString();
            })
            this.subscriber = filt[0].enrolled[0].email || '';

        }).catch(err => {
            console.log(err)
        })

    },
    methods: {
      
    },
    data() {
        return {
            subscriber: '',
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
