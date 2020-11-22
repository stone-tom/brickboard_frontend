import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import INavigationItem from '../../../../models/INavigationItem';
import {
  NavigationWrapper,
  OpenArrowButton,
  Logo,
  LogoWrapper,
  OpenArrowIcon,
} from './Navigation.styles';
import NavigationList from '../../components/NavigationList/NavigationList';
import adminNav from '../../../../config/navigation/admin';

interface NavigationProps {
  navigation?: INavigationItem[],
}

const Navigation = observer(({
}: NavigationProps) => {
  const [small, setSmall] = useState<boolean>(false);

  return (
    <NavigationWrapper small={small}>
      <LogoWrapper>
        <Logo src="/assets/icons/brick.svg" small={small} />
      </LogoWrapper>
      <NavigationList navigation={adminNav} small={small} />
      <OpenArrowButton
        small={small}
        onClick={() => setSmall(!small)}
      >
        <OpenArrowIcon
          small={small}
        />
      </OpenArrowButton>
    </NavigationWrapper>
  )
});

export default Navigation;