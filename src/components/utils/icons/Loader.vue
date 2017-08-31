<template>
    <div :class="{hidden: toHide}" class="preloader">
        <div class="preloader-svg">
            <svg xmlns="http://www.w3.org/2000/svg" id="svg-loader" data-name="Loader" viewBox="0 0 85 85">
                <title>
                    loaderai
                </title>
                <circle cx="42.5" cy="42.5" r="42" class="cls-1">

                </circle>
                <circle cx="42.6" cy="42.2" r="36.1" class="cls-2" />
                <g id="clap-wrapper">
                    <animateTransform attributeName="transform" begin="0s" dur="2s" values="-5 42.5 42.5; 5 42.5 42.5; -5 42.5 42.5" type="rotate" repeatCount="indefinite" />
                    <path d="M32.8,38.1a3.1,3.1,0,0,0-3,3.2v3.2c0,0.1,0,.2,0,0.3s0,0.2,0,.3V66.8a3.1,3.1,0,0,0,3.1,3.1H66A3.1,3.1,0,0,0,69,66.8V45.1A3.1,3.1,0,0,0,66,42.1H35.7V41.3a3.1,3.1,0,0,0-3-3.2h0Z" transform="translate(-7 -7.7)" />
                    <path d="M29.8,42H69v3.4H29.8V42Z" transform="translate(-7 -7.7)" />
                    <path d="M63.4,42h5.1l-2.2,3.4H61.2Z" class="cls-4" transform="translate(-7 -7.7)" />
                    <path d="M54.3,42h5.1l-2.2,3.4H52.1Z" class="cls-4" transform="translate(-7 -7.7)" />
                    <path d="M45,42h5.1l-2.2,3.4H42.8Z" class="cls-4" transform="translate(-7 -7.7)" />
                    <path d="M35.9,42H41l-2.2,3.4H33.7Z" class="cls-4" transform="translate(-7 -7.7)" />
                    <g id="clapy">
                        <path d="M30.7,42.4L67.2,28.2,66,25,29.4,39.3Z" transform="translate(-7 -7.7)" />
                        <path d="M61.9,30.2l4.8-1.9L63.4,26l-4.8,1.9Z" class="cls-4" transform="translate(-7 -7.7)" />
                        <path d="M53.5,33.5l4.8-1.9L55,29.3l-4.8,1.9Z" class="cls-4" transform="translate(-7 -7.7)" />
                        <path d="M44.9,36.9L49.6,35l-3.3-2.4-4.8,1.9Z" class="cls-4" transform="translate(-7 -7.7)" />
                        <path d="M36.4,40.2l4.8-1.9L37.8,36l-4.8,1.9Z" class="cls-4" transform="translate(-7 -7.7)" />
                    </g>
                    <path d="M33.3,40a0.5,0.5,0,1,1-.5-0.5,0.5,0.5,0,0,1,.5.5h0Z" class="cls-4" transform="translate(-7 -7.7)" />
                    <path d="M32.2,64l34,0.2" class="cls-5" transform="translate(-7 -7.7)" />
                    <path d="M41.2,64v5.1" class="cls-6" transform="translate(-7 -7.7)" />
                    <path d="M56,64V69" class="cls-6" transform="translate(-7 -7.7)" />
                    <path d="M38.8,58.2l20.8-.2" class="cls-7" transform="translate(-7 -7.7)" />
                    <text class="cls-8" transform="translate(26.3 47.3)">
                        C
                    </text>
                    <text class="cls-8" transform="translate(30.1 47.3) scale(0.7)">
                        HAPLIN
                    </text>
                    <text class="cls-9" transform="translate(43.7 47.3)"> S
                    </text>
                    <text class="cls-8" transform="translate(48.5 47.3) scale(0.7)">
                        TUDIO
                    </text>
                    <text class="cls-10" transform="translate(26.7 55.4)">
                        D
                        <tspan x="1.4" y="0">A</tspan>
                        <tspan x="2.6" y="0">T</tspan>
                        <tspan x="3.7" y="0">A</tspan>
                    </text>
                    <text class="cls-10" transform="translate(38.2 55.2)">
                        SCENE
                    </text>
                    <text class="cls-10" transform="translate(52.6 55.2)">
                        A
                        <tspan x="1.3" y="0">C</tspan>
                        <tspan x="2.6" y="0">T</tspan>
                    </text>
                    <text class="cls-10" transform="translate(39.6 60.4)">
                        N°1
                    </text>
                    <text class="cls-10" transform="translate(25 60.4)">
                        73800
                    </text>
                    <text class="cls-10" transform="translate(52.2 60.4)">
                        N°2
                    </text>

                </g>

            </svg>
        </div>
    </div>
