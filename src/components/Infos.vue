<template>
    <transition name="el-fade-in-linear">
        <div>
            <big-title title="Nos tarifs" orientation="top"></big-title>
            <el-row :gutter="20">
                
                <el-col :xs="24" :sm="24" :md="{span: 12, offset:6}" :lg="{span: 12, offset:6}">
                    <div class="pricing__wrapper pricing__wrapper-first">
                        <div class="pricing">
                            <h4>Plein tarif</h4>
                            <p class="price">5€</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="{span: 12, offset:6}" :lg="{span: 12, offset:6}">
                    <div class="pricing__wrapper pricing__wrapper-second">
                        <div class="pricing">
                            <h4>Tarif enfant</h4>
                            <p class="subtle">
                                Moins de 13 ans, obligatoirement accompagné d'un adulte
                                <br> </p>
                            <p class="price">3€</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="{span: 12, offset:6}" :lg="{span: 12, offset:6}">
                    <div class="pricing__wrapper pricing__wrapper-third">
                        <div class="pricing">
                            <h4>Tarif réduit</h4>
                            <p class="subtle">
                                Abonnés, 13 - 25 ans, chômeurs et handicapés
                            </p>
                            <p class="price">4€</p>
                        </div>
                    </div>
                    <p>
                        <b>Séances 3D</b> avec un supplément de 1€
                        <br>
                        <b>Carte Pass'Région</b> (anciennement carte M'ra) pour les lycéens de la Région Auvergne-Rhône-Alpes acceptée
                    </p>
                </el-col>
                <el-col :xs="24" :sm="24" :md="{span: 12, offset:6}" :lg="{span: 12, offset:6}">
                    <div class="subscribed__card">
                        <h4>Carte
                            <b>abonné</b>
                        </h4>
                        <h5><b>8</b>€</h5>
                        <p>                           
                            <br>Chaque séance :
                            <b>4</b> euros
                            <br>
                            <br>Valable du 1er octobre au 30 septembre de l'année suivante
                            <br>
                            <span>Pour l'inscription, apporter une photo (carte individuelle)</span>
                        </p>
                    </div>

                </el-col>
            </el-row>
        </div>

    </transition>
</template>

<script>
import BigTitle from './utils/BigTitle';

export default {
    components: {
        'big-title': BigTitle,
    },
    created() {


    },
    data() {
        return {

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/fonts/font-face.css";
@import url('https://fonts.googleapis.com/css?family=Cutive+Mono|Dosis|Exo+2|Inconsolata|Josefin+Sans|Roboto+Mono');
* {
    font-family: 'inconsolata', monospace;
}

.subscribed__card {
    border: 4px solid #f3f3f3;
    box-shadow: 10px 15px 10px 0px #d2d2d2;
    border-radius: 10px;
    padding: 15px;
    background: url('/static/img/pricing3.png') right center no-repeat;
    position: relative;
    h4, h5 {
        margin: 0;
    }
    h5 {
        position: absolute;
        top: 40px;
        right: 20px;
        font-size: 80px;
    }
    p {
        font-size: 16px;
        margin: 0;
        span {
            font-size: 14px;
            font-style: italic;
        }
    }
}

.pricing__wrapper {
    width: 100%;
    height: 350px;
    background: #333;
    margin-bottom: 20px;
    position: relative;
    .subtle{
        font-size: 16px;
        font-style: italic;
    }
    &-first {
        background: url('/static/img/pricing1.png') left center no-repeat;
        .pricing {
            max-width: 300px;
            right: 30%;
        }
    }
    &-second {
        background: url('/static/img/pricing2.png') left center no-repeat;
        .pricing {
            max-width: 300px;
            right: 0;
        }
    }
    &-third {
        background: url('/static/img/pricing3.png') left center no-repeat;
        .pricing {
            max-width: 500px;
            right: 0;
        }
    }

    .pricing {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.8);
        padding: 15px;
        h4 {
            font-weight: bold;
            margin-bottom: 20px;
        }
        .price {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
    }
}
</style>
