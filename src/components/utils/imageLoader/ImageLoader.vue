<template>
    <div :class="[classname,{loaded : loadedImage} ]" v-images-loaded:on.progress="imageProgress">
        <img width="100%" :src="imageUrl" class="image">
    </div>
</template>
<script>
import imagesLoaded from 'vue-images-loaded';
export default {
    props: ['classname', 'imageUrl'],
    directives: {
        imagesLoaded
    },
    data() {
        return {
            loadedImage: false,
        }
    },
    methods: {
        imageProgress(instance, image) {
            this.loadedImage = image.isLoaded;
        },
    }
}
</script>
<style lang="scss" scoped>
.lazy {
    padding-bottom: 170%;
    img {
        transform: translate(-60%, -50%) scale(1.3);
    }
    &.loaded {
        img {
            transform: translate(50%, -50%) scale(1.3);
        }
        &:before {
            left: 100%;
            opacity: 1;
        }
    }
}

.lazy__set {
    padding-bottom: 50%;
    &.loaded {
        img {
            transform: translate(50%, -50%);
        }
        &:before {
            left: 100%;
            opacity: 1;
        }
    }
}

.lazy__bg {
    padding-bottom: 50%;
    img {
        transform: translate(60%, -50%);
    }
    &.loaded {
        img {
            transform: translate(50%, -50%);
        }
        &:before {
            left: -100%;
            opacity: 1;
        }
    }
}

.lazy,
.lazy__set,
.lazy__bg {
    position: relative;
    overflow: hidden;
    img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-60%, -50%) scale(1.1);
        transition: 0.5s ease-in-out;
        opacity: 0;
    }
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: #eef1f6;
        z-index: 99;
        width: 100%;
        height: 100%;
        transition: 0.5s ease-in-out;
    }
}
.lazy {
     &.loaded {
        img {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
        }
    }
}
.lazy__set,
.lazy__bg {
     &.loaded {
        img {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
 }
</style>
