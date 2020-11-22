import { observer } from 'mobx-react-lite';
import React from 'react';
import { ViewWrapper } from '../../../../global.styles';
import { useNavigationStore } from '../../../../stores';
import Navigation from '../Navigation/Navigation';

const Layout = observer(({
  children,
}) => {

  const navigationStore = useNavigationStore();
  return (
    <ViewWrapper>
      <Navigation navigation={navigationStore.navigation} />
      {children}
    </ViewWrapper>
  )
});

export default Layout;