<template>
<div>
	<div class="btn_area">
        <button class="btn" @click="showModal">登録</button>
    </div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<label>
					性格
					<select name="" id="">
						<option hidden>選択してください</option>
						<option value="" v-for="item in personalInfo" :key="item.id">{{ item.PESONRALITY }}</option>
					</select>
				</label>
			</div>
			<div>
				<button @click="closeModal">閉じる</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props:['personalInfo'],
    data() {
		return {
			visible: false
		}
	},
	methods: {
		showModal() {
			this.visible = true
		},
		closeModal() {
			this.visible = false
		}
	}
}
</script>

<style>
/** モーダルに関するデザイン */
.register_modal_full{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
}

.register_modal_content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
/** ボタンに関するデザイン */
.btn_area {
    display: flex;
    justify-content: flex-end;
    margin: 10px 10px 0 0;
}

.btn {
	display: block;
	position: relative;
	width: 100px;
	padding: 0.8em;
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