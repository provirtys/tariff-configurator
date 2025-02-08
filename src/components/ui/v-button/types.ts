export type TColor = 'primary' | 'black'

export interface IProps{
  disabled?: boolean,
  color?: TColor,
}

export const defaultProps = {
  disabled: false,
  color: 'primary' as TColor,
}

export interface IEmits {
  (e: 'click'): void;
}