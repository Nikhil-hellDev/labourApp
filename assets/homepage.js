import React from 'react';
import { Text ,StyleSheet, AsyncStorage, Alert } from 'react-native'; 
import { Content, Form } from 'native-base';
import {Button , TextInput,Appbar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {Container ,Card, CardItem, Body ,Header, Left,  Icon ,Title, Right, Separator, View} from 'native-base';
import { postData,postDataa } from './FetchServices';

export default class homepageScreen extends React.Component
{static navigationOptions = {
    title: 'Homepage',
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
displayList:[],
    };
         }

          componentDidMount = async()=>
          {
            let body1=await AsyncStorage.getItem('body');
        let hi = JSON.parse(body1);
       this.setState(hi[0]);
     console.log('labourId',this.state.labourId);
     
const body={
    'labourId':this.state.labourId,
 }
 console.log('before',body.labourId)
const result=await postData('labour/fetchorderdata',body)

this.setState({displayList:result.RESULT})
console.log('displayList',this.state.displayList);

}
yes ()
{
  console.log('displayList',this.state.displayList);

}       

 ifYes =async()=> {
  console.log('displayList',this.state.displayList);

  let body2=await AsyncStorage.getItem('body');
  let hi2 = JSON.parse(body2);
this.setState(hi2[0]);
  console.log(hi2[0]);
  console.log();
const body={
       'labourId':hi2[0].labourId,
       'labourName':hi2[0].labourName,
       'labourPhoneNo':hi2[0].labourPhoneNo,
       'labourAddress':hi2[0].labourAddress,
       'userName':this.state.displayList[0].userName,
    }
    const result1=await postData('labour/addnewrecord',body)
    alert("you except the request");
    const body1={
      'labourId':hi2[0].labourId
    }
   const result2=await postDataa('labour/deleteRecord',body1)
   
      } 
 
   ifNo =async()=> {
    let body3=await AsyncStorage.getItem('body');
    let hi3 = JSON.parse(body3);
  this.setState(hi3[0]);
  const body={
       'labourId':hi3[0].labourId,
    }
   const result1=await postData('labour/deleteRecord',body)
   alert("you not except the request");
 }

 Viewend = (item) =>
 {
  
       return(   
         <>
         <Card style={styles.card1}>  
        <CardItem  style={{alignSelf:'center'}} button >
               <Text style={{ fontSize:hp('3%'), fontWeight:'100'}} >Name : {item.userName}</Text>
           </CardItem > 
           <CardItem style={{alignSelf:'center'}} button >
                <Text style={{ fontSize:hp('3%'), fontWeight:'100'}} >Phone NO : {item.userPhoneNo}</Text>
           </CardItem>
           <CardItem  style={{alignSelf:'center'}}  button >
                <Text style={{ fontSize:hp('3%'), fontWeight:'100'}}  >Address : {item.userAddress}</Text>
           </CardItem>
           </Card>
        
           <CardItem style={{height:hp('5%') ,alignSelf:'center',alignItems:'center', width:wp('50%'),}}>

    <Button style={{height:hp('5%'), backgroundColor:'lightgreen',marginRight:wp('4%')}} onPress={ () => this.ifYes()}>
    <Text  style={{fontSize:hp('3%')}}>YES</Text>
    </Button>

    <Button style={{height:hp('5%'), backgroundColor:'red',marginLeft:wp('4%')}} 
        onPress={ () => this.ifNo()}>
        <Text  style={{fontSize:hp('3%')}}>NO</Text>
    </Button>
</CardItem>


</>    
   )
     }


render()
    {
        return(
            <View style={styles.Container1}>
          <ScrollView style={{alignContent:'center'}}>
                
          {
           
         <FlatList 
          data={this.state.displayList}
          renderItem={({item}) => this.Viewend(item)}
          /> 
        
        }

         </ScrollView>

      </View>
         ) }   
}
const styles= StyleSheet.create({
    Container1:{
      flex:1,
      paddingTop: getStatusBarHeight(),
      height: 54 + getStatusBarHeight()
    },
    card1:{
        borderRadius:7,
        marginTop:hp('3%'),
        marginBottom:('3%'),
        width:wp('80%'),
        alignSelf:'center',                    
        alignItems:'center',
      }
});