<template>
    <div>
        <el-table ref="multipleTable" :data="userList" border style="width: 100%">
            <el-table-column property="username" label="Nom">
            </el-table-column>
            <el-table-column property="role" label="Role">
            </el-table-column>
            <el-table-column property="email" label="Email">
            </el-table-column>
            <el-table-column label="Editer">
                <template scope="props">
                    <el-button @click.native.prevent="editUser(props.row)" type="text" icon="edit" size="small"></el-button>
                    <el-button @click.native.prevent="deleteUser(props.row)" type="text" icon="delete" size="small"></el-button>
                    <el-button @click.native.prevent="sendMail(props.row)" type="text" icon="message" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="`Edition | ${userForm.username || 'Bénévole'}`" :visible.sync="dialogFormVisible">
            <el-form :model="userForm">
                <el-form-item label="Nom" :label-width="formLabelWidth">
                    <el-input v-model="userForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth">
                    <el-input v-model="userForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Role" :label-width="formLabelWidth">
                    <el-select v-model="userForm.role" placeholder="Sélectionnez un rôle">
                        <el-option label="Admin" value="admin"></el-option>
                        <el-option label="Volunteer" value="volunteer"></el-option>
                        <el-option label="Utilisateur" value="reader"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitUser()">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Services from '../../../services/services';
export default {
    data() {
        return {
            userList: [],
            userEdit: {},
            dialogTableVisible: false,
            dialogFormVisible: false,
            _idToEdit: '',
            userForm: {
                email: '',
                username: '',
                role: '',
            },
            formLabelWidth: '120px'
        }
    },
    created() {
        Services.getUsers().then(users => {
            this.userList = users.data
        })
    },

    methods: {
        sendMail(user) {
            console.log(user.email)
        },
        editUser(user) {
            this._idToEdit = user._id;
            this.userForm = user;
            this.dialogFormVisible = true;
        },
        deleteUser(user) {
            console.log(user)
            Services.deleteUser(user._id).then((res) => {
                this.userList = res.data;
                this.$notify({
                    title: 'Success',
                    message: 'Utilisateur supprimé!',
                    type: 'success'
                });
            })
        },
        submitUser() {
            this.dialogFormVisible = false;
            Services.updateUser(this._idToEdit, this.userForm).then((res) => {
                this.$notify({
                    title: 'Success',
                    message: 'Bénévole mis à jour!',
                    type: 'success'
                });
            })
        },
    }
}
</script>