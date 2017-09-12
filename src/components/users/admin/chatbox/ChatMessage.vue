<template>
    <transition name="el-fade-in-linear">
        <el-col :span="24">
            <div class="msg__box">
                <el-form ref="form" class="send__message" :rules="rules" :model="form">
                    <el-form-item prop="message">
                        <el-input type="textarea" autosize :rows="2" placeholder="Allez-y c'est gratuit :D" v-model="form.message" @keydown.native="type($event)" @blur="stopType">
                            <el-button slot="append" @click="onSubmit('form')">
                                <icon name="paper-plane"></icon>
                            </el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </transition>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
    props: ['author'],
    computed: {
        ...mapGetters(['auth'])
    },
    methods: {
        type(e) {
            this.$socket.emit('typing', this.auth.username)
            if (e.ctrlKey && e.keyCode == 13) {
                this.onSubmit('form')
            }
        },
        stopType() {
            this.$socket.emit('stop typing', this.auth.username)
        },
        onSubmit(formName) {
            this.$socket.emit('stop typing', this.auth.username)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const now = moment().format('DD MMM hh[:]mm');
                    this.form.date = now;
                    this.$socket.emit('chat', this.form)
                    this.$refs[formName].resetFields();
                }

            });
        }

    },
    created() {
        this.form.author = this.auth.username;
    },
    data() {
        return {
            form: {
                author: '',
                message: '',
                date: ''
            },
            rules: {
                message: [
                    { required: true, message: 'Veuillez entrer un message', trigger: 'enter' }
                ],
            }
        }
    },

}
</script>