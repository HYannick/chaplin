<template>
    <div>
        <el-table class="user__table" ref="multipleTable" :data="userList" border style="width: 100%">
            <el-table-column property="username" label="Nom">
            </el-table-column>
            <el-table-column property="role" label="Statut" prop="role" :formatter="formatRole">
            </el-table-column>
            <el-table-column property="email" label="Email">
            </el-table-column>
            <el-table-column property="verified" label="Validé" align="center" width="100px" :formatter="formatVerified">
                <template scope="props">
                    <div style="text-align: center">
                        <i v-if="props.row.verified" class="el-icon-circle-check"></i>
                        <i v-else class="el-icon-circle-close"></i>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Editer">
                <template scope="props">
                    <div class="edition">
                        <el-button @click.native.prevent="editUser(props.row)" type="text" icon="edit" size="medium"></el-button>
                        <el-button @click.native.prevent="deleteUser(props.row)" type="text" icon="delete" size="medium"  v-if="props.row.role !== 'admin'"></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <create-volunteer @created="refreshList"></create-volunteer>

        <el-dialog :title="`Edition | ${userForm.username || 'Bénévole'}`" :visible.sync="dialogFormVisible">
            <el-form :model="userForm" label-position="top">
                <el-form-item label="Nom" :label-width="formLabelWidth">
                    <el-input v-model="userForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth">
                    <el-input v-model="userForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Mot de passe" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="userPassword"></el-input>
                </el-form-item>
                <el-form-item label="Statut" :label-width="formLabelWidth">
                    <el-select v-model="userForm.role" placeholder="Sélectionnez un rôle">
                        <el-option label="Administrateur" value="admin"></el-option>
                        <el-option label="Bénévole" value="volunteer"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Annuler</el-button>
                <el-button type="primary" @click="submitUser()">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { EventBus } from '../../../utils/event-bus';
import Services from '../../../../services/services';
import CreateVolunteer from './CreateVolunteer'
export default {
    components: {
        'create-volunteer': CreateVolunteer
    },
    data() {
        return {
            userList: [],
            userEdit: {},
            dialogTableVisible: false,
            dialogFormVisible: false,
            _idToEdit: '',
            userPassword: '',
            userForm: {
                email: '',
                username: '',
                password: '',
                role: '',
            },
            formLabelWidth: '120px'
        }
    },
    created() {
        this.refreshList()
    },

    methods: {
        formatRole(row, column) {
            if (row.role === 'admin') {
                return 'Administrateur'
            } else {
                return 'Bénévole'
            }
        },
        formatVerified(row, column) {
            return row.verified.toString();
        },
        refreshList() {
            Services.getUsers().then(users => {
                this.userList = users.data
                console.log(this.userList)
            })
        },
        sendMail(user) {
            console.log(user.email)
        },
        editUser(user) {
            this._idToEdit = user._id;
            this.userForm = user;
            this.dialogFormVisible = true;
        },
        deleteUser(user) {
            Services.deleteUser(user._id).then((res) => {
                this.userList = res.data;
                this.$notify({
                    title: 'Suppression',
                    message: 'Utilisateur supprimé !',
                    type: 'success'
                });
            }).catch(err => {
                this.$notify({
                    title: 'Erreur',
                    message: 'Une erreur s\'est produite',
                    type: 'error'
                });
            })
        },
        submitUser() {
            this.dialogFormVisible = false;
            this.userForm.password = this.userPassword;
            Services.updateUser(this._idToEdit, this.userForm).then((res) => {
                this.$notify({
                    title: 'Mise à jour',
                    message: 'Bénévole mis à jour !',
                    type: 'success'
                });
            }).catch(err => {
                this.$notify({
                    title: 'Erreur',
                    message: 'Une erreur s\'est produite',
                    type: 'error'
                });
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.edition button{
    color: #333;
}
.user__table {
    .el-icon-circle-check {
        color: #13CE66;
    }
    .el-icon-circle-close {
        color: #FF4949;
    }
}
</style>
