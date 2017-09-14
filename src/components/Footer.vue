<template>
    <transition name="el-fade-in-linear">
        <div class="ch-footer">
            <el-col :xs="24" :sm="24" :md="{'span':18, 'offset': 3}" :lg="{'span':18, 'offset': 3}" >
                <div class="newsletter__form">
                    <el-form ref="form" :rules="rules" class="newsletter" label-position="left" label-width="250px" :model="form">
                        <el-form-item class="ns_container" label="S'inscrire à la newsletter" prop="email">
                            <el-input placeholder="Adresse email" v-model="form.email">
                                <el-button class="chap-button" slot="append" @click="onSubmit('form')">S'inscrire</el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="map">
                    <gmap-map :center="center" :zoom="18" :options="{styles: styles, disableDefaultUI: true}" style="width: 100%; height: 300px">
                        <gmap-marker :key="index" v-for="(m, index) in markers" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
                    </gmap-map>
                    <div class="info_cine">
                        <h4>Cinéma Charlie Chaplin </h4>
                        <p class="subtle">Espace François Miterrand</p>
                        <p class="address">Place Centenaire<br>73800 Montmelian</p>
                        <p class="contact__mail">
                            <b>Mail</b> : montmeliancine@gmail.com</p>
                        <p class="contact__phone">
                            <b>Tel</b> : 04 79 84 74 59</p>
                    </div>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="deep_foot">
                    <p>Copyright©Ayho.nine - Chaplin Montmelian |
                        <span class="m__legals" @click="dialogVisible = true">Mentions Légales</span>
                    </p>
                </div>
            </el-col>
            <el-dialog title="Mentions Légales" :visible.sync="dialogVisible" size="small">
                <m-legals></m-legals>
                <span slot="footer" class="dialog-footer">
                    <el-button class="chap-button" @click="dialogVisible = false">Annuler</el-button>
                    <el-button class="chap-button" type="primary" @click="dialogVisible = false">Confirm</el-button>
                </span>
            </el-dialog>
        </div>
    </transition>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import Service from '../services/services';
import Mlegals from './Mlegals';
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDgekJpEuFLvMrFENwFdpi46rmKeZV9a50'
    }
});

export default {
    components: {
        'm-legals': Mlegals
    },
    data() {
        return {
            dialogVisible: false,
            center: { lat: 45.500044, lng: 6.0509035 },
            rules: {
                email: [
                    { type: 'email', required: true, message: 'Veuillez enter un email valide', trigger: 'change' }
                ],
            },
            markers: [{
                position: { lat: 45.5000429, lng: 6.0494388 }
            }], // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{ "featureType": "all", "elementType": "all", "stylers": [{ "saturation": -100 }, { "gamma": 0.8 }] }],
            form: {
                email: ''
            }
        }
    },
    methods: {
        onSubmit(formName) {
            console.log(formName)
            this.$refs[formName].validate((valid) => {
                console.log(valid)
                if (valid) {
                    Service.postEmail(this.form).then(() => {
                        this.$refs[formName].resetFields();
                        this.$notify({
                            title: 'Inscription réussie',
                            message: 'Vous êtes bien inscrit !',
                            type: 'success'
                        });
                    }).catch(err => {
                        this.$notify({
                            title: 'Erreur',
                            message: 'Une erreur s\'est produite',
                            type: 'error'
                        });
                    })

                } else {
                    this.$notify({
                        title: 'Erreur',
                        message: 'Avez-vous entré un email valide ?',
                        type: 'error'
                    });
                    return false;
                }
            });


        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.ch-footer {
    margin-top: 50px;
    padding: 0 40px;
}

.map {
    position: relative;
}
@media screen and (max-width: 768px) {
    .ns_container {
        label {
            width: 100% !important;
        }
        .el-form-item__content{
            margin: 0 !important;
        }
    }
}
.newsletter {
    label {
        font-weight: bold;
    }
    input {
        border-radius: 0;
        background: rgba(49, 49, 49, 0.20);
        border: none;
        color: #333;
        font-weight: bold;
    }
}

.info_cine {
    background: rgba(255, 255, 255, 0.8);
    display: table;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 25px;
    padding: 20px;
    @media screen and (max-width: 768px) {
        right: 0;
    }
    h4 {
        margin: 0;
    }
    .subtle {
        opacity: 0.8;
    }
    .contact__mail {
        margin: 0;
    }
}

.deep_foot {
    margin: 20px 0;
    text-align: center;
    .nb__visitors {
        font-family: 'inconsolataBold', monospace;
        font-size: 24px;
    }
    .m__legals {
        font-weight: bold;
        opacity: 0.8;
        cursor: pointer;
    }
}
</style>
