import React, {useState, useEffect} from 'react';
import {
    RefreshControl,
    Image,
    SafeAreaView,
    View,
    Text,
    Button,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import styles from './styles';
import test1 from './tests/test1';
import test2 from './tests/test2';
import test3 from './tests/test3';
import test4 from './tests/test4';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import RankScreen from './screens/RankScreen';
import RegulationsScreen from './screens/RegulationsScreen';
export const STORAGE_KEY = '@save_status';




function MyDrawer({navigation}) {
    useEffect(() =>{
        SplashScreen.hide();
    },[]);
    return (
        <DrawerContentScrollView>
            <View style={[{alignItems: 'center'}]}>
                <View style={[{flex: 1}]}>
                    <Image source={require('./icons/quiz.png')}
                           style={{height: 100, width: 120, alignSelf: 'center', resizeMode: 'stretch'}}/>
                    <Text style={{marginTop: 30, fontSize: 20,textAlign:'center', fontWeight: 'bold'}}>QUIZ !</Text>
                </View>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('Home');
                }}><Text>Strona Glowna</Text></TouchableOpacity>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('Rank');
                }}><Text>Ranking</Text></TouchableOpacity>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('TEST1', {name: 'TEST1', question: test1[0], qnumber: 0});
                }}><Text>Test1</Text></TouchableOpacity>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('TEST2', {name: 'TEST2', question: test2[0], qnumber: 0});
                }}><Text>Test2</Text></TouchableOpacity>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('TEST3', {name: 'TEST3', question: test3[0], qnumber: 0});
                }}><Text>Test3</Text></TouchableOpacity>
                <TouchableOpacity style={styles.drawerElement} onPress={() => {
                    navigation.navigate('TEST4', {name: 'TEST4', question: test4[0], qnumber: 0});
                }}><Text>Test4</Text></TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='Rules' drawerContent={(props) => <MyDrawer {...props} />}>
                <Drawer.Screen name='Rules' component={RegulationsScreen} options={{title: 'Regulamin'}}/>
                <Drawer.Screen name='Home' component={HomeScreen} options={{title: 'Strona glowna'}}/>
                <Drawer.Screen name='TEST1' component={TestScreen} options={{title: 'Test 1'}}/>
                <Drawer.Screen name='TEST2' component={TestScreen} options={{title: 'Test 2'}}/>
                <Drawer.Screen name='TEST3' component={TestScreen} options={{title: 'Test 3'}}/>
                <Drawer.Screen name='TEST4' component={TestScreen} options={{title: 'Test 4'}}/>
                <Drawer.Screen name='Rank' component={RankScreen} options={{title: 'Ranking'}}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;
