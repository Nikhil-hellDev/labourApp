import React from 'react';
import { View, Text ,StyleSheet, AsyncStorage, Alert } from 'react-native'; 
import {Button , TextInput,Appbar } from 'react-native-paper';
import { Content, Form } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { postData } from './FetchServices';
import { getStatusBarHeight } from 'react-native-status-bar-height';


export default class LoginScreen extends React.Component
{static navigationOptions = {
  title: 'Login',
  headerStyle: { backgroundColor: '#00B1E1' },
  headerTitleStyle: { 
      color: 'white',
  },
paddingTop: getStatusBarHeight(),
height: 54 + getStatusBarHeight(),
}
    constructor(props)
    {super(props);
    this.state = {
      labourPhoneNo: '',
      labourPassword:''
      };
         }    
         
          async next () {
           // console.log("call",this.state)
           const {labourPhoneNo,labourPassword}=this.state;
          let body={
            labourPhoneNo:labourPhoneNo,
             labourPassword:labourPassword
          }
           console.log('1st body',body)
          let result=await postData('labour/checklabourlogin',body)
        //console.log("login result",result.RESULT[0]);
        //console.log(result.RESULT[0].labourId);
        AsyncStorage.setItem("body",JSON.stringify(result.RESULT));
        if(result.RESULT){
          
           console.log(labourPhoneNo);
           //Alert.alert(labourPhoneNo+' ');
           this.props.navigation.navigate('homepage')  
                     }
           else{
             console.log('false');
           Alert.alert('Invalid UID/Password')
           }
         }
             render()
    {
        return(
            <View style={styles.container}>
            <Content>
<ScrollView style={{width:wp('90%'), alignSelf:"center"}}>
<Text style={{alignSelf:'center', marginTop:hp('5%'), color:'blue', fontSize:hp('8%'),borderBottomWidth:0, borderBottomColor:'#fbb615'}}>LOGIN</Text>
<Form style={{marginTop:hp('8%')}}>

<TextInput
        label='User Name'
       value={this.state.labourPhoneNo}
        onChangeText={(labourPhoneNo) => this.setState({ labourPhoneNo })}
      />

      <TextInput style={{marginTop:hp('3%')}}
        label='Password'
        value={this.state.labourPassword}
        onChangeText={(labourPassword) => this.setState({ labourPassword })}
      />
      <Button  style={{marginTop:hp('3%') ,backgroundColor: '#00B1E1'}} mode="contained"  onPress={ ()=>this.next() }>
    Login
  </Button>
  </Form>
  </ScrollView>
  </Content>
</View>
        )
    }
}
const styles = StyleSheet.create(
    {
        container:
        {
            flex:1,
            backgroundColor:'#fff',
         
        }
    });
    