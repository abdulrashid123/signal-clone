import React,{useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign,SimpleLineIcons,FontAwesome,Ionicons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase/app'
import { auth, db } from '../../firebase';



const ChatScreen = ({navigation,route}) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Chat',
            headerTitleAlign:"left",
            headerTitle:() => (
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Avatar rounded source={{uri:"https://tekrabuilders.com/wp-content/uploads/2018/12/male-placeholder-image.jpeg"}}/>
                    <Text style={{color:"white",marginLeft:10,fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:() => (
                <TouchableOpacity style={{marginLeft:10}} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight:() => (
                <View style={{flexDirection:"row", justifyContent:"space-between",width:80,marginRight:20}}>
                <TouchableOpacity >
                    <FontAwesome name="video-camera" size={24} color="white"/>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Ionicons name="call" size={24} color="white"/>
                </TouchableOpacity>
                </View>
            )
        })

    }, [navigation,messages])

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('message').orderBy('timestamp','desc').onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            }))))
        return unsubscribe
    }, [route])

    const sendMessage = () => {
        Keyboard.dismiss()
        console.log({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        db.collection('chats').doc(route.params.id).collection('message').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL
        })
        setInput('')
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            style={styles.container}
            >
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
            <>  
                <ScrollView contentContainerStyle={{paddingTop:15}}>
                    {console.log(messages)}
                    {messages.map( ({id,data}) => (
                        data.email === auth.currentUser.email ? (
                            <View key={id} style={styles.reciever} >
                                <Avatar source={{uri:data.photoURL}} 
                                rounded
                                //Web
                                containerStyle={{position:"absolute",
                                
                                bottom:-15 ,
                                right:-5 }}
                                // andriod
                                position="absolute"
                                bottom={-15}
                                right={-5}
                                size={30} 
                                />
                                <Text style={styles.recieverText}>{data.message}</Text>
                            </View>
                        ) : (<View key={id} style={styles.sender}>
                                <Avatar source={{uri:data.photoURL}} 
                                rounded
                                //Web
                                containerStyle={{position:"absolute",
                                
                                bottom:-15 ,
                                right:-5 }}
                                // andriod
                                position="absolute"
                                bottom={-15}
                                right={-5}
                                size={30} 
                                />
                                <Text style={styles.senderText}>{data.message}</Text>
                                <Text style={styles.senderName}>{data.displayName}</Text>
                        </View>) 
                    ))}
                </ScrollView>
               
                <View style={styles.footer}>
                    <TextInput 
                    placeholder='Signal Message'
                    style={styles.textInput}
                    value={input}
                    onChangeText={(text)=> setInput(text)}
                    onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#2B68E6"/>
                    </TouchableOpacity>
                </View>
            </>
            {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,


    },
    footer:{
        flexDirection:'row',
        alignItems:'center',
        width:'100%',
        padding:15,
        // justifyContent:'space-between'
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"transparent",
        backgroundColor:"#ECECEC",
        borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30
    },
    reciever:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:'flex-end',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"

    },
    sender:{
        padding:15,
        backgroundColor:"#2B68E6",
        alignSelf:'flex-start',
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15,

    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,


    }
})
