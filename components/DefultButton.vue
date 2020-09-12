<template>
    <button class="btn" @click="$emit('btn-click')">{{ btnText }}</button>
</template>

<script>
export default {
    props:["btnText"],
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