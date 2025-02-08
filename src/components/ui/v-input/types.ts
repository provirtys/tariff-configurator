import type { IMessage } from '@/types/message';

export type IPropType = 'text' | 'tel'

export interface IProps{
  placeholder?: string,
  type?: IPropType,
  message?: IMessage | null
  required?: boolean
}

export const defaultProps = {
  type: 'text' as IPropType,
  required: false,
}