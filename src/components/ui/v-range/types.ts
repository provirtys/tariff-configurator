export interface IOption{
  title: string,
  value: number
}

export interface IProps{
  values: IOption[],
}

export const defaultProps = {
  values: [{
    title: '1',
    value: 1
  },
  {
    title: '10 ГБ',
    value: 10
  }],
}
