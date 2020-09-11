<template>
  <div>
    <!-- 育成済み一覧テーブル -->
    <table id="table">
      <!-- テーブルヘッダー -->
      <thead>
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
#table {
  width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse; 
}

thead th {
  border-bottom: 2px solid #0099e4; /*#d31c4a */
  color: #0099e4;
}

th {
  padding: 0 8px;
  line-height: 40px;
}
</style>