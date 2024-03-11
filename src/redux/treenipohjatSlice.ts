import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tietokanta } from '../database/tietokanta';
import * as SQLite from "expo-sqlite";
import { Liike } from './liikkeetSlice';

//Vakio jolla voidaan kutsua tietokantaa
const db = tietokanta.otaYhteys();

//Funktio treenipohjien hakemiseen
export const haeTreenipohjat = createAsyncThunk("treenipohjat/haeTreenipohjat", async () => {

    return new Promise<Treenipohja[]>(resolve => {
        db.transaction(
            (tx: SQLite.SQLTransaction) => {
                tx.executeSql(`SELECT * FROM treenipohjat`, [],
                    (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {
                        const treenipohjatData = rs.rows._array.map((row) => ({
                            id: row.id,
                            nimi: row.nimi,
                            liikkeet: JSON.parse(row.liikkeet),
                        }));

                        console.log(treenipohjatData);
                        resolve(treenipohjatData);
                    }
                );
            },
            (err: SQLite.SQLError) => {
                console.log(err);
                resolve([]);
            }
        );
    });

});

export const tallennaTreenipohjat = createAsyncThunk("treenipohjat/tallennaTreenipohjat", async (payload, { getState }) => {
    
    const state : any = getState();

    db.transaction(
        (tx : SQLite.SQLTransaction) => {

            //Tyhjätään taulu ettei synny duplikaatteja
            tx.executeSql(`DELETE FROM treenipohjat`, [], () => {});
        
            //Asetetaan treenipohjat tauluun yksitellen
            state.treenipohjat.treenipohjat.forEach((treenipohja : Treenipohja) => {
                tx.executeSql(`INSERT INTO treenipohjat (id, nimi, liikkeet) VALUES (?, ?, ?)`,   [
                    treenipohja.id,
                    treenipohja.nimi,
                    JSON.stringify(treenipohja.liikkeet)
                ], () => {});
            })

        }, 
        (err: SQLite.SQLError) => console.log(err)
    );

});

export interface Treenipohja {
    id : string,
    nimi : string,
    liikkeet : Liike[]
}

interface State {
    treenipohjat : Treenipohja[],
    treenipohjienMuokkaustila : boolean,
    treenipohjanLiikkeetDialogi : {
        auki : boolean,
        treenipohja : Treenipohja | null,
        valitutLiikkeet : Liike[]
    }
}

const treenipohjat : Treenipohja[] = [];

export const treenipohjatSlice = createSlice({
    name : "treenipohjat",
    initialState : {
        treenipohjat : [...treenipohjat],
        treenipohjienMuokkaustila : false,
        treenipohjanLiikkeetDialogi : { 
            auki : false,
            treenipohja : null,
            valitutLiikkeet : []
        }
    } as State,
    reducers : { 
        asetaTreenipohjienMuokkaustila : (state : State, action : PayloadAction<boolean>) => {
            state.treenipohjienMuokkaustila = action.payload;
        },
        lisaaTreenipohja : (state : State, action : PayloadAction<Treenipohja>) => {
            state.treenipohjat = [...state.treenipohjat, action.payload];
        },
        poistaTreenipohja : (state : State, action : PayloadAction<Treenipohja>) => {
            state.treenipohjat = [...state.treenipohjat.filter((treenipohja : Treenipohja) => treenipohja.id !== action.payload.id)];
        },
        asetaTreenipohjienLiikkeidenDialogiAuki : (state : State, action : PayloadAction<any>) => {
            state.treenipohjanLiikkeetDialogi = {
                ...state.treenipohjanLiikkeetDialogi, 
                auki : action.payload.auki, 
                treenipohja : action.payload.treenipohja,
                valitutLiikkeet : [...action.payload.valitutLiikkeet]
            }
        },
        valitseLiike : (state : State, action : PayloadAction<Liike>) => {
            
            //Tarkistetaan onko liike jo valittuna
            const existingIndex = state.treenipohjanLiikkeetDialogi.valitutLiikkeet.findIndex(
                (valittuLiike) => valittuLiike.id === action.payload.id
            );
                
            //Jos on valittuna poistetaan se valituista
            if (existingIndex !== -1) {
                state.treenipohjanLiikkeetDialogi.valitutLiikkeet.splice(existingIndex, 1);
            //Jos ei ole lisätään se valittuihin
            } else {
                state.treenipohjanLiikkeetDialogi.valitutLiikkeet.push(action.payload);
            }

        },
        asetaValitutLiikkeetTreenipohjaan : (state : State, action : PayloadAction<boolean>) => {
            
            //Suljetaan dialogi
            state.treenipohjanLiikkeetDialogi = {
                ...state.treenipohjanLiikkeetDialogi,
                auki: action.payload,
            };
            
            
            const treenipohjaId = state.treenipohjanLiikkeetDialogi.treenipohja?.id;
            
            if (treenipohjaId) {

                //Etsitään treenipohja jonka dialogissa oltiin
                const treenipohjaJohonValitutLiikkeet = state.treenipohjat.find((treenipohja) => treenipohja.id === treenipohjaId);
            
                if (treenipohjaJohonValitutLiikkeet) {
                
                    //Asetetaan valitut liikkeet treenipohjaan
                    treenipohjaJohonValitutLiikkeet.liikkeet = state.treenipohjanLiikkeetDialogi.valitutLiikkeet;

                }

            } 
              
        }
    },
    extraReducers : (builder : any) => {
        builder.addCase(haeTreenipohjat.fulfilled, (state : State, action : PayloadAction<Treenipohja[]>) => {
            state.treenipohjat = action.payload;
        }).addCase(tallennaTreenipohjat.fulfilled, (state : State, action : PayloadAction<any>) => {
            console.log("Treenipohjat tallennettu tietokantaan!");
        })
    }
});

export const { asetaTreenipohjienMuokkaustila, lisaaTreenipohja, poistaTreenipohja, asetaTreenipohjienLiikkeidenDialogiAuki, asetaValitutLiikkeetTreenipohjaan, valitseLiike } = treenipohjatSlice.actions;

export default treenipohjatSlice.reducer;