import React, { ReactNode, useState } from 'react';
import NavigationItem from '../../components/NavigationItem/NavigationItem';
import { NavigationWrapper } from './ProfileNavigation.styles';

interface ProfileNavigationProps {
  contentItems: {
    name: string,
    content: ReactNode,
  }[],
  defaultContent?: number,
  onContentChange: (index: number) => void,
}

const ProfileNavigation = ({
  contentItems,
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
    <NavigationWrapper>
      {contentItems.map((item, index) => (
        <NavigationItem
          name={item.name}
          key={index}
          active={index === active}
          onClick={() => handleActiveChange(index)}
        />
      ))}
    </NavigationWrapper>
  );
};

export default ProfileNavigation;
