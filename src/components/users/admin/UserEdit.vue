<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="120px" class="form-add">
                <el-row :gutter="20">
                    <el-col :md="6">
                        <el-form-item label="Pseudonyme" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="Mot de passe" prop="tempPassword">
                            <el-input type="password" v-model="form.tempPassword"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirmer le mot de passe" prop="checkPass">
                            <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">Mettre à jour</el-button>
                    <el-button @click="back">Annuler</el-button>
                </el-form-item>
            </el-form>
        </div>
    </transition>
</template>

<script>
import Services from '../../../services/services';
import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState(['userId', 'token']),
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.form.tempPassword !== '') {
                        this.form.password = this.form.tempPassword;
                    }
                    const {username, email, password} = this.form;
                    Services.updateUser(this.userId, {username, email, password})
                        .then(res => {
                            this.$notify({
                                title: 'Film à jour',
                                message: 'Le film a bien été mis à jour !',
                                type: 'success'
                            });
                            this.$router.push(`/users/${this.userId}`)
                        })
                        .catch(err => {
                            this.$notify({
                                title: 'Erreur',
                                message: 'Une erreur s\'est produite',
                                type: 'error'
                            });
                        })
                } else {
                    this.$notify({
                        title: 'Error',
                        message: 'An error occured',
                        type: 'error'
                    });
                    return false;
                }
            })
        },

        back() {
            this.$router.push(`/users/${this.userId}`);
        }
    },
    created() {
        Services.getUser(this.userId, this.token).then(res => {
            this.form = res.data;
        });
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'));
            } else {
                if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'));
            } else if (value !== this.form.tempPassword) {
                callback(new Error('Two inputs don\'t match!'));
            } else {
                callback();
            }
        };
        return {
            form: {
                username: '',
                email: '',
                password: '',
                tempPassword: '',
                checkPass: ''

            },
            rules: {
                username: [
                    { required: true, message: 'Veuillez entrer un pseudonyme', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Veuillez entrer une adresse email', trigger: 'blur' },
                ],
                tempPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],

            },
        }
    }
}
</script>