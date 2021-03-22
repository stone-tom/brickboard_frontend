import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default interface IMapping {
  [key: string]: {
    type: 'text' | 'link' | 'label',
    title?: string,
    icon?: IconProp,
    editable?: boolean,
    format?: ((value: any) => string) | string,
    placeholder?: string,
  }
}
