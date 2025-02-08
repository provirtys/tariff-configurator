export type IMessageType = 'default' | 'error'

export interface IMessage{
  type: IMessageType,
  text: string,
}