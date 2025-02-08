<template>
  <v-slider v-bind="attrs" :ticks="ticks" v-model="inputValue" @focusin="isFocused = true"
    @focusout="isFocused = false">
    <template #tick-label="{ tick }">
      <span class="input-range__tick">{{ tick.label }}</span>
    </template>
  </v-slider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { type IProps } from './types'

const props = defineProps<IProps>()

const model = defineModel()

const inputValue = ref()
const isFocused = ref(false)

const ticks = computed<Record<number, string>>(() => {
  return props.values.reduce((acc: Record<number, string>, item, idx) => {
    acc[idx] = item.title
    return acc
  }, {})
})

const classes = computed(() => [
  'input-range',
  {
    'input-range--active': isFocused.value
  }
])

const attrs = computed(() => ({
  class: classes.value,
  min: 0,
  max: props.values.length - 1,
  step: 1,
  trackSize: 10,
  trackColor: "var(--gray-3)",
  trackFillColor: isFocused.value ? "var(--primary)" : "var(--black)",
  thumbSize: 30,
  tickSize: 0,
  showTicks: 'always' as const,
  ripple: false,
}))

watch(inputValue, val => {
  model.value = props.values[val].value
})

onMounted(async () => {
  await nextTick()
  if (model.value !== undefined) {
    inputValue.value = props.values.findIndex(i => i.value === model.value)
  }
  else {
    inputValue.value = props.values[0]
  }
})

</script>

<style lang="scss" scoped src="./v-range.scss" />