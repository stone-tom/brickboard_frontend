import { faTimes } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { useAuthDispatch, useAuthState } from '../../../../context/auth';
import IMessage, { MessageType } from '../../../../models/IMessage';
import Icon from '../Icon/Icon';
import {
  CloseMessage,
  Message,
  MessageWrapper,
} from './Message.styles';

const MessageComponent = () => {
  const [messageCache, setMessageCache] = useState<IMessage | null>(null);
  const [active, setActive] = useState<boolean>(false);
  const { message } = useAuthState();
  const { removeMessage } = useAuthDispatch();
  const timeout = 400;

  useEffect(() => {
    if (message !== null) {
      setMessageCache(message);
      setActive(true);
    } else {
      setActive(false);
    }
  }, [message]);

  return (
    <>
        <Message
          onClick={() => removeMessage()}
          active={active}
          type={messageCache ? messageCache.type : MessageType.warning}
          timeout={`${timeout}ms`}
        >
          <MessageWrapper>
            <div>{messageCache?.content}</div>
          </MessageWrapper>
          <CloseMessage>
            <Icon icon={faTimes} />
          </CloseMessage>
        </Message>
    </>
  );
};

export default MessageComponent;