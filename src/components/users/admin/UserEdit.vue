<template>
    <transition name="el-fade-in-linear">
        <div>
            <el-form ref="form" :rules="rules" label-position="top" :model="form" label-width="120px" class="form-add">
                <el-row :gutter="20">
                    <el-col :md="6">
                        <el-form-item label="Pseudonyme" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="Mot de passe" prop="password">
                            <el-input v-model="tempPassword"></el-input>
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
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['auth']),
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {
            console.log('Submitting ...');
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Services.updateUser(this.auth.userId, this.form)
                        .then(res => {
                            this.$notify({
                                title: 'Film à jour',
                                message: 'Le film a bien été mis à jour !',
                                type: 'success'
                            });
                            this.$router.push(`/users/${this.auth.userId}`)
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
            this.$router.push(`/users/${this.auth.userId}`);
        }
    },
    created() {
        Services.getUser(this.auth.userId, this.auth.token).then(res => {
            this.form = res.data;
        });

    },
    data() {
        return {
            form: {
                username: '',
                email: '',

            },
            rules: {
                username: [
                    { required: true, message: 'Veuillez entrer un pseudonyme', trigger: 'blur' },
                ],
                email: [
                    { required: true, message: 'Veuillez entrer une adresse email', trigger: 'blur' },
                ],

            },
            tempPassword: ''
        }
    }
}
</script>