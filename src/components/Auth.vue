<template>
    <transition name="el-fade-in-linear">
        <el-row :gutter="20">
            <el-col :span="12" :offset="6">
                <h4>Se connecter</h4>
                <el-form ref="form" :rules="rules" label-position="top" :model="user" @submit.native.prevent="onSubmit('form')" label-width="120px" class="form-add">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="Email" prop="email">
                                <el-input v-model="user.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="Mot de passe" prop="password">
                                <el-input type="password" v-model="user.password"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
    
                    <el-form-item>
                        <el-button class="chap-button" type="primary" native-type="submit">Se connecter</el-button>
                        <el-button class="chap-button" @click="back">Annuler</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
    
        </el-row>
    </transition>
</template>


<script>
import axios from 'axios';
import Services from '../services/services';
import { mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Veuillez entrer un email', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Veuillez entrer un mot de passe', trigger: 'blur' },
                ]
            },
        }

    },
    computed: {
         ...mapGetters(['auth']),
    },
    beforeUpdate(){
        if(this.auth.logged){
            this.$router.push(`/`);
        }
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        onSubmit(formName) {
            console.log('Submitting ...')
            this.$refs[formName].validate((valid) => {
              
                if (valid) {
                    this.login(this.user);
                    console.log('test');
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
            this.$router.push(`/`);
        }
    }
}
</script>

<style lang="scss">

</style>
