import {
  faAlignJustify,
  faQuestion,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TopicType } from '../models/ITopic';

const whichIcon = (type: TopicType): IconProp => {
  switch (type) {
    case TopicType.general:
      return faAlignJustify;
    case TopicType.question:
      return faQuestion;
    case TopicType.announcement:
      return faExclamation;
    default:
      return faAlignJustify;
  }
};

export default whichIcon;
