import * as SQLite from 'expo-sqlite';

//Luodaan tietokannasta interface jolla kaksi funktiota
interface Tietokanta {
    init : () => void;
    otaYhteys : () => SQLite.SQLiteDatabase;
}

//Avataan tietokanta
const db : SQLite.SQLiteDatabase = SQLite.openDatabase('saliapuri.db');

//Funktiot tietokannan tyhjentämiseen
//db.closeAsync();
//db.deleteAsync();

export const tietokanta : Tietokanta = {
    init : () => {

        //Luodaan treenit taulu
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
              tx.executeSql(`CREATE TABLE IF NOT EXISTS treenit (
                                id TEXT,
                                treenipohja BLOB,
                                tehdytLiikkeet BLOB,
                                aloitusTimestamp INTEGER,
                                lopetusTimestamp INTEGER
                            )`);
            }, 
            (err : SQLite.SQLError) => {
              console.log(err);
            }
        );

        //Luodaan liikkeet taulu
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
              tx.executeSql(`CREATE TABLE IF NOT EXISTS liikkeet (
                                id TEXT PRIMARY KEY,
                                nimi TEXT
                            )`);
            }, 
            (err : SQLite.SQLError) => {
              console.log(err);
            }
        );

        //Luodaan treenipohjat taulu
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
              tx.executeSql(`CREATE TABLE IF NOT EXISTS treenipohjat (
                                id TEXT PRIMARY KEY,
                                nimi TEXT,
                                liikkeet BLOB
                            )`);
            }, 
            (err : SQLite.SQLError) => {
              console.log(err);
            }
        );

        //Luodaan kayttaja taulu, 
        //josta haetaan ensimmäisellä sovelluksen avauskerralla syötetty nimi
        db.transaction(
            (tx : SQLite.SQLTransaction) => {
              tx.executeSql(`CREATE TABLE IF NOT EXISTS kayttaja (
                                nimi TEXT
                            )`);
            }, 
            (err : SQLite.SQLError) => {
              console.log(err);
            }
        );
    },
    otaYhteys : () => db
}

