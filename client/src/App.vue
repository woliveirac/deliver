<template>
  <BillsToPay />
</template>

<script>
import BillsToPay from "./components/BillsToPay.vue";

export default {
  name: "App",
  components: {
    BillsToPay
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
