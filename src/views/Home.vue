<!--
 - @author: Storm
 - @date: 2019-07-09
 - @email: wenyejie@foxmail.com
 -->
<template>
  <div class="home">{{ message }}</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      message: 'Hello Vue!'
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  color: #666;
}
</style>
