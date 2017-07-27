<template>
    <transition name="el-fade-in-linear">
        <div>
            UserDetails
            {{user.email}}
        </div>
    </transition>
</template>

<script>
import Services from '../../../services/services';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['auth']),
    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.user = res.data;
        });

    },
    data() {
        return {
            user: {}
        }
    }
}
</script>