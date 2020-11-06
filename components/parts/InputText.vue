<template>
    <input type="text" :class="{ error: childInputData.inputError }" :id="inputTextInfo.id" v-model="changeTextBox" :disabled='isDisabled' >
</template>

<script>
export default {
    props:{
        inputTextInfo:Object,
        isDisabled:Boolean,
        valueText:String,
        },
    data() {
        return {
            childInputData: {
                text:"",
                dataType: this.inputTextInfo.dataType || "",
                statusKey: this.inputTextInfo.statusKey || "",
                valueType: this.inputTextInfo.valueType || "",
                inputError: false
            }
        }
    },
    computed: {
        changeTextBox: {
            get() {
                return this.valueText
            },
            set(val) {
                if(this.childInputData.dataType == "status") {
                    this.childInputData.inputError = this.checkInputNumber(val)
                }
                this.childInputData.text = val
                this.$emit('inputText', this.childInputData)
            }
        }
    },
    methods: {
        /**
         * 努力値 or 個体値の入力値チェックをおこなう
         * {String} num 入力値
         * return true: 入力値エラーあり false: 入力値エラーなし
         */
        checkInputNumber(num) {
            // 半角数字であること
            if(!(/^[0-9]+$/.test(num))) {
                return true
            }
            // 自然数であること
            if(/^0.+/.test(num)) {
                return true
            }
            if(this.childInputData.valueType == "effortValue") {
                return !(num <= 252)
            }else {
                return !(num <= 31)
            }
        }
    }
}
</script>

<style>
.error {
	background-color: #f7c6c3;
}
</style>