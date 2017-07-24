<template>
    <div>
        <el-tag v-for="(tag, index) in value" @click.native="remove(index)" :key="index" style="margin-right: 2px" :closable="true">{{tag}}</el-tag>
    </div>
</template>
<script>
export default {
    props: ['value'],
    methods: {
        remove(index) {
            var clonedValue = this.value.slice()
            clonedValue.splice(index, 1)
            this.$emit('input', clonedValue)
        }
    },
    data() {
        return {
            editable: this.value
        }
    }
}
</script>
<style>

</style>