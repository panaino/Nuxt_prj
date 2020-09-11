<template>
    <button class="btn" @click="btnClick">{{ btnText }}</button>
</template>

<script>
export default {
    props:["btnText"],
    methods: {
        btnClick() {
            this.$emit('btnClick')
        }
    }
}
</script>

<style>
/** ボタンに関するデザイン */
.btn {
	display: block;
	position: relative;
	text-align: center;
	text-decoration: none;
	color: #fff;
	background: #7c9ad1;-radius: 4px;
}
.btn:hover {
	 cursor: pointer;
	 text-decoration: none;
	background:#6989c4;
}

</style>