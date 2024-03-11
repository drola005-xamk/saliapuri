import { configureStore } from '@reduxjs/toolkit';
import treenitReducer from './treenitSlice';
import kayttajaReducer from './kayttajaSlice';
import liikkeetReducer from './liikkeetSlice';
import treenipohjatReducer from './treenipohjatSlice';

export const store = configureStore({
    reducer : {
        treenit : treenitReducer,
        kayttaja : kayttajaReducer,
        liikkeet : liikkeetReducer,
        treenipohjat : treenipohjatReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;