import React,{useState,useEffect} from 'react'
import { View, Text,StatusBar,StyleSheet,KeyboardAvoidingView} from 'react-native'
import { Button,Input,Image } from 'react-native-elements'
import { auth} from '../../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {
        // auth.signOut()
        auth.onAuthStateChanged((authUser) => {
            console.log("Here",authUser)
            if(authUser){
                navigation.replace('Home')}
        })
        // return unsubscribe()
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).catch(error => alert(errormessage))
    }
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light"/>
            <Image
            source={require('../../assets/1200px-Signal-Logo.svg.png')}
            style={{width:200,height:200}}
            />
            <View style={styles.inputContainer}>
                <Input
                placeholder="Email"
                autoFocus
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
                />
                <Input
                placeholder="Password"
                type="password"
                secureTextEntry
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
                onSubmitEditing={signIn}
                />
            </View>
            <Button
            containerStyle={styles.button} 
            title="Login"
            onPress={signIn}
            />
            <Button 
            containerStyle={styles.button} 
            type="outline"
            title="Signup"
            onPress={() => navigation.navigate('Register')}
            />
            <View style={{height:100}}></View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})

export default LoginScreen
