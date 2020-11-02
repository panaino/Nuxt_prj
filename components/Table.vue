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
          <td>{{ index }}</td>
          <td>{{ value.NAME }}</td>
          <td>{{ value.PERSONALITY }}</td>
          <td>{{ value.ABILITY }}</td>
          <td>{{ value.calc_H }}<p class="effort_value" v-if="value.H > 0">(252)</p></td>
          <td>{{ value.calc_A }}<p class="effort_value" v-if="value.A > 0">(252)</p></td>
          <td>{{ value.calc_B }}<p class="effort_value" v-if="value.B > 0">(252)</p></td>
          <td>{{ value.calc_C }}<p class="effort_value" v-if="value.C > 0">(252)</p></td>
          <td>{{ value.calc_D }}<p class="effort_value" v-if="value.D > 0">(252)</p></td>
          <td>{{ value.calc_S }}<p class="effort_value" v-if="value.S > 0">(252)</p></td>
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

.register_list {
  width: 800px;
  margin: 0 auto;
  border-collapse: collapse; 
}

.register_list_thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}

.register_list th {
  padding: 0 8px;
  line-height: 40px;
}

.effort_value {
  font-size: xx-small;
}
</style>