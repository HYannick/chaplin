<template>
    <div>
        <el-button class="add__volunteer chap-button" @click="dialogVisible =true">Ajouter un volontaire</el-button>
        <el-dialog title="Ajouter un volontaire" :visible.sync="dialogVisible" size="tiny">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top">
                <el-form-item label="Nom" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Mot de passe" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Statut" :label-width="formLabelWidth" prop="role">
                    <el-select v-model="ruleForm.role" placeholder="Sélectionnez un rôle">
                        <el-option label="Administrateur" value="admin"></el-option>
                        <el-option label="Bénévole" value="volunteer"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="chap-button"  @click="dialogVisible = false">Annuler</el-button>
                <el-button class="chap-button"  type="primary" @click="addUser('ruleForm')">Ajouter</el-button>
                
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
            ruleForm: {
                username: '',
                password: '',
                role: '',
                email: ''
            },
            rules: {
                username: [
                    { required: true, message: 'Veuillez entrer un nom valide', trigger: 'blur' },
                    { min: 3, message: 'Longueur entre 3 et 5 caractères', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Veuillez entrer un mot de passe valide', trigger: 'blur' },
                    { min: 3, message: 'Longueur entre 3 et 5 caractères', trigger: 'blur' }
                ],
                role: [
                    { required: true, message: 'Veuillez sélectionner un rôle', trigger: 'change' }
                ],
                email: [
                    { type: 'email', required: true, message: 'Veuillez enter un email valide', trigger: 'change' }
                ],
            },
            formLabelWidth: '120px'
        }
    },
    methods: {
        addUser(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Services.createUser(this.ruleForm).then((res) => {
                        this.$emit('created');
                        this.dialogVisible = false;
                        this.$notify({
                            title: 'Utilisateur créé',
                            message: 'Utilisateur bien enregistré !',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                    })
                } else {
                    this.$notify({
                        title: 'Erreur',
                        message: 'Une erreur s\'est produite',
                        type: 'error'
                    });

                    return false;
                }
            });

        },
    }
}
</script>

<style lang="scss" scoped>
.add__volunteer {
    float: right;
    margin: 20px 0 0;
}
</style>
