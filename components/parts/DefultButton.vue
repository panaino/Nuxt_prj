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
	background: #0099e4;
	font-weight: bold;
	outline: none;	  
}

</style>