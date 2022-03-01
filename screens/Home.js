import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, ImageBackground,Image} from 'react-native';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <SafeAreaView style={style.safeArea}/>
                <ImageBackground source={require('../assets/bg_image.png')} style={style.bg}> 
                <View style={style.title}>
                    <Text style={style.titleText}>rastreador de meteoros</Text>
                </View>
                <TouchableOpacity style={style.button} onPress={()=>
                this.props.navigation.navigate('IssLocation')}>
                    <Text style={style.buttonText}>Localização da EEI</Text>
                    <Text style={style.knowMore}>{"Saiba Mais --->"} </Text>
                    <Text style={style.bgDigit}>1</Text>
                    <Image source={require("../assets/iss_icon.png")} style={style.iconImage}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={style.button}  onPress={()=>
                this.props.navigation.navigate('Meteors')}>
                    <Text style={style.buttonText}>Meteoros</Text>
                    <Text style={style.knowMore}>{"Saiba Mais --->"} </Text>
                    <Text style={style.bgDigit}>2</Text>
                    <Image source={require("../assets/meteor_icon.png")} style={style.iconImage}></Image>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}
const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    safeArea:{
        marginTop: Platform.OS =="android"? StatusBar.currentHeight:0

    },
    title:{
        flex:0.25,
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontSize:40,
        fontWeight:'bold',
        color:'#fff',
        marginLeft:25
    },
    button:{
        flex:0.25,
        marginLeft:50,
        marginRight:50,
        marginTop:50,
        borderRadius:30,
        backgroundColor:'#fff'
    },
    buttonText:{
        fontSize:35,
        fontWeight:'bold',
        color:'#000',
        marginTop:25,
        paddingLeft:30
    },
    bg:{
        flex:1,
        resizeMode:'cover'
    },
    knowMore:{
        paddingLeft:30,
        color:"red",
        fontSize:15
    },
    bgDigit:{
        position:"absolute",
        color:"rgba(183,183,183,0.5)",
        fontSize:150,
        right:20,
        bottom:-15,
        zIndex:-1
    },
    iconImage:{
        position:"abslute",
        height:200,
        width:200,
        resizeMode:"contain",
        right:20,
        top:-80,
        marginTop:45,
        marginLeft:25
    }
}) 

