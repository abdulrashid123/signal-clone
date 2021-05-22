import React,{useLayoutEffect, useState,useEffect} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import CutomListItem from '../components/CutomListItem'
import { auth, db} from '../../firebase'
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons'; 
const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        })
        return unsubscribe
    }, [])
    
    const signOutUser = () => {
        auth.signOut().then(() => navigation.replace('Login'))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:() => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                    <Avatar rounded source={{uri : auth?.currentUser?.photoURL}}/>
                    </TouchableOpacity>
                </View>
            ),
            title:'Signal',
            headerStyle :{backgroundColor:'#fff'},
            headerTitleStyle: {color:"black"},
            headerTintColor:"black",
            headerRight: () => (
                <View style={{marginRight:20 ,flexDirection:'row',justifyContent:'space-between',width:80}}>
                    <TouchableOpacity activeOpacity={0.5}>
                         <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                         <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id,chatName) => {
        navigation.navigate('Chat',{id,chatName})
    }
    return (
        <SafeAreaView>
            <ScrollView>
                
                {
                    chats?.map(({id,data:{chatName}}) => (
                        // {console.log(id,chatName)}
                        <CutomListItem id={id} chatName={chatName} enterChat={enterChat} />
                    ))  
                }
           
            </ScrollView>
            <View style={{height:100}}></View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
