import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input,Icon,Button } from 'react-native-elements'
import { db } from '../../firebase'



const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Add New Chat',
            headerBackTitle:'charts',

        })

    }, [navigation])

    const createChat = async () => {
        await db.collection('chats').add({chatName:input}).then(() => {
            navigation.goBack()
        }).catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Input 
            placeholder="Enter chat name"
            value={input}
            onChangeText={(text)=> setInput(text)}
            leftIcon={ <Icon name="wechat" type="antdesign" size={24} color="black" /> }
             onSubmitEditing={createChat} 
            
            />
            <Button title="Create a new chat" onPress= {createChat}/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        padding:30,
        height:'100%'
    }
})
