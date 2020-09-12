<template>
<div>
	<div class="register_btn_area">
		<DefultButton class="register_btn_show" btnText="登録" @btn-click="showModal" />
	</div>
	<div class="register_modal_full" v-show="visible">
		<div class="register_modal_content">
			<div>
				<InputText :inputTextInfo="inputTextInfo.item1" />
				<label for="pesonality">性格
				</label>
				<select id="pesonality">
					<option hidden>選択してください</option>
					<option value="" v-for="item in personalInfo" :key="item.id">{{ item.PESONRALITY }}</option>
				</select>
				<InputText :inputTextInfo="inputTextInfo.item2" />
				<InputText :inputTextInfo="inputTextInfo.item3" />
				<InputText :inputTextInfo="inputTextInfo.item4" />
				<InputText :inputTextInfo="inputTextInfo.item5" />
				<InputText :inputTextInfo="inputTextInfo.item6" />
				<InputText :inputTextInfo="inputTextInfo.item7" />
				<InputText :inputTextInfo="inputTextInfo.item8" />
			</div>
			<div class="register_btn_area">
				<DefultButton class="register_btn_close" btnText="登録" />
				<DefultButton class="register_btn_close" btnText="閉じる" @btn-click="closeModal" />
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
			visible: false,
			inputTextInfo: {
				item1:{"tagId":"name", "text":"名前"},
				item2:{"tagId":"ability", "text":"特性"},
				item3:{"tagId":"statusH", "text":"HP"},
				item4:{"tagId":"statusA", "text":"攻撃"},
				item5:{"tagId":"statusB", "text":"防御"},
				item6:{"tagId":"statusC", "text":"特攻"},
				item7:{"tagId":"statusD", "text":"特防"},
				item8:{"tagId":"statusS", "text":"素早さ"}
			}
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