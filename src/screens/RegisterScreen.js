import React,{useState,useLayoutEffect} from 'react'
import { StatusBar } from 'react-native'
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import { Input,Button,Text } from 'react-native-elements'
import firebase, { auth } from '../../firebase'

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"Home"
        })
    }, [navigation])

    const register = () => {
        console.log(email,password)
        auth.createUserWithEmailAndPassword(email,password)
        .then(authuser => {
                
                authuser.user.updateProfile({
                    displayName:name,
                    photoURL:imageUrl || "https://tekrabuilders.com/wp-content/uploads/2018/12/male-placeholder-image.jpeg"
                })
                
        }).catch(error => {
            alert(error.message)
        })
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light'/> 
            <Text h3 style={{marginBottom:50}}>Create a Signal account </Text>
            <View style={styles.inputContainer}>
                <Input
                placeholder="full name"
                autoFocus
                type="text"
                value={name}
                onChange = {(e) => setName(e.target.value)}
                />
                <Input
                placeholder="email"
                autoFocus
                type="text"
                value={email}
                onChangeText = {(text) => setEmail(text)}
                />
                <Input
                placeholder="password"
                autoFocus
                type="text"
                value={password}
                secureTextEntry
                onChangeText = {(text) => setPassword(text)}
                />
                <Input
                placeholder="profile image url (optional)"
                autoFocus
                type="text"
                value={imageUrl}
                onChangeText = {(text) => setImageUrl(text)}
                onSubmitEditing={register}
                />
            </View>
            <Button raised containerStyle={styles.button} title='Register' onPress={register}/>
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white'
        ,
},
button:{
    width:200,
    marginTop:10
},
inputContainer:{
    width:300
}

})
