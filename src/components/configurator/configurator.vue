<template>
  <div class="configurator">
    <form @submit.prevent="onSubmit" class="configurator__form">
      <div class="configurator__form-title">Настройте тариф</div>
      <v-form-group class="configurator__form-input" title="Телефон">
        <v-input type="tel" required v-model="formValue.phone" :message="errors.phone" />
      </v-form-group>
      <v-form-group class="configurator__form-input" title="Минуты">
        <v-range v-model="formValue.minutes" :values="minutesValues" />
      </v-form-group>
      <v-form-group class="configurator__form-input" title="СМС">
        <v-range v-model="formValue.sms" :values="smsValues" />
      </v-form-group>
      <v-form-group class="configurator__form-input" title="Интернет">
        <v-range v-model="formValue.internet" :values="internetValues" />
      </v-form-group>
      <v-form-group class="configurator__form-input" title="Wi-Fi роутер">
        <v-checkbox :label="checkBoxLabel" v-model="formValue.router" />
      </v-form-group>
      <v-button><b>{{ finalPrice }}</b>&nbsp;₽ в месяц</v-button>
    </form>
  </div>

</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useTariffStore } from '@store/inventory/tariff';
import type { ITarrifItem } from '@store/inventory/types';
import VRange from '@components/ui/v-range/v-range.vue';
import VCheckbox from '@components/ui/v-checkbox/v-checkbox.vue';
import type { IOption } from '@ui/v-range/types'
import VFormGroup from '@components/ui/v-form-group/v-form-group.vue';
import VInput from '@components/ui/v-input/v-input.vue';
import VButton from '@components/ui/v-button/v-button.vue';
import { isPhoneValid } from '@/helpers/phone';
import type { IMessage } from '@types/message';

const tariffStore = useTariffStore()
const { fetchSettings } = tariffStore
const { tariffSettings } = storeToRefs(tariffStore)

const formValue = reactive({
  phone: '',
  minutes: 600,
  sms: 50,
  internet: 15,
  router: false
})

const errors = reactive<Record<string, IMessage | null>>({
  phone: null
})

const minutesValues = computed<IOption[]>(() => tariffSettings.value?.minutes ? getRangeOptions(tariffSettings.value?.minutes) : [])
const smsValues = computed<IOption[]>(() => tariffSettings.value?.sms ? getRangeOptions(tariffSettings.value?.sms) : [])
const internetValues = computed<IOption[]>(() => tariffSettings.value?.internet ? getRangeOptions(tariffSettings.value?.internet) : [])
const checkBoxLabel = computed(() => 'Аренда <b>' + tariffSettings.value?.router + '</b> ₽/мес.')
const finalPrice = computed(() => {
  let price = 0
  if (tariffSettings.value === null) return
  for (let key in formValue) {
    const tariffKey = key as keyof typeof tariffSettings.value
    if (key === 'router' && formValue[key]) {
      price += tariffSettings.value?.router
    }
    else if (key !== 'router') {
      const items = tariffSettings.value[tariffKey] as ITarrifItem[] | undefined
      price += items?.find(item => item.value === formValue[tariffKey])?.cost ?? 0
    }
  }
  return price
})

const getRangeOptions = (arr: ITarrifItem[]): IOption[] => arr.map(i => ({
  value: i.value,
  title: i.title,
})) || []

const validateForm = () => {
  errors.phone = null

  if (!isPhoneValid(formValue.phone)) {
    errors.phone = {
      text: 'Неверный формат телефона',
      type: 'error'
    }
  }

  return Object.values(errors).every(error => !error);
};

onMounted(() => {
  fetchSettings()
})

const onSubmit = () => {
  if (!validateForm()) return;
  alert(JSON.stringify(formValue))
}
</script>

<style lang="scss" scoped src="./configurator.scss" />