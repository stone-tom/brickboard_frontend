import React, { ReactNode, useState } from 'react';
import { useStoreState } from '../../../../context/custom_store';
import TabItem from '../../components/TabItem/TabItem';
import { Tabs, Wrapper } from './Tab.styles';

interface ProfileNavigationProps {
  tabs: {
    name: string,
    content: ReactNode,
    needsAuth?: string,
  }[],
  defaultContent?: number,
  onContentChange: (index: number) => void,
}

const ProfileNavigation = ({
  tabs,
  defaultContent = 0,
  onContentChange,
}: ProfileNavigationProps) => {
  const [active, setActive] = useState<number>(defaultContent);
  const { user } = useStoreState();

  const handleActiveChange = (index: number) => {
    if (onContentChange) {
      onContentChange(index);
    }
    setActive(index);
  };
  return (
    <Wrapper>
      <Tabs>
        {tabs.map((item, index) => {
          if ((user && item.needsAuth && item.needsAuth === user.id)
            || !item.needsAuth) {
            return (
              <TabItem
                name={item.name}
                key={index}
                active={index === active}
                onClick={() => handleActiveChange(index)}
              />
            );
          }
          return null;
        })}
      </Tabs>
    </Wrapper>
  );
};

export default ProfileNavigation;
