import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,StatusBar,SafeAreaView, Alert,Image } from 'react-native';
import MapView, {Marker} from 'react-native-maps'


export default class IssLocationScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            location:{}
        }
    }
    componentDidMount(){
        this.getLocation()
    }
    
    getLocation=()=>{
        axios
        .get('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response=>{
            this.setState({
                location:response.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })

    }

    render() {
        if(Object.keys(this.state.location).length===0){
            return(
                <View style={style.container}>
                    <Text> Carregando...</Text>
                </View>
            )
        }else{
            return (
                <View style={style.container}>
                    <SafeAreaView style={style.safeArea}/>
                    <ImageBackground source={require('../assets/iss_bg.jpg')} style={style.bg}> 
                        <View style={style.title}>
                            <Text style={style.titleText}>Localização da EEI</Text>
                        </View>       
                        <View syle={style.mapContainer}>
                            <MapView style={style.map} region={{
                                latitude:this.state.location.latitude,
                                longitude:this.state.location.longitude,
                                latitudeDelta:100,
                                longitudeDelta:100
                            }}> 
                                <Marker coordinate={{
                                    latitude:this.state.location.latitude,
                                    longitude:this.state.location.longitude
                                }}>
                                    <Image source={require('../assets/iss_icon.png')} style={style.iconMap}/>
                                </Marker>
                            </MapView>
                        </View>
                    </ImageBackground>
                </View>
            )
        }

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
    },
    mapContainer:{
        flex:0.6,

    },
    map:{
        width:'100%',
        height:'100%',
        
    },
    iconMap:{
        width:50,
        height:50
    }
}) 

