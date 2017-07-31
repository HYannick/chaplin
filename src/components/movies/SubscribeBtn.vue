<template>
    <div>
        <el-button v-if="!isSub" @click="handleClick(row)" size="small">S'inscrire</el-button>
        <el-button v-else @click="handleClick(row)" size="small">Se désinscrire</el-button>
    </div>
</template>
<script>
import Services from '../../services/services';
import { mapGetters } from 'vuex';
export default {
    props: ['row', 'userId'],


    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        handleClick(row) {
            const { id, time, date } = row;
            const data = {
                enrolled: this.userId,
                date,
                time,
                movies: id
            };

            Services.subscribeTo(data).then(res => {
                this.isSub = !this.isSub;
            }).catch(err => {
                console.log(err);
            })
        },
    },
    data() {
        return {
            isSub: false,
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
