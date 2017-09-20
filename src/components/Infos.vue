<template>
    <transition name="el-fade-in-linear">
        <div>
            <big-title title="Nos tarifs" orientation="top"></big-title>
            <el-row :gutter="20" class="price__table">
                <el-col :md="{span: 12, offset:12}" :lg="{span: 12, offset:12}" class="prices">
                    <div class="pricing__wrapper">
                        <div class="pricing">
                            <h4>Plein tarif</h4>
                            <p class="price">5€</p>
                        </div>
                    </div>
                    <div class="pricing__wrapper">
                        <div class="pricing">
                            <h4>Tarif enfant</h4>
                            <p class="subtle">
                                Moins de 13 ans, obligatoirement accompagné d'un adulte
                                <br> </p>
                            <p class="price">3€</p>
                        </div>
                    </div>
                    <div class="pricing__wrapper">
                        <div class="pricing">
                            <h4>Tarif réduit</h4>
                            <p class="subtle">
                                Abonnés, 13 - 25 ans, chômeurs et handicapés
                            </p>
                            <p class="price">4€</p>
                        </div>
                    </div>
                    <div class="subscribed__card">
                        <h4>Carte
                            <b>abonné</b>
                        </h4>
                        <h5>
                            <b>8</b>€</h5>
                        <p>
                            <br>Chaque séance :
                            <b>4</b> euros
                            <br>
                            <br>Valable du 1er octobre au 30 septembre de l'année suivante
                            <br>
                            <span>Pour l'inscription, apporter une photo (carte individuelle)</span>
                        </p>
                    </div>
                    <div class="pricing__wrapper">
                        <p>
                            <b>Séances 3D</b> avec un supplément de 1€
                            <br>
                            <b>Carte Pass'Région</b> (anciennement carte M'ra) pour les lycéens de la Région Auvergne-Rhône-Alpes acceptée
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

.price__flex {
    @media screen and (min-width: 768px) {
        display: flex;
    }
}

.price__table {
    @media screen and (min-width: 768px) {
        background: url('/static/img/chaplin__tarifs.png') left center no-repeat;
    }
}

.prices {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.8);
}

.subscribed__card {
    border: 4px solid #f3f3f3;
    box-shadow: 10px 15px 10px 0px #d2d2d2;
    border-radius: 10px;
    padding: 15px;
    background: url('/static/img/pricing3.png') right center no-repeat #fff;
    position: relative;
    h4,
    h5 {
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
    margin-bottom: 20px;
    position: relative;
    &:last-child {
        margin-top: 30px;
    }
    .subtle {
        font-size: 16px;
        font-style: italic;
        margin-bottom: 5px;
    }

    .pricing {
        padding: 15px;
        h4 {
            font-weight: bold;
            margin: 0;
            position: relative;
            display: table;
            margin-bottom: 10px;
            &:before {
                content: '';
                background: #696969;
                position: absolute;
                top: 25px;
                right: -5px;
                opacity: 0.5;
                z-index: 99;
                width: 90%;
                transition: 0.3s;
                height: 20px;
            }
        }
        .price {
            font-size: 30px;
            font-weight: bold;
            margin: 0;
        }
    }
}
</style>
