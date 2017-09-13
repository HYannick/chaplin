<template>
    <transition name="el-fade-in-linear">
        <div>
            <big-title title="Nos tarifs" orientation="top"></big-title>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="pricing__wrapper pricing__wrapper-first">
                        <div class="pricing">
                            <h4>Plein tarif</h4>
                            <p class="price">5€</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="pricing__wrapper pricing__wrapper-second">
                        <div class="pricing">
                            <h4>Tarif enfant</h4>
                            <p class="subtle">
                                (moins de 13 ans)
                                <br> Tout enfant de moins de 13 ans doit être accompagné d'un adulte. Merci.</p>
                            <p class="price">3€</p>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="20" :lg="20">
                    <div class="pricing__wrapper pricing__wrapper-third">
                        <div class="pricing">
                            <h4>Tarif réduit</h4>
                            <p class="subtle">
                                (abonnés, jeunes de 13 à 25 ans, chômeurs, handicapés)
                                <br>La carte "abonné" est vendue 8 euros, et donne accès au tarif de 4 euros pour toutes les séances.
                                <br>Elle est valable du 1er octobre au jusqu'au 30 septembre de l'année suivante.
                                <br>Elle est individuelle : apporter une photo. Merci.
                            </p>
                            <p class="price">4€</p>
                        </div>
                    </div>
                    <p>
                        Séance en 3D : Supplément
                        <b>1€</b><br> Le cinéma accepte la
                        <b>carte M'Ra</b> pour les Lycéens de la Région Rhône-Alpes.
                    </p>
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

.pricing__wrapper {
    width: 100%;
    height: 350px;
    background: #333;
    margin-bottom: 20px;
    position: relative;
    &-first {
        background: url('/static/img/pricing1.png') left center no-repeat;
        .pricing{
             max-width: 300px;
              right: 30%;
        }
    }
    &-second {
        background: url('/static/img/pricing2.png') left center no-repeat;
        .pricing{
             max-width: 300px;
             right: 0;
        }
    }
    &-third {
        background: url('/static/img/pricing3.png') left center no-repeat;
        .pricing{
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
        h4{
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
