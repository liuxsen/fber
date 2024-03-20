<script setup lang="ts">
export interface Props {
  type: string
}

const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['click'])
function onClick(e) {
  emits('click', e)
}
</script>

<template>
  <div>
    <button :class="[props.type]" @click="onClick">
      button
    </button>
  </div>
</template>

<style type="less" scoped>
button {
  color: red;
}
</style>
