<template>
<div>
	<div class="register_btn_area">
		<PartsDefultButton class="register_btn_show" btnText="登録" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<table>
					<tbody>
						<tr>
							<td>名前</td>
							<td>
								<!-- 名前入力欄 -->
								<PartsInputText 
								list="nameList"
								:inputTextInfo='{id:"name", dataType:"name"}'
								:valueText="insertData.name"
								@inputText="inputText" 
								/>
								<datalist id="nameList">
									<option v-for="(value, key) in this.$store.getters['monsterInfo/getData']" :key="key">{{ key }}</option>
								</datalist>
							</td>
						</tr>
						<tr>
							<td>性格</td>
							<td>
								<!-- 性格入力欄 -->
								<select id="personality" v-model="changePersonality" :disabled="isDisabled">
									<option value="" selected>選択してください</option>
									<option v-for="(value, key) in this.$store.getters['personalInfo/getData']" :key="key" :value="key">{{ key }}</option>
								</select>
							</td>
						</tr>
						<tr>
							<td>特性</td>
							<td>
								<!-- 特性入力欄 -->
								<PartsInputText 
								:inputTextInfo='{id:"ability", dataType:"ability"}'
								:valueText="insertData.ability"
								@inputText="inputText" 
								/>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="annotation">※半角数字で入力</div>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>努力値</th>
							<th>個体値</th>
							<th>種族値</th>
							<th>実数値</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(value, key) in this.$store.getters['parameterInfo/getData']" :key="key">
							<td>{{ value.labelName }}</td>
							<td>
								<!-- 努力値入力欄 -->
								<PartsInputText
								class="input_status"
								list="effortValue_list"
								placeholder="0"
								:inputTextInfo="value" 
								:valueText="insertData.status[value.statusKey].effortValue"
								:isDisabled="isDisabled" 
								@inputText="inputText" />
								<datalist id="effortValue_list">
									<option v-for="n of 64" :key="n">{{ n * 4 -4 }}</option>
								</datalist>
							</td>
							<td>
								<!-- 個体値入力欄 -->
								<PartsInputText
								class="input_status"
								list="zeroToV_list"
								placeholder="0"
								:inputTextInfo='{
									tagIdid:"zeroToV_" + value.id,
									statusKey:value.statusKey,
									dataType: "status",
									valueType: "zeroToV",
								}'
								:valueText="insertData.status[value.statusKey].zeroToV"
								:isDisabled="isDisabled"
								@inputText="inputText" 
								/>
								<datalist id="zeroToV_list">
									<option v-for="n of 32" :key="n">{{ n - 1 }}</option>
								</datalist>
							</td>
							<td>{{ insertData.status[value.statusKey].tribeValue }}</td>
							<td>
								<p style="padding-top: 1px;">{{ insertData.status[value.statusKey].calcValue }}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="register_modal_btn_area">
				<PartsDefultButton class="register_modal_btn_register modal_btan" btnText="登録" @btn-click="register" />
				<PartsDefultButton class="register_modal-btn_close modal_btan" btnText="閉じる" @btn-click="closeModal" />
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios'
export default {
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
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
						calcValue:"0"
						},
					A: {
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
						calcValue:"0"
						},
					B: {
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
						calcValue:"0"
						},
					C: {
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
						calcValue:"0"
						},
					D: {
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
						calcValue:"0"
						},
					S: {
						tribeValue:"0",
						effortValue:"",
						zeroToV:"",
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
					let monster = this.$store.getters['monsterInfo/getData'][this.insertData.name]
					Object.keys(statusObj).forEach(function(key) {
						statusObj[key]["effortValue"] = ""
						statusObj[key]["zeroToV"] = ""
						statusObj[key]["calcValue"] = "0"
						statusObj[key]["tribeValue"] = monster ? monster[key] : "0"
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
					this.$store.dispatch('bredMonster/fetchData')
					alert("登録完了")
					this.closeModal()
				})
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

.annotation {
	margin-top: 30px;
	text-align: left;
	font-size: small;
}

.input_status {
	width: 50px;
	text-align: right;
}

.register_modal_content{
  z-index:2;
  width:330px;
  height: 500px;
  padding: 1em;
  background:#fff;
  border-radius: 5px;
}

/** ボタンエリアに関するデザイン */
.register_modal_btn_area {
	display: flex;
	justify-content: center;
	margin-top: 40px;
}

.register_btn_show {
	width: 100px;
	padding: 0.8em;
	margin: 10px 10px 0 0;
}

.modal_btan {
	width: 50px;
	padding: 0.2em;
}

.register_modal_btn_register {
	margin-right: 40px;
}

</style>