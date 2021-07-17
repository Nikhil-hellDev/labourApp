import React from 'react';
import { View, Text ,Button,StyleSheet, Dimensions } from 'react-native';
import {createAppContainer }from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./assets/login";
import homepageScreen from "./assets/homepage";
import * as Font from 'expo-font';
//import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import {Container} from 'native-base';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
     this.setState({ isLoading: false, });
  }
  render() {
      let {height, width} = Dimensions.get('window');
      console.log(height);
      console.log(width);
    if (this.state.isLoading) {
      return (
        <Container>
          <Text style={{ fontSize: 50, textAlign: 'center' }}>SPLASH SCREEN</Text>
        </Container>
      )
    }
    return (
      <Container>
            <AppContainer/>
      </Container>
    )
  }
}
const AppNavigator = createStackNavigator(
  {
    login:LoginScreen,
    homepage:homepageScreen
  }
);
	const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create(
{
	container:
	{
		flex:1,
		backgroundColor:'#fff',
	}
});
