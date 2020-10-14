<template>
    <div>
        <label :for="inputTextInfo.tagId">{{ inputTextInfo.text }}</label>
        <input type="text" :id="inputTextInfo.tagId" :list="inputTextInfo.list" v-model="changeTextBox">
    </div>
</template>

<script>
export default {
    props:['inputTextInfo'],
    data() {
        return {
            childInputData: {
                tagId: this.inputTextInfo.tagId,
                dataType: this.inputTextInfo.dataType || "",
                text: this.inputTextInfo.defultValue || ""
            }
        }
    },
    computed: {
        changeTextBox: {
            get() {
                return this.childInputData.text
            },
            set(val) {
                this.childInputData.text = val
                this.$emit('inputText', this.childInputData)
            }
        }
    }
}
</script>