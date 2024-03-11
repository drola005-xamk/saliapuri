import { Card, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { View } from "react-native";
import { asetaLiikkeidenMuokkaustila } from "../../redux/liikkeetSlice";
import { asetaTreenipohjienMuokkaustila } from "../../redux/treenipohjatSlice";

const LiikkeetKortti : React.FC = () : React.ReactElement => {

    const liikkeet = useSelector((state : RootState) => state.liikkeet);
    const dispatch : AppDispatch = useDispatch();

    return (
        <Card style={{flex : 1, height :  100}}>

            <Card.Content>
                <View style={{alignItems : "center"}}>
                    <Text variant="titleMedium">
                        Liikkeitä: {(liikkeet.liikkeet?.length > 0) ? liikkeet.liikkeet?.length : 0}
                    </Text>
                       
                    <IconButton 
                        mode='contained' 
                        icon={(liikkeet.liikkeidenMuokkaustila) ? 'close' : 'pencil'} 
                        onPress={() => {
                            dispatch(asetaLiikkeidenMuokkaustila(!(liikkeet.liikkeidenMuokkaustila)));
                            dispatch(asetaTreenipohjienMuokkaustila(false));
                        }}
                    />
                </View>
            </Card.Content>
            
    </Card>
    );
    
}

export default LiikkeetKortti;