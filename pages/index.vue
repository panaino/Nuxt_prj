<template>
  <div class="container">
    <RegisterModal :personalInfo="info" />
    <Table />
  </div>
</template>

<script>
export default {
  data() {
      return {
        info: '',
      }
    },
    async asyncData({ app }) {
      const res = await app.$axios.$get('http://localhost:3000/api/pesonality');
      return { info: res };
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}

</style>
