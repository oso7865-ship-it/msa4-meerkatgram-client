<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const model = defineModel()
</script>

<template>
  <input
    :type="props.type"
    :readonly="props.readonly"
    :required="props.required"
    :placeholder="props.placeholder"
    v-model="model"
  >
</template>

<style scoped>
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 24px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  display: flex;
  align-items: center;
}
</style>