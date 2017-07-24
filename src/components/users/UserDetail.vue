<template>
    <div>
        UserDetail {{user.email}}
        <div v-for="sub in user.subscriptions" :key="sub._id">
            {{sub.title}}
        </div>
    </div>
</template>
<script>
import Services from '../../services/services'
import { mapGetters } from 'vuex';
export default {
    computed: {

    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
        })
    },
    beforeUpdate() {
        if (!this.auth.logged) {
            this.$router.push('/signin');
        }
    },
    computed: {
        ...mapGetters(['auth'])
    },
    data() {
        return {
            user: {}
        }
    }
}
</script>
<style lang="sass" scoped>

</style>
