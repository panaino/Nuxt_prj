<template>
<div>
	<div class="register_btn_area">
		<PartsDefultButton class="register_btn_show" btnText="登録" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<PartsInputText :inputTextInfo="inputTextInfo.item1" @change-text="inputName" />
				<datalist :id="inputTextInfo.item1.list">
					<option v-for="(value, key) in monsterInfo" :key="key">{{ key }}</option>
				</datalist>
				<label for="pesonality">性格
				</label>
				<select id="pesonality" v-model="insertData.pesonality">
					<option value="" selected>選択してください</option>
					<option v-for="(value, key) in personalInfo" :key="key" :value="key">{{ key }}</option>
				</select>
				<PartsInputText :inputTextInfo="inputTextInfo.item2" />
				<PartsInputText v-for="(value, key) in parameterInfo" :key="key" :inputTextInfo="value" />
			</div>
			<div class="register_btn_area">
				<PartsDefultButton class="register_btn_close" btnText="登録" />
				<PartsDefultButton class="register_btn_close" btnText="閉じる" @btn-click="closeModal" />
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	created () {
		this.$store.dispatch('personalInfo/fetchData')
		this.$store.dispatch('monsterInfo/fetchData')
		this.$store.dispatch('parameterInfo/fetchData')
	},
	computed: {
		personalInfo() {
			return this.$store.getters['personalInfo/getData']
		},
		monsterInfo() {
			return this.$store.getters['monsterInfo/getData']
		},
		parameterInfo() {
			return this.$store.getters['parameterInfo/getData']
		}
	},
    data() {
		return {
			visible: false,
			insertData:{
				name:"",
				pesonality:"",
				ability:"",
				H:"",
				A:"",
				B:"",
				C:"",
				D:"",
				S:"",
			},
			inputTextInfo: {
				item1:{"tagId":"name", "text":"名前", "list":"nameList"},
				item2:{"tagId":"ability", "text":"特性"}
			}
		}
	},
	methods: {
		showModal() {
			this.visible = true
		},
		closeModal() {
			this.visible = false
		},
		inputName(text) {
			return this.insertData.name = text
		},
		inputPesonality(text) {
			this.insertData.pesonality = text
		},
		inputAbility(text) {
			return this.insertData.ability = text
		},
		inputH(text) {
			return this.insertData.H = text
		},
		inputA(text) {
			return this.insertData.A = text
		},
		inputB(text) {
			return this.insertData.B = text
		},
		inputC(text) {
			return this.insertData.C = text
		},
		inputD(text) {
			return this.insertData.D = text
		},
		inputS(text) {
			return this.insertData.S = text
		}
	}
}
</script>

<style>
label {
	display: block;
}
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
  border-radius: 5px;
}

/** ボタンエリアに関するデザイン */
.register_btn_area {
	display: flex;
	justify-content: flex-end;
}
/** ボタンに関するデザイン */
.register_btn_show {
	width: 100px;
	padding: 0.8em;
	margin: 10px 10px 0 0;
}

.register_btn_close {
	width: 50px;
	padding: 0.2em;
}
</style>