<template>
    <div :class="{hidden: toHide}" class="mini__loader">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" class="lds-eclipse" preserveAspectRatio="xMidYMid" style="background: none;" viewBox="0 0 100 100">
            <path fill="#28292f" stroke="none" d="M40 50A10 10 0 0 0 60 50A10 11 0 0 1 40 50" transform="rotate(60 50 50.5)">
                <animateTransform attributeName="transform" begin="0s" calcMode="spline" dur="0.5s" keyTimes="0;1" repeatCount="indefinite" type="rotate" keySplines="0.47 0 0.745 0.715" values="0 50 50.5;360 50 50.5"/>
            </path>
        </svg>
    </div>
</template>
<script>
export default {
    props: ['toHide']
}
</script>
<style lang="scss">
    .mini__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        transiton: 0.3s;
    }
    .hidden{
        opacity:0;
        visibility: hidden;
    }
</style>