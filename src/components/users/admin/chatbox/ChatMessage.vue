<template>
    <transition name="el-fade-in-linear">
        <el-col :span="18" :offset="3">
            <div class="msg__box">
                <el-form ref="form" class="send__message" label-position="left" label-width="200px" :model="form">
                    <el-form-item label="">
                        <el-input placeholder="Allez-y c'est gratuit :D" v-model="form.message">
                            <el-button slot="append" @click="onSubmit">Envoyer</el-button>
                        </el-input>
                    </el-form-item>
                </el-form>
                {{auth}}
            </div>
        </el-col>
    </transition>
</template>
<script>
import moment from 'moment';
export default {
    props: ['author'],
    methods: {
        onSubmit() {
            console.log('sending')
        }
    },
    data(){
        return {
            form: {
                message: '',
                date: ''
            }
      }  
    },

}
</script>