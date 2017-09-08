<template>
    <transition name="el-fade-in-linear">
        <div v-show="!isFull">
            <el-switch v-model="isSub"  on-color="#13ce66" @change="handleClick(row)" on-text="" off-text="">
            </el-switch>
        </div>
    </transition>
</template>
<script>
import Services from '../../../services/services';
import { mapGetters } from 'vuex';
export default {
    props: ['row', 'userId'],

    created() {
        Services.getSubscriptions(this.auth.token).then(res => {
            const { id, date, time } = this.row;
            const otherSubs = res.data.filter(sub => {
                return sub.date == date && sub.time == time && sub.enrolled[0]._id !== this.userId;
            });
            const mySubs = res.data.filter(sub => {
                return sub.date == date && sub.time == time && sub.enrolled[0]._id == this.userId;
            });
            if (otherSubs.length !== 0) {
                this.isFull = true;
            }
            if (mySubs.length !== 0) {
                this.isSub = true;
            }
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
                
                const textSub = this.isSub ? 'Vous êtes bien inscrit !' : 'vous êtes bien désinscrit !'
                this.$notify({
                    title: 'Demande enregistrée',
                    message: textSub,
                    type: 'success'
                });
                this.$emit('change');
            }).catch(err => {
                this.$notify({
                    title: 'Erreur',
                    message: 'Une erreur s\'est produite',
                    type: 'error'
                });
            })
        },
    },
    data() {
        return {
            isSub: false,
            isFull: false,
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
