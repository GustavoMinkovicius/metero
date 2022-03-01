import axios from 'axios';
import React, { Component } from 'react';
import { Text, View, StyleSheet,ImageBackground,StatusBar,SafeAreaView, Alert,Image, FlatList, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps'

export default class MeteorScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            meteoros:{}
        }
    }
    componentDidMount(){
        this.getMeteoros()
    }
    
    getMeteoros=()=>{
        axios
        .get('https://api.nasa.gov/neo/rest/v1/feed?api_key=Ef9qqcOHKrAN3MbCdmydsm7rpfUknMzMRC5bcTeg')
        .then(response=>{
            this.setState({
                meteoros:response.data.near_earth_objects
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })

    }
    keyExtractor=(item, index)=> index.toString();
    
    renderItem=({item})=>{
        let meteoro = item
        let bg,speed,size
        
        if(meteoro.ameaca<=30){
            bg = require('../assets/meteor_bg1.png');
            speed =require('../assets/meteor_speed1.gif');
            size = 100
        }else if(meteoro.ameaca<=75){
            bg = require('../assets/meteor_bg2.png');
            speed =require('../assets/meteor_speed2.gif');
            size = 150
        }else {
            bg = require('../assets/meteor_bg3.png');
            speed =require('../assets/meteor_speed3.gif');
            size = 200
        }
        return(
            <View>
                <ImageBackground source={bg} style={style.bg}>
                    <View style={style.gifContainer}>
                        <Image source={speed} style={{width:size,height:size,alignSelf:'center'}}/>
                        <View>
                            <Text style={[style.cardTitle,{marginTop:400,marginLeft:50}]}> {item.name} </Text>
                            <Text style={[style.cardText,{marginTop:20,marginLeft:50}]}> Mais proximo da terra:{item.close_approach_data[0].close_approach_date_full} </Text>
                            <Text style={[style.cardText,{marginTop:5,marginLeft:50}]}>  Diametro minimo(Km):{item.estimated_diameter.kilometers.estimated_diameter_min} </Text>
                            <Text style={[style.cardText,{marginTop:5,marginLeft:50}]}>  Diametro maximo(Km):{item.estimated_diameter.kilometers.estimated_diameter_max} </Text>
                            <Text style={[style.cardText,{marginTop:5,marginLeft:50}]}>  Velocidade(Km/H):{item.close_approach_data[0].miss_distance.kilometers_per_hour} </Text>
                            <Text style={[style.cardText,{marginTop:5,marginLeft:50}]}>  Distancia da terra(Km):{item.close_approach_data[0].miss_distance.kilometers} </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render() {
        if(Object.keys(this.state.meteoros).length===0){
            return(
                <View style={style.container}>
                    <Text> Carregando...</Text>
                </View>
            )
        }else{
            let meteorsLista = Object.keys(this.state.meteoros).map(meteoro=>{
                return(
                    this.state.meteoros[meteoro]
                )
            })
            let meteoros  = [].concat.apply([],meteorsLista)
            meteoros.forEach(element => {
                let diametro = (element.estimated_diameter.kilometers.estimated_diameter_min+element.estimated_diameter.kilometers.estimated_diameter_max)/2
                let ameaca = (diametro/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                element.ameaca=ameaca
            });
            console.log(meteoros)
            meteoros.sort(function(a,b){
                return(
                    b.ameaca-a.ameaca
                )
            })
            meteoros=meteoros.slice(0,5)
            return (
                <View style={style.container}>
                    <SafeAreaView style={style.safeArea}/>
                    <FlatList keyExtractor={this.keyExtractor} data={meteoros} renderItem={this.renderItem} horizontal={true}/>
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
        resizeMode:'cover',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
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
    gifContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    cardTitle:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold',
        color:'#fff'
    },
    cardText:{
        color:'#fff'
    }
}) 

