import React, { ReactNode, useState } from 'react';
import TabItem from '../../components/TabItem/TabItem';
import { Tabs, Wrapper } from './Tab.styles';

interface ProfileNavigationProps {
  tabs: {
    name: string,
    content: ReactNode,
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

  const handleActiveChange = (index: number) => {
    if (onContentChange) {
      onContentChange(index);
    }
    setActive(index);
  };
  return (
    <Wrapper>
      <Tabs>
        {tabs.map((item, index) => (
          <TabItem
            name={item.name}
            key={index}
            active={index === active}
            onClick={() => handleActiveChange(index)}
          />
        ))}
      </Tabs>
    </Wrapper>
  );
};

export default ProfileNavigation;
