<template>
    <div>
        <input type="text" class="el-input__inner" v-model="editableValue">
    </div>
</template>
<script>
export default {
    props: ['value'],
    computed: {
        editableValue: {
            get() {
                return (this.value || []).join(',')
            },
            set(newValue) { this.$emit('input', newValue.split(',')) }
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