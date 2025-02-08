<template>
  <div class="form-group">
    <div class="form-group__title">{{ title }}</div>
    <slot/>
  </div>
</template>

<script setup lang="ts">
import {type IProps} from './types'

defineProps<IProps>()
</script>

<style lang="scss" scoped src="./v-form-group.scss" />