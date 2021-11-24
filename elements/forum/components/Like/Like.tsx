import React from 'react';
import { LikeCounter, LikeImage, LikeWrapper } from './Like.styles';
import { useStoreState } from '../../../../context/custom_store';
import Hint from '../../../core/components/Hint/Hint';

const Like = ({ like_count, onClick }: { like_count: number, onClick?: ()=>void}) => {
  const { isAuthenticated } = useStoreState();
  return (
    <LikeWrapper isAuthenticated={isAuthenticated}>
      <Hint hint={isAuthenticated ? 'Find ich toll!' : `${like_count} finden es toll!`}>
        <LikeImage isAuthenticated={isAuthenticated} onClick={() => onClick()} />
      </Hint>
      <LikeCounter>
        {like_count}
      </LikeCounter>
    </LikeWrapper>
  );
};

export default Like;