</template>
<script>
export default {
    props: ['toHide']
}
</script>
<style lang="scss">
@import "../../../assets/fonts/font-face.css";
.cls-1,
.cls-2,
.cls-5,
.cls-6,
.cls-7 {
    fill: none;
}

.cls-1,
.cls-2 {
    stroke: #000;
}

.cls-1,
.cls-5,
.cls-7 {
    stroke-linecap: round;
}

.cls-1,
.cls-2,
.cls-5,
.cls-7 {
    stroke-miterlimit: 10;
}

.cls-1 {
    stroke-dasharray: 11.99 11.99;
}

.cls-2 {
    stroke-width: 5px;
}

.cls-3 {
    opacity: 0.22;
    isolation: isolate;
}

.cls-10,
.cls-4,
.cls-8,
.cls-9 {
    fill: #fff;
}

.cls-5,
.cls-6,
.cls-7 {
    stroke: #fff;
}

.cls-5 {
    stroke-width: 0.5px;
}

.cls-8,
.cls-9 {
    font-size: 8px;
    font-family: "Mistral", sans-serif;
}

.cls-9 {
    white-space: pre;
}

.cls-10 {
    font-size: 3px;
    font-family: Myriad Pro;
    font-weight: 700;
}


.preloader {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    background: #fff;
    left: 0;
    top: 0;
    transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    .preloader-svg {
        position: fixed;
        max-width: 500px;
        width: 100%;
        padding: 50px;
        top: 50%;
        left: 50%;
        transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        transform: translate(-50%, -50%) scale(1);
    }
    &.hidden {
        opacity: 0;
        top: -50px;
        visibility: hidden;
        pointer-events: none;
        .preloader-svg {
            top: 40%;
            transform: translate(-50%, -50%) scale(0);
        }
    }
}

#clapy {
    -webkit-animation: mymove 1s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    /* Safari 4.0 - 8.0 */
    animation: mymove 1s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

.cls-1 {
    -webkit-animation: rotation 2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
    /* Safari 4.0 - 8.0 */
    animation: rotation 2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);
}








/* Safari 4.0 - 8.0 */

@-webkit-keyframes mymove {
    0% {
        transform: rotate(21deg);
        transform-origin: 23px 33px;
    }
    50% {
        transform: rotate(0deg);
        transform-origin: 23px 33px;
    }
    100% {
        transform: rotate(21deg);
        transform-origin: 23px 33px;
    }
}








/* Standard syntax */

@keyframes mymove {
    0% {
        transform: rotate(21deg);
        transform-origin: 23px 33px;
    }
    50% {
        transform: rotate(0deg);
        transform-origin: 23px 33px;
    }
    100% {
        transform: rotate(21deg);
        transform-origin: 23px 33px;
    }
}



/* Safari 4.0 - 8.0 */

@-webkit-keyframes rotation {
    0% {
        transform: rotate(0deg);
        transform-origin: 42.5px 42.5px;
    }

    100% {
        transform: rotate(360deg);
        transform-origin: 42.5px 42.5px;
    }
}








/* Standard syntax */

@keyframes rotation {
    0% {
        transform: rotate(0deg);
        transform-origin: 42.5px 42.5px;
    }

    100% {
        transform: rotate(360deg);
        transform-origin: 42.5px 42.5px;
    }
}
</style>
