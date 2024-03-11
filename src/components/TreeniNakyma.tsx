import { View } from 'react-native';
import Ohjeet from './Ohjeet';
import LiikkeetKortti from './treeninakymanKomponentit/LiikkeetKortti';
import TreenipohjatKortti from './treeninakymanKomponentit/TreenipohjatKortti';
import TreeniNakymanOhjeetKortti from './treeninakymanKomponentit/TreeniNakymanOhjeetKortti';
import AloitaTreeniKortti from './treeninakymanKomponentit/AloitaTreeniKortti';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TreenipohjienMuokkausKortti from './treeninakymanKomponentit/TreenipohjienMuokkausKortti';
import LiikkeidenMuokkausKortti from './treeninakymanKomponentit/LiikkeidenMuokkausKortti';
import LiikkeidenJaTreenipohjienLisaysKortti from './treeninakymanKomponentit/LiikkeidenJaTreenipohjienLisaysKortti';
import KaynnissaOlevaTreeniKortti from './treeninakymanKomponentit/KaynnissaOlevaTreeniKortti';

const TreeniNakyma : React.FC = () : React.ReactElement => {
    
    const liikkeet = useSelector((state : RootState) => state.liikkeet);
    const treenipohjat = useSelector((state : RootState) => state.treenipohjat);
    const treenit = useSelector((state : RootState) => state.treenit);

    return (
        
        <View style={{flex : 1}}>

                {(treenit.kaynnissaOlevaTreeni)
                ?   <>
                        <View style={{flex : 1, margin : 5}}>
                            <KaynnissaOlevaTreeniKortti />
                        </View>

                        <View style={{margin : 5}}>
                            <AloitaTreeniKortti />
                        </View>
                    </>
                :   <>
                        <View style={{flexDirection : 'row', margin : 5}}>

                            <LiikkeetKortti />

                            <TreenipohjatKortti />

                        </View>

                        {(liikkeet.liikkeidenMuokkaustila)
                        ?   <>
                            <View style={{flex : 5, margin : 5}}>
                                <LiikkeidenMuokkausKortti />
                            </View>

                            <View style={{margin : 5}}>
                                <LiikkeidenJaTreenipohjienLisaysKortti />
                            </View>
                        </>
                        :   (treenipohjat.treenipohjienMuokkaustila)
                        ?   <>
                                <View style={{flex : 5, margin : 5}}>
                                    <TreenipohjienMuokkausKortti />
                                </View>

                                <View style={{margin : 5}}>
                                    <LiikkeidenJaTreenipohjienLisaysKortti />
                                </View>
                            </>
                        :   <>
                                <View style={{flex : 5, margin : 5}}>
                                    <TreeniNakymanOhjeetKortti />
                                </View>

                                <View style={{margin : 5}}>
                                    <AloitaTreeniKortti />
                                </View>
                            </>
                        }
                    </>
                }

                <Ohjeet />
                
        </View>


    );
}

export default TreeniNakyma;