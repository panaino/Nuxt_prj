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
				:inputTextInfo='{tagId:"name", text:"名前",dataType:"name", list:"nameList"}'
				@inputText="inputText" 
				/>
				<datalist id="nameList">
					<option v-for="(value, key) in this.$store.getters['monsterInfo/getData']" :key="key">{{ key }}</option>
				</datalist>
				<!-- 性格入力欄 -->
				<label for="personality">性格
				</label>
				<select id="personality" v-model="changePersonality">
					<option value="" selected>選択してください</option>
					<option v-for="(value, key) in this.$store.getters['personalInfo/getData']" :key="key" :value="key">{{ key }}</option>
				</select>
				<!-- 特性入力欄 -->
				<PartsInputText 
				:inputTextInfo='{tagId:"ability", text:"特性"}'
				@inputText="inputText" 
				/>
				<!-- 努力値・個体値入力欄 -->
				<div class="register_param_area">
					<div class="register_param_item" v-for="(value, key) in this.$store.getters['parameterInfo/getData']" :key="key">
						<!-- 努力値入力欄 -->
						<PartsInputText :inputTextInfo="value" :isDisabled="isDisabled" @inputText="inputText" />
						<!-- 個体値入力欄 -->
						<PartsInputText
						:inputTextInfo='{
							tagId:"zeroToV_" + value.tagId,
							statusKey:value.statusKey,
							text: "個体値",
							dataType: "status",
							valueType: "zeroToV",
							defultValue: "0"
						}'
						:isDisabled="isDisabled"
						@inputText="inputText" 
						/>
						<div>
							<p>実数値</p>
							<p>{{ calcValue(value.statusKey) }}</p>
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
						calcValue:"10"
						},
					A: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"0"
						},
					B: {
						effortValue:"0",
						zeroToV:"0",
						calcValue:"5"
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
			if(val.dataType == "status"){
				this.insertData["status"][val.statusKey][val.valueType] = val.text
			} else {
				if(val.dataType == 'name') {
					// 選択したポケモンの種族値をセットする
					this.insertData.monsterInfo = this.$store.getters['monsterInfo/getData'][val.text]
				}
				this.insertData[val.tagId] = val.text
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
		}
	},
	computed: {
		// 性格入力情報を監視する
        changePersonality: {
            get() {
                return this.insertData.personality.name
            },
            set(val) {
				this.insertData.personality.name = val
                this.insertData.personality.UP = this.$store.getters['personalInfo/getData'][val]["UP"]
                this.insertData.personality.DOWN = this.$store.getters['personalInfo/getData'][val]["DOWN"]
				
            }
		},
		calcValue: function() {
			return function(key) {
				return this.insertData.status[key].calcValue
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