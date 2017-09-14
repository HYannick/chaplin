<template>
    <transition name="el-fade-in-linear">
        <el-col :span="24">
            <div class="msg__box">
                <el-form ref="form" class="send__message" :rules="rules" :model="form">
                    <el-form-item prop="message">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="Entrez un message. Les liens sont automatiquement transformés en image ou en lien." v-model="form.message" @keydown.native="type($event)" @blur="stopType">

                        </el-input>
                        <div class="form__footer">
                            <span>Appuyez sur Ctrl + Entrée pour envoyer.</span>
                            <el-button class="send__btn chap-button" @click="onSubmit('form')">
                                <icon name="paper-plane"></icon>
                                Envoyer
                            </el-button>
                        </div>

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
                    const now = moment().format('DD MMMM hh[:]mm');
                    this.form.date = now;
                    this.$socket.emit('chat', this.form)
                    this.$refs[formName].resetFields();
                    this.$emit('newMessage')
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
<style lang="scss" scoped>
.msg__box {
    margin-top: 20px;
}

.form__footer {
    margin-top: 10px;
    display: flex;
    width: 100%;
    align-items: center;
    span {
        font-size: 12px;
        flex-grow: 2;
    }
}
</style>
