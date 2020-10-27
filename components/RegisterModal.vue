<template>
<div>
	<div class="register_btn_area">
		<PartsDefultButton class="register_btn_show" btnText="登録" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<!-- 名前入力欄 -->
				<PartsInputText :inputTextInfo="inputTextInfo.item1" @inputText="inputText" />
				<datalist :id="inputTextInfo.item1.list">
					<option v-for="(value, key) in this.$store.getters['monsterInfo/getData']" :key="key">{{ key }}</option>
				</datalist>
				<!-- 性格入力欄 -->
				<label for="personality">性格
				</label>
				<select id="personality" v-model="insertData.personality">
					<option value="" selected>選択してください</option>
					<option v-for="(value, key) in this.$store.getters['personalInfo/getData']" :key="key" :value="key">{{ key }}</option>
				</select>
				<!-- 特性入力欄 -->
				<PartsInputText :inputTextInfo="inputTextInfo.item2" @inputText="inputText" />
				<!-- パラーメタ入力欄 -->
				<PartsInputText v-for="(value, key) in this.$store.getters['parameterInfo/getData']" :key="key" :inputTextInfo="value" @inputText="inputText" />
			</div>
			<div class="register_btn_area">
				<PartsDefultButton class="register_btn_close" btnText="登録" @btn-click="register" />
				<PartsDefultButton class="register_btn_close" btnText="閉じる" @btn-click="closeModal" />
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
	created () {
		this.$store.dispatch('personalInfo/fetchData')
		this.$store.dispatch('monsterInfo/fetchData')
		this.$store.dispatch('parameterInfo/fetchData')
	},
    data() {
		return {
			visible: false,
			insertData:{
				name:"",
				personality:"",
				ability:"",
				status:{
					H:"0",
					A:"0",
					B:"0",
					C:"0",
					D:"0",
					S:"0",
				},
				actualValue:{}
			},
			inputTextInfo: {
				item1:{"tagId":"name", "text":"名前", "list":"nameList"},
				item2:{"tagId":"ability", "text":"特性"}
			}
		}
	},
	methods: {
		// モーダル処理
		showModal() {
			this.visible = true
		},
		closeModal() {
			this.visible = false
		},
		// 入力項目
		inputText(val) {
			// パラメータ入力
			if(val.dataType == "status"){
				this.insertData["status"][val.tagId] = val.text
			} else {
				if(val.tagId == 'name') {
					// 選択したポケモンの種族値をセットする
					this.insertData.actualValue = this.$store.getters['monsterInfo/getData'][val.text]
				}
				this.insertData[val.tagId] = val.text
			}
		},
		// 登録処理
		async register() {
			await axios.post('http://localhost:3000/api/insert', this.insertData)
				.then((res) => {
					console.log(res.data)
				})
			alert("登録完了")
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
  /* 要素を重ねた時の順番 */
  z-index:1;

  /* 画面全体を覆う設定 */
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /* 画面の中央に要素を表示させる設定 */
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