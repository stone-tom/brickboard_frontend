import {action} from 'mobx';
import { useObservable, useStaticRendering } from 'mobx-react-lite';
import { createContext, useCallback } from 'react';

const isServer = typeof window === 'undefined';

useStaticRendering(isServer);

let StoreContext=createContext();
let store;

function initializeData(initialData=store || {}){
    const {lastUpdate=Date.now(),toggler}=initialData
    return{
        lastUpdate,
        toggler: Boolean(toggler),
    }
}

function InjectStoreContext({children,initialData}){
    store=useObservable(initializeData(initialData));

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export {InjectStoreContext, StoreContext, initializeData, store}