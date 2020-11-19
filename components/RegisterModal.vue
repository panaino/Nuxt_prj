<template>
<div>
	<div class="register_btn_area">
		<PartsDefultButton class="register_btn_show" btnText="入力" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div class="input_area">
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
								<select id="personality" v-model="changePersonality">
									<option value="" selected disabled>選択してください</option>
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
				<div class="annotation">
					※半角数字で入力
					<span class="error_msg" v-show="hasInputError">
						<p>※努力値の値は0~252です</p>
						<p>※個体値の値は0〜31です</p>
					</span>
				</div>
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
							<td 
							:class="{ up: insertData.personality.UP == value.statusKey, down: insertData.personality.DOWN == value.statusKey }">{{ value.labelName }}
							</td>
							<td>
								<!-- 努力値入力欄 -->
								<PartsInputText
								class="input_status"
								:inputTextInfo="value" 
								:isDisabled="isDisabled" 
								:valueText='insertData.status[value.statusKey]["effortValue"].value'
								@inputText="inputText" />
							</td>
							<td>
								<!-- 個体値入力欄 -->
								<PartsInputText
								class="input_status"
								:inputTextInfo='{
									tagIdid:"zeroToV_" + value.id,
									statusKey:value.statusKey,
									dataType: "status",
									valueType: "zeroToV",
								}'
								:isDisabled="isDisabled"
								:valueText='insertData.status[value.statusKey]["zeroToV"].value'
								@inputText="inputText" 
								/>
							</td>
							<td>{{ insertData.status[value.statusKey].tribeValue }}</td>
							<td>
								<p style="padding-top: 1px;">{{ insertData.status[value.statusKey].calcValue }}</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="sum_effort_value">
				努力値合計：{{ sumEffortValue }}
				<p v-if="sumEffortValueError" class="error_msg">努力値の合計が510を超えています</p>
			</div>
			<div class="register_modal_btn_area">
				<PartsDefultButton 
				class="register_modal_btn_register modal_btn" 
				btnText="登録" 
				@btn-click="register" 
				:style="{ opacity: isBtnDisabled ? 0.6 : 1 }"
				:disabled='isBtnDisabled' />
				<PartsDefultButton class="register_modal-btn_close modal_btn" btnText="閉じる" @btn-click="closeModal" />
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
			sumEffortValueError: false,
			inputError: false,
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
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
					},
					A: {
						tribeValue:"0",
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
					},
					B: {
						tribeValue:"0",
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
					},
					C: {
						tribeValue:"0",
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
					},
					D: {
						tribeValue:"0",
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
					},
					S: {
						tribeValue:"0",
						calcValue:"0",
						effortValue:{
							value:"0",
							error:false
						},
						zeroToV:{
							value:"31",
							error:false
						}
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
			this.insertData.name = ''
			this.initData()
		},
		// 子コンポーネントからの入力情報をセットする
		inputText(val) {
			// パラメータ入力
			let key = val.statusKey
			let dataType = val.dataType
			if(dataType == "status"){
				this.insertData.status[key][val.valueType].error = val.inputError
				this.insertData.status[key][val.valueType].value = val.text
				this.calcValue(key)
			} else {
				this.insertData[dataType] = val.text
				// 名前に変更があった場合、入力値を初期化する
				if(dataType == "name") {
					this.initData()
				}
			} 
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
			let effortValue = Number(statusObj.effortValue.value)
			let zeroToV = Number(statusObj.zeroToV.value)
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
		// 入力データ初期化
		initData: function() {
			let data = this.insertData
			data.personality.name = ""
			data.personality.UP = ""
			data.personality.DOWN = ""
			data.ability = ""
			let calcValue = this.calcValue
			let monster = this.$store.getters['monsterInfo/getData'][data.name]
			Object.keys(data.status).forEach(function(key) {
				data.status[key]["effortValue"].value = "0"
				data.status[key]["zeroToV"].value = "31"
				data.status[key]["calcValue"] = "0"
				data.status[key]["tribeValue"] = monster ? monster[key] : "0"
				calcValue(key)
			})
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
			console.log('computed')
			let data = this.insertData
			let result = false
			if(!data.name || !data.ability || !data.personality.name ) {
				result = true
			} else {
				result = !(data.name in this.$store.getters['monsterInfo/getData'])
			}
			return result
		},
		sumEffortValue: function() {
			let stObj = this.insertData.status
			let sum = 0
			Object.keys(stObj).forEach(function(key){
				sum += Number(stObj[key]["effortValue"].value)
			})
			this.sumEffortValueError = sum > 510
			return sum
		},
		isBtnDisabled: function() {
			let btnDisabled = false
			if(this.isDisabled) {
				btnDisabled = true
			} else if(this.inputError) {
				btnDisabled = true
			} else if(this.sumEffortValueError) {
				btnDisabled = true
			}
			return btnDisabled
		},
		hasInputError: function() {
			let stObj = this.insertData.status
			let hasError = false
			let keys = Object.keys(stObj)
			for(var i=0; i < keys.length; i++){
				if(stObj[keys[i]]["effortValue"].error || stObj[keys[i]]["zeroToV"].error) {
					hasError = true
					break;
				}
			}
			this.inputError = hasError
			return hasError
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

/** 入力エリアに関するデザイン */
.input_area {
	height: 70%;
}
.annotation {
	margin-top: 30px;
	text-align: left;
	font-size: small;
}

.sum_effort_value {
	height: 15%;
	margin-top: 10px;
	text-align: left;
	font-size: small;
}

.input_status {
	width: 50px;
	text-align: right;
}

.register_modal_content{
  z-index:2;
  width:350px;
  height: 600px;
  padding: 1em;
  background:#fff;
  border-radius: 5px;
}

/** ボタンエリアに関するデザイン */
.register_modal_btn_area {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}

.register_btn_show {
	width: 6rem;
	height: 2.5rem;
	margin: 5px 0px;

}

.modal_btn {
	height: 2.5rem;
	width: 5rem;
	padding: 0.2em;
}

.register_modal_btn_register {
	margin-right: 40px;
}

.error_msg {
	color: red;
	font-size: small;
}

/** 性格補正を視覚的にわかりやすくするためのデザイン */ 
.up {
	color: red;
}
.down{
	color: blue;
}
</style>