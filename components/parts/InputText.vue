<template>
    <input type="text" :id="inputTextInfo.id" v-model="changeTextBox" :disabled='isDisabled' >
</template>

<script>
export default {
    props:{
        inputTextInfo:Object,
        isDisabled:Boolean,
        valueText:String,
        dataList:String
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
    },
    methods: {
        checkInputNumber(num) {
        if(!(/^[0-9]+$/.test(num))) {
            return true
        } else if (!(num <= 252)) {
            return true
        }
        return false
		}
    }
}
</script>

<style>
.error {
	background-color: #f7c6c3;
}
</style>