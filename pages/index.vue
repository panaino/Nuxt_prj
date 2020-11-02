<template>
  <div class="container">
    <RegisterModal />
    <Table />
  </div>
</template>

<script>
export default {
  	created () {
		this.$store.dispatch('personalInfo/fetchData')
		this.$store.dispatch('monsterInfo/fetchData')
    this.$store.dispatch('parameterInfo/fetchData')
		this.$store.dispatch('bredMonster/fetchData')
	}
}
</script>

<style>
.container {
  margin: 0 auto;
  max-width: 1100px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
}

</style>
