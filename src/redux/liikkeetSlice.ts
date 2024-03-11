import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tietokanta } from '../database/tietokanta';
import * as SQLite from "expo-sqlite";

//Vakio jolla voidaan kutsua tietokantaa
const db = tietokanta.otaYhteys();

//Funktio liikkeiden hakemiseen
export const haeLiikkeet = createAsyncThunk("liikkeet/haeLiikkeet", async () => {

    return new Promise<Liike[]>(resolve => {
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
                tx.executeSql(`SELECT * FROM liikkeet`, [],
                    (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
                        const liikkeet: Liike[] = rs.rows._array;
                        console.log(liikkeet);
                        resolve(liikkeet);
                    }
                );
            },
            (err : SQLite.SQLError) => {
                console.log(err);
                resolve([]);
            }
        );
    });

});

//Funktio liikkeiden tallentamiseen
export const tallennaLiikkeet = createAsyncThunk("liikkeet/tallennaLiikkeet", async (payload, { getState }) => {
    
    const state : any = getState();

    db.transaction(
        (tx : SQLite.SQLTransaction) => {
            
            //Tyhjätään taulu ettei synny duplikaatteja
            tx.executeSql(`DELETE FROM liikkeet`, [], () => {});
            
            //Insertataan liikkeet yksitellen takaisin tauluun
            state.liikkeet.liikkeet.forEach((liike : Liike) => {
                tx.executeSql(`INSERT INTO liikkeet (id, nimi) VALUES (?, ?)`,   [
                    liike.id,
                    liike.nimi
                ], () => {});
            })

        }, 
        (err: SQLite.SQLError) => console.log(err)
    );

});


export interface Liike {
    id : string,
    nimi : string
}

interface State {
    liikkeet : Liike[],
    liikkeidenMuokkaustila : boolean
}

const liikkeet : Liike[] = [];

export const liikkeetSlice = createSlice({
    name : "liikkeet",
    initialState : {
        liikkeet : [...liikkeet],
        liikkeidenMuokkaustila : false
    } as State,
    reducers : { 
        asetaLiikkeidenMuokkaustila : (state : State, action : PayloadAction<boolean>) => {
            state.liikkeidenMuokkaustila = action.payload;
        },
        lisaaLiike : (state : State, action : PayloadAction<Liike>) => {
            state.liikkeet = [...state.liikkeet, action.payload];
        },
        poistaLiike : (state : State, action : PayloadAction<Liike>) => {

            //Asetetaan liikkeisiin lista, josta filtteröity pois payloadina saatua id:tä vastaava liike
            state.liikkeet = [...state.liikkeet.filter((liike : Liike) => liike.id !== action.payload.id)];

        }
    },
    extraReducers : (builder : any) => {
        builder.addCase(haeLiikkeet.fulfilled, (state : State, action : PayloadAction<Liike[]>) => {
            state.liikkeet = action.payload;
        }).addCase(tallennaLiikkeet.fulfilled, (state : State, action : PayloadAction<any>) => {
            console.log("Liikkeet tallennettu tietokantaan!");
        })
    }
});

export const { asetaLiikkeidenMuokkaustila, lisaaLiike, poistaLiike } = liikkeetSlice.actions;

export default liikkeetSlice.reducer;