export interface ITarrifItem{
  id: number,
  title: string,
  value: number,
  cost: number
}

export interface ITariffSettings{
  minutes: ITarrifItem[],
  sms: ITarrifItem[],
  internet: ITarrifItem[],
  router: number
}