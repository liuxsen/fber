<script setup lang="js">
import { ref } from 'vue'

const name = ref('radio')
</script>

<template>
  <label>
    <input type="radio">
    {{ name }}
  </label>
</template>

<style type="less" scoped>
input[type=radio] {
  color: red;
}
</style>
