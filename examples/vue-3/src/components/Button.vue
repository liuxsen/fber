<script setup lang="js">
import { computed, ref } from 'vue'

const count = ref(0)
const dubbleCount = computed(() => {
  return count.value * 2
})
function onAdd() {
  count.value++
}
</script>

<template>
  <div>
    <button>buttonaaaa</button>
    <span>{{ count }} - {{ dubbleCount }}</span>
    <div @click="onAdd">
      +
    </div>
  </div>
</template>

<style type="less">
button {
  color: red;
}
</style>
