<template>
    <div>
        <ul class="newsletter__list">
            <li class="newsletter__item" v-for="(item, index) in emailList" :key="index">
                <span class="email__item">{{item.email}}</span>
                <el-button type="danger" size="small" icon="delete" @click="deleteMail(item._id)"></el-button>
            </li>
        </ul>
        <el-button type="success">
            <a :href="`mailto:${mailing}`">Envoyer une newsletter</a>
        </el-button>
    </div>
</template>
<script>
import Services from '../../../../services/services';
export default {
    data() {
        return {
            emailList: [],
        }
    },
    computed: {
        mailing() {
            return this.emailList.map(mail => mail.email)
        }
    },
    created() {
        Services.getEmails().then(emailList => {
            this.emailList = emailList.data
            navigator.registerProtocolHandler("mailto",
                "https://mail.google.com/mail/?extsrc=mailto&url=%s",
                "Gmail");
        })
    },

    methods: {
        deleteMail(id) {
            Services.removeEmail(id).then(emailList => {
                this.emailList = emailList.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.newsletter__list {
    padding: 0;
}

.newsletter__item {
    display: flex;
    padding: 10px;
    align-items: center;
    span {
        flex-grow: 1;
    }

    &:nth-child(even) {
        background: rgba(0, 0, 0, 0.90);
        color: #fff;
    }
}
</style>
