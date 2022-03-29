<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  // white-space: nowrap; //不允许文字换行
  flex-wrap: nowrap;
  .left,
  .right {
    flex: 0 0 auto; //不能增长不能压缩
    overflow: hidden;
  }
  .main {
    flex: 1 1 auto; //可以增长可以压缩
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>