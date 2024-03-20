<script setup lang="ts">
import { onMounted } from 'vue'
import Button from './components/Button/index'
import Radio from './components/Radio/index'

onMounted(() => {
  fetch('/api/todos/1')
    .then(response => response.json())
    // eslint-disable-next-line
    .then(json => console.log(json))
})
</script>

<template>
  <div />
  <Button />
  <Radio />
</template>
