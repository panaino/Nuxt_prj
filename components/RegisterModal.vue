<template>
<div>
	<div class="register_btn_area">
		<PartsDefultButton class="register_btn_show" btnText="登録" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<!-- 名前入力欄 -->
				<PartsInputText 
				:inputTextInfo='{tagId:"name", labelName:"名前", dataType:"name", list:"nameList"}'
				:valueText="insertData.name"
				@inputText="inputText" 
				/>
				<datalist id="nameList">
					<option v-for="(value, key) in this.$store.getters['monsterInfo/getData']" :key="key">{{ key }}</option>
				</datalist>
				<!-- 性格入力欄 -->
				<label for="personality">性格
				</label>
				<select id="personality" v-model="changePersonality" :disabled="isDisabled">
					<option value="" selected>選択してください</option>
					<option v-for="(value, key) in this.$store.getters['personalInfo/getData']" :key="key" :value="key">{{ key }}</option>
				</select>
				<!-- 特性入力欄 -->
				<PartsInputText 
				:inputTextInfo='{tagId:"ability", labelName:"特性", dataType:"ability"}'
				:valueText="insertData.ability"
				@inputText="inputText" 
				/>
				<!-- 努力値・個体値入力欄 -->
				<div class="register_param_area">
					<div class="register_param_item" v-for="(value, key) in this.$store.getters['parameterInfo/getData']" :key="key">
						<!-- 努力値入力欄 -->
						<PartsInputText 
						:inputTextInfo="value" 
						:valueText="insertData.status[value.statusKey].effortValue"
						:isDisabled="isDisabled" 
						@inputText="inputText" />
						<!-- 個体値入力欄 -->
						<PartsInputText
						:inputTextInfo='{
							tagId:"zeroToV_" + value.tagId,
							statusKey:value.statusKey,
							labelName: "個体値",
							dataType: "status",
							valueType: "zeroToV",
						}'
						:valueText="insertData.status[value.statusKey].zeroToV"
						:isDisabled="isDisabled"
						@inputText="inputText" 
						/>
						<div>
							<p>実数値</p>
							<p style="padding-top: 1px;">{{ insertData.status[value.statusKey].calcValue }}</p>
						</div>
					</div>
				</div>
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
				personality:{
					name:"",
					UP:"",
					DOWN:"",
				},
				ability:"",
				status:{
					H: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					A: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					B: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					C: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					D: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					S: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
				},
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
		// 子コンポーネントからの入力情報をセットする
		inputText(val) {
			// パラメータ入力
			let statusObj = this.insertData.status
			let key = val.statusKey
			let dataType = val.dataType
			if(dataType == "status"){
				statusObj[key][val.valueType] = val.text
				this.calcValue(key)
			} else {
				this.insertData[dataType] = val.text
				// 名前に変更があった場合、入力値を初期化する
				if(dataType == "name") {
					this.insertData.personality.name = ""
					this.insertData.personality.UP = ""
					this.insertData.personality.DOWN = ""
					this.insertData.ability = ""
					let calcValue = this.calcValue
					Object.keys(statusObj).forEach(function(key) {
						statusObj[key]["effortValue"] = "0"
						statusObj[key]["zeroToV"] = "0"
						statusObj[key]["calcValue"] = "0"
						calcValue(key)
					})
				}
			} 
		},
		setPersonality(event) {
			this.insertData.personality = event.target.value
		},
		// 登録処理
		async register() {
			await axios.post('http://localhost:3000/api/insert', this.insertData)
				.then((res) => {
					console.log(res.data)
				})
			alert("登録完了")
		},
		// 実数値を計算 key:ステータスキー
		calcValue(key) {
			let statusObj = this.insertData["status"][key]
			let result = 0
			let effortValue = Number(statusObj.effortValue)
			let zeroToV = Number(statusObj.zeroToV)
			let monster = this.$store.getters['monsterInfo/getData'][this.insertData.name]
			let tribeValue = monster ? Number(monster[key]) : 0
			let up = this.insertData.personality.UP == key ? 1.1 : 1.0
			let down = this.insertData.personality.DOWN == key ? 0.9 : 1.0
			// 存在しないモンスターの入力があった場合は計算処理を行わない
			if(!monster) {
				return
			}
			if(key == "H") {
				// (種族値×2+個体値+努力値÷4)×レベル÷100+レベル+10
				result = Math.floor((tribeValue * 2 + zeroToV + effortValue / 4) * 50 / 100 + 50 + 10)
			} else {
				// {(種族値×2+個体値+努力値÷4)×レベル÷100+5}×せいかく補正
				result = Math.floor(((tribeValue * 2 + zeroToV + effortValue / 4) * 50 / 100 +5) * up * down)
			}
			statusObj.calcValue = String(result)
		},
		hello() {
			console.log("hello")
		}
	},
	computed: {
		// 性格入力情報を監視する
        changePersonality: {
            get: function() {
                return this.insertData.personality.name
            },
            set: function(val) {
				this.insertData.personality.name = val
                this.insertData.personality.UP = this.$store.getters['personalInfo/getData'][val]["UP"]
				this.insertData.personality.DOWN = this.$store.getters['personalInfo/getData'][val]["DOWN"]
				// 性格が変更されるたびにステータスを計算し直す
				let calcValue = this.calcValue
				Object.keys(this.insertData.status).forEach(function(key) {
					calcValue(key)
				})
            }
		},
		isDisabled: function() {
			let name = this.insertData.name
			if(name == "") {
				return true
			} else {
				return !(name in this.$store.getters['monsterInfo/getData'])
			}
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

.register_param_item {
	display: flex;
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

label {
	height: 24px;
}
</style>