<template>
    <div>
        <el-button v-if="!isSub" @click="handleClick(row)" size="small">S'inscrire</el-button>
        <el-button v-if="isSub" @click="handleClick(row)" size="small">Se désinscrire</el-button>
    
    </div>
</template>
<script>
import Services from '../../../services/services';
import { mapGetters } from 'vuex';
export default {
    props: ['row', 'userId'],

    created() {
        Services.getSubscriptions(this.auth.token).then(res => {
            const { id, date, time } = this.row;
            console.log(res.data)
        })
    },

    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        handleClick(row) {
            const { id, time, date } = row;
            const data = {
                userId: this.userId,
                date,
                time,
                movieId: id
            };

            Services.subscribeTo(data).then(res => {
                this.isSub = !this.isSub;
                this.$notify({
                    title: 'Success',
                    message: 'Vous avez été bien enregistré!',
                    type: 'success'
                });
            }).catch(err => {
                this.$notify({
                    title: 'Error',
                    message: err.response.data.error,
                    type: 'error'
                });
            })
        },
    },
    data() {
        return {
            isSub: false,
            isFull: false
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
