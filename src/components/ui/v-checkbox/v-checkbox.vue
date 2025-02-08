<template>
  <label class="checkbox" for="checkbox">
    <input class="checkbox__input" type="checkbox" v-model="model" :checked="model" id="checkbox">
    <span class="checkbox__check">
      <v-icon size="24" name="check"/>
    </span>
    <div v-if="label" class="checkbox__label" v-html="label"></div>
  </label>
</template>

<script setup lang="ts">
import VIcon from '@ui/v-icon/v-icon.vue';
import { type IProps, defaultProps } from './types'

withDefaults(defineProps<IProps>(), defaultProps)

const model = defineModel('modelValue', {
  default: true
})
</script>

<style lang="scss" scoped src="./v-checkbox.scss" />