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
            inputData: {
                tagId: this.inputTextInfo.tagId,
                text: this.inputTextInfo.defultValue || ""
            }
        }
    },
    computed: {
        changeTextBox: {
            get() {
                return this.inputData.text
            },
            set(val) {
                this.inputData.text = val
                this.$emit('inputText', this.inputData)
            }
        }
    }
}
</script>