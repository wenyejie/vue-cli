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
  },
  methods: {
    async getList () {
      const response = await this.getDataList()
    }
  },
  created () {
    const data = Object.assign({}, {name: 'Storm'}, {name: 'wenyejie'})
    this.message = data.name
    this.getList()
  }
}
</script>

<style lang="scss">
.demo {
  color: #666;
  background: linear-gradient(to bottom, #ffe500 0%, #ffe500 50%, #121 50%, #121 100%);
}
</style>
