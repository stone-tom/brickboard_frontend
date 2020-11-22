import React from 'react';
import navigationStore from './NavigationStore/NavigationStore';

const StoreContext = React.createContext({
  navigationStore,
});

export const useNavigationStore = () => React.useContext(StoreContext).navigationStore;

export default StoreContext;
