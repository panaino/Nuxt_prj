<template>
    <div>
        <label :for="inputTextInfo.tagId">{{ inputTextInfo.labelName }}</label>
        <input type="text" :id="inputTextInfo.tagId" :list="inputTextInfo.list" v-model="changeTextBox" :disabled='isDisabled' >
    </div>
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
                tagId: this.inputTextInfo.tagId,
                statusKey: this.inputTextInfo.statusKey || "",
                dataType: this.inputTextInfo.dataType || "",
                valueType: this.inputTextInfo.valueType || "",
                text:""
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