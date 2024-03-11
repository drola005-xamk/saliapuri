import { Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { View } from "react-native";
import { asetaTreenipohjienMuokkaustila } from "../../redux/treenipohjatSlice";
import { asetaLiikkeidenMuokkaustila } from "../../redux/liikkeetSlice";

const TreenipohjatKortti : React.FC = () : React.ReactElement => {

    const treenipohjat = useSelector((state : RootState) => state.treenipohjat);
    const dispatch : AppDispatch = useDispatch();

    return (
        <Card style={{flex : 1, marginLeft : 10, height : 100}}>
            <Card.Content>
                
                <View style={{alignItems : "center"}}>

                    <Text variant="titleMedium">
                        Treenipohjia: {(treenipohjat.treenipohjat?.length > 0) ? treenipohjat.treenipohjat.length : 0}
                    </Text>   

                    <IconButton 
                        mode='contained' 
                        icon={(treenipohjat.treenipohjienMuokkaustila) ? 'close' : 'pencil'} 
                        onPress={() => {
                            dispatch(asetaTreenipohjienMuokkaustila(!(treenipohjat.treenipohjienMuokkaustila)));
                            dispatch(asetaLiikkeidenMuokkaustila(false));
                        }}
                    />

                </View>
                
            </Card.Content>
        </Card>
    );
    
}

export default TreenipohjatKortti;