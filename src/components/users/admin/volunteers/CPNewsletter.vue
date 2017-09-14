<template>
    <div>
        <div class="nl__head">
            <h5>Liste d'inscrits ({{emailList.length}})</h5>

            <el-button class="send__news chap-button" @click="dialogVisible = true">
                Envoyer une newsletter
            </el-button>
        </div>
        <hr>
        <ul class="newsletter__list">
            <li class="newsletter__item" v-for="(item, index) in emailList" :key="index">
                <span class="email__item">{{item.email}}</span>
                <el-button type="danger" size="small" icon="delete" @click="deleteMail(item._id)"></el-button>
            </li>
        </ul>
        <el-dialog title="Copier les emails" :visible.sync="dialogVisible" size="small">
            <el-input class="mailing__list" v-model="mailing">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button class="chap-button"  type="primary" @click="copy">Copier</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Services from '../../../../services/services';
export default {
    data() {
        return {
            dialogVisible: false,
            emailList: [],
        }
    },
    computed: {
        mailing() {
            return this.emailList.map(mail => mail.email).join(', ')
        }
    },
    created() {
        Services.getEmails().then(emailList => {
            this.emailList = emailList.data
        })
    },

    methods: {
        copy() {
            this.$clipboard(this.mailing)
            this.$notify({
                title: 'Copié !',
                message: 'Emails copiés dans le presse papier !',
                type: 'success'
            });
            this.dialogVisible = false
        },
        deleteMail(id) {
            this.$confirm('Etes vous sûr de vouloir supprimer cet email ?')
                .then(_ => {
                    Services.removeEmail(id).then(emailList => {
                        this.emailList = emailList.data
                        this.$notify({
                            title: 'Email supprimé',
                            message: '',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.$notify({
                            title: 'Erreur',
                            message: 'Une erreur s\'est produite',
                            type: 'error'
                        });
                    })
                })

        }
    }
}
</script>
<style lang="scss" scoped>
.newsletter__list {
    padding: 0;
    overflow: hidden;
    width: 100%;
}

.nl__head {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    h5 {
        margin: 0;
        flex-grow: 1;
    }
}

.send__news {

    margin-top: 10px;
    overfow: hidden;
}

.mailing__list {
    .el-input__inner {
        padding: 10px;
        background: #333;
        font-weight: bold;
        color: #fff;
        border-radius: none;
    }
}

.newsletter__item {
    display: flex;
    padding: 10px;
    align-items: center;
    span {
        flex-grow: 1;
    }

    &:nth-child(even) {
        background: rgba(0, 0, 0, 0.10);
    }
}
</style>
