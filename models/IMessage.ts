export enum MessageType {
  error,
  success,
  warning
}

export default interface IMessage {
  type: MessageType,
  content: string
}
