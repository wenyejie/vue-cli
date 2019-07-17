<!--
 - @author: Storm
 - @date: 2019-07-09
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="demo">{{ message }}</div>
</template>

<script>
export default {
  name: 'Demo',
  data () {
    return {
      message: 'Hello Demo!'
    }
  }
}
</script>

<style lang="scss">
.demo {
  color: #666;
}
</style>
