/* eslint-disable no-shadow */
export enum MessageType {
  error,
  success,
  warning,
}
/* eslint-enable no-shadow */

export default interface IMessage {
  type: MessageType,
  content: string
}
