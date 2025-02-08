import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ITariffSettings } from './types';

export const useTariffStore = defineStore('tariff', () => {
  
  let tariffSettings = ref<ITariffSettings | null>(null)

  const defaultSettings: ITariffSettings = {
    minutes:[
      {
        id: 1,
        title: '200',
        value: 200,
        cost: 210
      },
      {
        id: 2,
        title: '350',
        value: 350,
        cost: 340
      },
      {
        id: 3,
        title: '600 мин.',
        value: 600,
        cost: 420
      },
      {
        id: 4,
        title: '650',
        value: 650,
        cost: 460
      },
    ],
    sms:[
      {
        id: 5,
        title: '0',
        value: 0,
        cost: 0
      },
      {
        id: 6,
        title: '50',
        value: 50,
        cost: 80
      },
      {
        id: 7,
        title: '100',
        value: 100,
        cost: 120
      },
      {
        id: 8,
        title: '150',
        value: 150,
        cost: 150
      },
    ],
    internet:[
      {
        id: 9,
        title: '5 ГБ',
        value: 5,
        cost: 120
      },
      {
        id: 10,
        title: '15',
        value: 15,
        cost: 170
      },
      {
        id: 11,
        title: '30',
        value: 30,
        cost: 220
      },
      {
        id: 11,
        title: '35',
        value: 35,
        cost: 270
      },
    ],
    router: 99
  }

  const fetchSettings = () => {
    try{
      const settings = localStorage.getItem('tariffSettings')
      if(settings) {
        tariffSettings.value = JSON.parse(settings)
      }
      else{
        localStorage.setItem('tariffSettings', JSON.stringify(defaultSettings))
        tariffSettings.value = defaultSettings
      }
    }catch(e){
      console.log(e)
    }
  }

  return{
    tariffSettings,
    fetchSettings
  }
});