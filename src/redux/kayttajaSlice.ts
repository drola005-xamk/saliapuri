import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as SQLite from 'expo-sqlite';
import { tietokanta } from '../database/tietokanta';

const db = tietokanta.otaYhteys();

//Haetaan tiedot kayttaja-taulusta
export const haeKayttaja = createAsyncThunk("kayttajat/haeKayttaja", async () => {
    
    return new Promise<Kayttaja>((resolve, reject) => {
        
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
            tx.executeSql(`SELECT * FROM kayttaja LIMIT 1`, [],
            (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
                    resolve(rs.rows._array[0] as Kayttaja);
                });
            }, 
            (err : SQLite.SQLError) => {
            console.log(err);
            reject(err);
            }
        );

    });

});

//Tallennetaan kayttaja kayttaja-tauluun
export const tallennaKayttaja = createAsyncThunk("kayttajat/tallennaKayttaja", async (payload, { getState }) => {
    
    const state : any = getState();

    db.transaction(
        (tx : SQLite.SQLTransaction) => {
          tx.executeSql(`INSERT INTO kayttaja (nimi) VALUES (?)`,   [
                                                                        state.kayttaja.kayttaja.nimi
                                                                    ],
          (_tx : SQLite.SQLTransaction, rs : SQLite.SQLResultSet) => {
            console.log("Tallennettu tietokantaan!");
          });
        }, 
        (err : SQLite.SQLError) => {
          console.log(err);
        }
      );

});

export interface Kayttaja {
    nimi : string
}

interface State {
    ohjeet : boolean,
    kayttaja : Kayttaja,
    ensimmaisenAvauskerranDialogi : {
        auki : boolean,
        teksti : string
    }
}

const kayttaja : Kayttaja = {
                                nimi : ''
};

export const kayttajaSlice = createSlice({
    name : "kayttaja",
    initialState : {
        ohjeet : false,
        kayttaja : kayttaja,
        ensimmaisenAvauskerranDialogi :  { auki : false, teksti : "" } 
    } as State,
    reducers : {
        asetaKayttajanNimi : (state : State, action : PayloadAction<string>) => {
            
            //Asetetaan käyttäjän nimi
            state.kayttaja = { nimi : action.payload };

            //Suljetaan dialogi
            state.ensimmaisenAvauskerranDialogi = { auki : false, teksti : ""};

        },
        asetaOhjeetAuki : (state : State, action : PayloadAction<boolean>) => {

            //Asetetaan ohjeet auki tai kiinni
            state.ohjeet = action.payload;

        }
    },
    extraReducers : (builder : any) => {
        builder.addCase(haeKayttaja.fulfilled, (state : State, action : PayloadAction<Kayttaja>) => {
            
            state.kayttaja = action.payload;

            //Jos käyttäjän nimeä ei ole vielä tallennettu tietokantaan...
            if (!Boolean(state.kayttaja?.nimi)) {

                //Kyseessä on ensimmäinen avauskerta, joten näytetään dialogi
                state.ensimmaisenAvauskerranDialogi = { auki : true, teksti : ""};

            } else {

                //Kyseessä ei ole ensimmäinen avauskerta, joten ei näytetä dialogia
                state.ensimmaisenAvauskerranDialogi = { auki : false, teksti : ""};

            }

        }).addCase(tallennaKayttaja.fulfilled, (state : State, action : PayloadAction<any>) => {

            console.log("Tallennettu!");

        })
    }
});

export const { asetaKayttajanNimi, asetaOhjeetAuki } = kayttajaSlice.actions;

export default kayttajaSlice.reducer;