<template>
    <div class="title__big" :class="classObject">
        <h3 :data-title="back || title">{{title}}</h3>
    </div>
</template>
<script>
export default {
    props: ['title', 'orientation', 'back'],
    computed: {
        classObject: function() {
            return {
                'bottom': this.orientation === 'bottom',
                'center': this.orientation === 'center',
                'top': this.orientation === 'top'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.title__big {
    display: block;
    &.bottom {
        h3:before {
            top: 10px;
        }
    }
    &.top {
        h3:before {
            top: -28px;
        }
    }
    &.center {
        h3:before {
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    h3 {
        font-weight: bold;
        position: relative;
        z-index: 10;
        font-size: 48px;
        @media screen and (max-width: 768px) {
            text-align: center;
            font-size: 40px;
        }

        &:before {
            content: attr(data-title);
            position: absolute;
            z-index: -1;

            left: 30px;
            font-size: 115px;
            opacity: .05;
            @media screen and (max-width: 768px) {
                display: none;
            }
        }
    }
}
</style>
