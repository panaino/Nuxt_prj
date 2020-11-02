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
    </table>
  </div>
</template>

<script>

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
</style>