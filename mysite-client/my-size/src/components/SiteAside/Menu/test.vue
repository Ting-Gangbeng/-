<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
import "@/styles/global.less";
export default {
  components: {
    Menu,
  },
};
</script>

<style >
.test-container {
  width: 300px;
  height: 600px;
  border: 1px solid red;
  background-color: #000;
  margin: 0 auto;
}
</style>