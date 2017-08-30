<template>
    <div class="title__big">
        <h3 :data-title="title">{{title}}</h3>
    </div>
</template>
<script>
    export default {
        props: ['title'],
    }
</script>
<style lang="scss" scoped>
.title__big {
    display: block;
    h3 {
        font-weight: bold;
        position: relative;
        z-index: 10;
        font-size: 48px;
        &:before {
            content: attr(data-title);
            position: absolute;
            z-index: -1;
            top: -28px;
            left: 30px;
            font-size: 115px;
            opacity: .1;
        }
    }
}
</style>
