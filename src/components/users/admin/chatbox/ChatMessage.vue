<template>
    <transition name="el-fade-in-linear">
        <el-col :span="18" :offset="3">
            <div class="msg__box">
                <el-form ref="form" class="send__message" label-position="left" label-width="200px" :model="form">
                    <el-form-item label="">
                        <el-input placeholder="Allez-y c'est gratuit :D" v-model="form.message">
                            <el-button slot="append" @click="onSubmit"><icon name="paper-plane"></icon></el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </transition>
</template>
<script>
import moment from 'moment';
import {mapGetters} from 'vuex';
export default {
    props: ['author'],
    computed: {
        ...mapGetters(['auth'])
    },
    methods: {
        onSubmit() {
            const now = moment().unix();
            this.form.date = now;
            this.$socket.emit('chat', this.form)
        }
    },
    created(){
        this.form.author = this.auth.username;
    },
    data(){
        return {
            form: {
                author: '',
                message: '',
                date: ''
            }
      }  
    },

}
</script>