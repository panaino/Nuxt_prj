<template>
    <input type="text" :id="inputTextInfo.id" :list="inputTextInfo.list" v-model="changeTextBox" :disabled='isDisabled' >
</template>

<script>
export default {
    props:{
        inputTextInfo:Object,
        isDisabled:Boolean,
        valueText:String
        },
    data() {
        return {
            childInputData: {
                text:"",
                dataType: this.inputTextInfo.dataType || "",
                statusKey: this.inputTextInfo.statusKey || "",
                valueType: this.inputTextInfo.valueType || ""
            }
        }
    },
    computed: {
        changeTextBox: {
            get() {
                return this.valueText || ""
            },
            set(val) {
                this.childInputData.text = val
                this.$emit('inputText', this.childInputData)
            }
        }
    }
}
</script>