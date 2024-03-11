import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tietokanta } from '../database/tietokanta';
import * as SQLite from "expo-sqlite";
import { Liike } from './liikkeetSlice';
import { Treenipohja } from './treenipohjatSlice';

//Vakio jolla voidaan kutsua tietokantaa
const db = tietokanta.otaYhteys();

//Funktio treenien hakemiseen
export const haeTreenit = createAsyncThunk("treenit/haeTreenit", async () => {
    
    return new Promise<Treeni[]>(resolve => {
        db.transaction(
            (tx: SQLite.SQLTransaction) => {
                tx.executeSql(`SELECT * FROM treenit ORDER BY aloitusTimestamp DESC`, [],
                    (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {
                        const treenitData = rs.rows._array.map((row) => ({
                            id: row.id,
                            treenipohja : JSON.parse(row.treenipohja),
                            tehdytLiikkeet : JSON.parse(row.tehdytLiikkeet),
                            aloitusTimestamp : row.aloitusTimestamp,
                            lopetusTimestamp : row.lopetusTimestamp
                        }));

                        console.log(treenitData);
                        resolve(treenitData);
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

export const tallennaTreenit = createAsyncThunk("treenit/tallennaTreenit", async (payload, { getState }) => {
    
    const state : any = getState();

    db.transaction(
        (tx : SQLite.SQLTransaction) => {

            //Tyhjätään taulu ettei synny duplikaatteja
            tx.executeSql(`DELETE FROM treenit`, [], () => {});
        
            //Asetetaan treenit tauluun yksitellen
            state.treenit.treenit.forEach((treeni : Treeni) => {
                tx.executeSql(`INSERT INTO treenit (
                                id, 
                                treenipohja, 
                                tehdytLiikkeet, 
                                aloitusTimestamp, 
                                lopetusTimestamp) VALUES (?, ?, ?, ?, ?)`,   [
                                                                                treeni.id,
                                                                                JSON.stringify(treeni.treenipohja),
                                                                                JSON.stringify(treeni.tehdytLiikkeet),
                                                                                treeni.aloitusTimestamp,
                                                                                treeni.lopetusTimestamp
                ], () => {});
            })

        }, 
        (err: SQLite.SQLError) => console.log(err)
    );

});

export interface LiikeToisto {
    id : string,
    maara : number,
    paino : number
}

export interface TehtyLiike {
    liike : Liike,
    toistot : LiikeToisto[]
}

export interface Treeni {
    id : string,
    treenipohja : Treenipohja,
    tehdytLiikkeet : TehtyLiike[],
    aloitusTimestamp : number,
    lopetusTimestamp : number
}

interface State {
    treenit : Treeni[],
    kaynnissaOlevaTreeni : Treeni | null
    treenipohjanValintaDialogi : {
        auki : boolean
    },
    tehtyLiikeDialogi : {
        auki : boolean,
        liike? : Liike
    },
    treenihistoriaTreeniTarkasteluDialogi : {
        auki : boolean,
        treeni : Treeni | null
    }
}

const treenit : Treeni[] = [];

export const treenitSlice = createSlice({
    name : "treenit",
    initialState : {
        treenit : [...treenit],
        kaynnissaOlevaTreeni : null,
        treenipohjanValintaDialogi : {
            auki : false
        },
        tehtyLiikeDialogi : {
            auki : false,
            liike : undefined
        },
        treenihistoriaTreeniTarkasteluDialogi : {
            auki : false,
            treeni : null
        }
    } as State,
    reducers : { 
        asetaKaynnissaOlevaTreeni : (state : State, action : PayloadAction<Treeni | null>) => {
            state.kaynnissaOlevaTreeni = action.payload;
            state.treenipohjanValintaDialogi = { auki : false };
        },
        asetaTreenipohjanValintaDialogiAuki : (state : State, action : PayloadAction<boolean>) => {
            state.treenipohjanValintaDialogi = {
                ...state.treenipohjanValintaDialogi,
                auki : action.payload
            }
        },
        asetaTehtyLiikeDialogiAuki : (state : State, action : PayloadAction<any>) => {
            state.tehtyLiikeDialogi = {
                ...state.tehtyLiikeDialogi,
                auki : action.payload.auki,
                liike : action.payload.liike
            }
        },
        lisaaLiikeToisto : (state : State, action : PayloadAction<LiikeToisto>) => {
           
            if (state.kaynnissaOlevaTreeni) {

                //Etsitään liikkeen indexi jonka dialogi auki
                const TehtyLiikeIndex = state.kaynnissaOlevaTreeni.tehdytLiikkeet.findIndex(
                    (tehtyLiike) => tehtyLiike.liike.id === state.tehtyLiikeDialogi.liike?.id
                );
                
                if (TehtyLiikeIndex !== -1) {
                    //Lisätään toistot liikkeeseen
                    state.kaynnissaOlevaTreeni.tehdytLiikkeet[TehtyLiikeIndex].toistot.push(action.payload);
                }

                //Suljetaan dialogi
                state.tehtyLiikeDialogi = {auki : false, liike : undefined};
                  
            }
        },
        poistaLiikeToisto : (state: State, action: PayloadAction<any>) => {
            
            if (state.kaynnissaOlevaTreeni) {
                //Etsitään liikkeen indexi jonka dialogi auki
                const tehtyLiikeIndex = state.kaynnissaOlevaTreeni.tehdytLiikkeet.findIndex(
                    (tehtyLiike) => tehtyLiike.liike.id === action.payload.tehtyliike.liike.id
                );
          
            if (tehtyLiikeIndex !== -1) {
                //Poistetaan toistot liikkeestä
                state.kaynnissaOlevaTreeni.tehdytLiikkeet[tehtyLiikeIndex].toistot = state.kaynnissaOlevaTreeni.tehdytLiikkeet[tehtyLiikeIndex].toistot.filter(
                  (toisto) => toisto.id !== action.payload.liiketoisto.id
                );
            }
              
            }
        },
        lisaaTreeni : (state: State, action: PayloadAction<Treeni>) => {
            
            //Lisätään treenit
            state.treenit = [...state.treenit, action.payload];

            //Järjestetään ne niin että uusin ylimpänä
            state.treenit.sort((a, b) => b.aloitusTimestamp - a.aloitusTimestamp);
            
            state.kaynnissaOlevaTreeni = null;
            

        },
        poistaTreeni : (state: State, action: PayloadAction<Treeni>) => {
            
            //Filtteröidään treenilistasta pois se Treeni jonka id täsmää payloadina saadun treenin id:tä
            state.treenit = [...state.treenit.filter((treeni : Treeni) => treeni.id !== action.payload.id)];

        },
        tarkasteleTreeniaHistoriasta : (state: State, action: PayloadAction<any>) => {
            
            //Avataan dialogi payloadina saadulle treenille
            state.treenihistoriaTreeniTarkasteluDialogi = {
                ...state.treenihistoriaTreeniTarkasteluDialogi,
                auki : action.payload.auki,
                treeni : action.payload.treeni
            }

        },
    },
    extraReducers : (builder : any) => {
        builder.addCase(haeTreenit.fulfilled, (state : State, action : PayloadAction<Treeni[]>) => {
            state.treenit = action.payload;
        }).addCase(tallennaTreenit.fulfilled, (state : State, action : PayloadAction<any>) => {
            console.log("Treenit tallennettu tietokantaan!");
        })
    }
});

export const { asetaKaynnissaOlevaTreeni, asetaTreenipohjanValintaDialogiAuki, lisaaLiikeToisto, asetaTehtyLiikeDialogiAuki, poistaLiikeToisto, lisaaTreeni, tarkasteleTreeniaHistoriasta, poistaTreeni } = treenitSlice.actions;

export default treenitSlice.reducer;