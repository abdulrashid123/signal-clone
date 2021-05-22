import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem,Avatar } from 'react-native-elements'
import { db } from '../../firebase'

const CutomListItem = ({id,chatName,enterChat}) => {
    const [chatMessages, setChatMessages] = useState([])
    useEffect(() => {
    
        const unsubscribe = db.collection('chats').doc(id).collection('message').orderBy('timestamp','desc').onSnapshot(snapshot => setChatMessages(snapshot.docs.map(doc => doc.data())))

        return unsubscribe

    }, [])
    console.log("CustomeListItem", chatName)
    return (
        <ListItem key={id} onPress={() => enterChat(id,chatName)} key={id} bottomDivider>
            <Avatar
            source={{uri:chatMessages?.[0]?.photoURL ||
                "https://tekrabuilders.com/wp-content/uploads/2018/12/male-placeholder-image.jpeg"}}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                    
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                    {console.log(chatMessages)}
                    {chatMessages?.[0]?.displayName}:{chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CutomListItem

const styles = StyleSheet.create({})
