<template>
  <div :class="wrapperClasses">
    <div class="input-wrapper__input-container">
      <input class="input-wrapper__input" type="tel" v-model="model" :placeholder="computedPlaceholder"
        @input="onInput" />
      <div class="input-wrapper__icon">
        <v-icon size="20" name="warning" />
      </div>
    </div>
    <div v-if="computedMessage" class="input-wrapper__message">
      {{ computedMessage?.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import VIcon from '@ui/v-icon/v-icon.vue';
import { formatPhone } from '@/helpers/phone'
import { type IProps, defaultProps } from './types';
import type {IMessage} from '@/types/message';

const props = withDefaults(defineProps<IProps>(), defaultProps)

const model = defineModel()

const computedMessage = computed<IMessage | null>(() => {
  if (props.message) {
    return props.message
  }

  if (props.required) {
    return {
      type: 'default',
      text: 'Обязательное поле'
    }
  }
  return null
})

const computedPlaceholder = computed(() => {
  if (props.placeholder) {
    return props.placeholder
  }

  if (props.type === 'tel') {
    return '+7 (___) ___-__-__'
  }
  return ''
})

const wrapperClasses = computed(() => ([
  'input-wrapper',
  {
    'input-wrapper--error': computedMessage.value?.type === 'error'
  }
]))

const onInput = (event: Event) => {
  if (props.type === 'tel'){
    const value = (event.target as HTMLInputElement).value
    model.value = formatPhone(value)
  }
};

</script>

<style lang="scss" scoped src="./v-input.scss" />