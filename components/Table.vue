<template>
  <div>
    <!-- 育成済み一覧テーブル -->
    <table class="register_list">
      <!-- テーブルヘッダー -->
      <thead class="register_list_thead">
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>性格</th>
          <th>特性</th>
          <th>HP</th>
          <th>攻撃</th>
          <th>防御</th>
          <th>特攻</th>
          <th>特防</th>
          <th>素早さ</th>
        </tr>
      </thead>
      <!-- テーブルボディ -->
      <tbody>
        <tr v-for="(value, index) in getBredMonster" :key="value.ID">
          <td>{{ index + 1 }}</td>
          <td>{{ value.NAME }}</td>
          <td>{{ value.PERSONALITY }}</td>
          <td>{{ value.ABILITY }}</td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'H', down: value.DOWN == 'H' }">{{ value.calc_H }}</span>
            <p class="effort_value" v-if="value.H > 0">({{ value.H }})</p>
          </td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'A', down: value.DOWN == 'A' }">{{ value.calc_A }}</span>
            <p class="effort_value" v-if="value.A > 0">({{ value.A }})</p>
          </td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'B', down: value.DOWN == 'B' }">{{ value.calc_B }}</span>
            <p class="effort_value" v-if="value.B > 0">({{ value.B }})</p>
          </td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'C', down: value.DOWN == 'C' }">{{ value.calc_C }}</span>
            <p class="effort_value" v-if="value.C > 0">({{ value.C }})</p>
          </td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'D', down: value.DOWN == 'D' }">{{ value.calc_D }}</span>
            <p class="effort_value" v-if="value.D > 0">({{ value.D }})</p>
          </td>
          <td valign="baseline" class="td_status">
            <span :class="{ up: value.UP == 'S', down: value.DOWN == 'S' }">{{ value.calc_S }}</span>
            <p class="effort_value" v-if="value.S > 0">({{ value.S }})</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    getBredMonster: function() {
      return this.$store.getters['bredMonster/getData']
    }
  }
}
</script>

<style>

thead:after, td:after {
	content: "";
	height: 1px;
	width: 100%;
	padding: 2px 0;
	display: block;
}

.register_list {
  width: 1000px;
  margin: 0 auto;
  border-collapse: collapse; 
}

.register_list_thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: #0099e4;
  color: white;
}

.register_list tr {
  height: 40px;
}

.effort_value {
  font-size: xx-small;
}

.td_status {
  padding-top: 5px;
  width: 80px;
}

</style>