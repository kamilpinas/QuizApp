import React, {Component, useEffect} from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import styles from './styles';

import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import RankScreen from './screens/RankScreen';
import RegulationsScreen from './screens/RegulationsScreen';
export const STORAGE_KEY = '@save_status';


function MyDrawer({navigation}) {
    const [testsData,setTestsData]=React.useState([]);
    useEffect(() => {
        fetch('http://tgryl.pl/quiz/' + 'tests')
            .then((response) => response.json())
            .then((json) => setTestsData(json))
            .catch((error) => console.error(error));
        return () => {
        };
    }, []);

    const getQuizContent= async(id) =>{
        return await fetch('http://tgryl.pl/quiz/' + 'test/' + id)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error));
    }

    const goQuiz=async(navigation, item) => {
        playerScore = 0;
        const quizContent = await getQuizContent(item.id);
        navigation.navigate(item.id, {
            id: item.id,
            quizContent: quizContent,
            qnumber: 0,
            lastquestion: item.numberOfTasks,
        });

    }
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
                {
                    testsData.map((el) => (
                        <TouchableOpacity style={styles.drawerElement} onPress={() => {
                            goQuiz(navigation, el)
                        }
                        }><Text>{el.name}</Text></TouchableOpacity>
                    ))
                }
            </View>
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testsData: [],
        };
    }
    componentDidMount() {
        fetch('http://tgryl.pl/quiz/' + 'tests')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log('json' + json);
                this.setState({testsData: json});
            })
            .catch((error) => {
                console.log(error);
            });
        SplashScreen.hide();
    }

    render() {
        const testsData = this.state.testsData;
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Rules' drawerContent={(props) => <MyDrawer {...props} />}>
                    <Drawer.Screen name='Rules' component={RegulationsScreen} options={{title: 'Regulamin'}}/>
                    <Drawer.Screen name='Home' component={HomeScreen} options={{title: 'Strona glowna'}}/>
                    <Drawer.Screen name='Rank' component={RankScreen} options={{title: 'Ranking'}}/>
                    {
                        testsData.map(el => (
                            <Drawer.Screen name={el.id} component={TestScreen}/>
                        ))
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
export default App;
