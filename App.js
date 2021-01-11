import React, {Component, useEffect} from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity, ToastAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView} from '@react-navigation/drawer';
import styles from './styles';

import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import RankScreen from './screens/RankScreen';
import RegulationsScreen from './screens/RegulationsScreen';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

export const STORAGE_KEY = '@save_status';
const _ = require('lodash');

let allTestsDetails = [];
export let allTestsData = [];
let DB;
const getDB = () => DB ? DB : DB = SQLite.openDatabase({name: 'base.db', createFromLocation: 1});
const querysToCreate = ['DROP TABLE IF EXISTS tests;',
    'DROP TABLE IF EXISTS tags;',
    'CREATE TABLE "tests" ( "id" TEXT, "name" TEXT, "description" TEXT, "tags" INTEGER, "level" TEXT, "numberOfTasks" INTEGER, PRIMARY KEY("id"));',
    'CREATE TABLE "tags" ( "tag" TEXT, "id_tag" INTEGER, PRIMARY KEY("tag") )',
    'DROP TABLE IF EXISTS questions;',
    'DROP TABLE IF EXISTS answers;',
    'CREATE TABLE "questions" ( "question" TEXT, "id" TEXT, "duration" INTEGER, PRIMARY KEY("question"));',
    'CREATE TABLE "answers" ( "content" TEXT, "question" TEXT, "isCorrect" TEXT, PRIMARY KEY("content","question"));',
];

class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            net: false,
        };
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                this.setState({net: true});
            } else {
                this.setState({net: false});
            }
        });
    }

    async getQuizOnline(id) {
        return await fetch('http://tgryl.pl/quiz/' + 'test/' + id)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => console.error(error));
    }

    async goToQuizOnline(navigation, item) {
        playerScore = 0;
        const quizContent = await this.getQuizOnline(item.id);
        quizContent.tasks = _.shuffle(quizContent.tasks);
        navigation.navigate(item.id, {
            id: item.id,
            quizContent: quizContent,
            qnumber: 0,
            lastquestion: item.numberOfTasks,
        });
    }

    async getQuizOffline(id) {
        let i = 0;
        while (allTestsDetails[i] != null) {
            if (allTestsDetails[i].id == id) {
                return allTestsDetails[i];
            }
            i++;
        }
    };

    async goToQuizOffline(navigation, item) {
        playerScore = 0;
        const quizContent = await this.getQuizOffline(item.id).catch();
        quizContent.tasks = _.shuffle(quizContent.tasks);
        navigation.navigate(item.id, {
            id: item.id,
            quizContent: quizContent,
            qnumber: 0,
            lastquestion: item.numberOfTasks,
        });
    };


    render() {

        const navigation = this.state.navigation;
        const netStatus = this.state.net;
        allTestsData = _.shuffle(allTestsData);

        return (
            <DrawerContentScrollView>
                <View style={[{alignItems: 'center'}]}>
                    <View style={[{flex: 1}]}>
                        <Image source={require('./icons/quiz.png')}
                               style={{height: 100, width: 120, alignSelf: 'center', resizeMode: 'stretch'}}/>
                        <Text style={{marginTop: 30, fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>QUIZ
                            !</Text>
                    </View>
                    <TouchableOpacity style={styles.drawerElement} onPress={() => {
                        navigation.navigate('Home');
                    }}><Text>Strona Glowna</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.drawerElement} onPress={() => {
                        navigation.navigate('Rank');
                    }}><Text>Ranking</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.drawerElement2]} onPress={() => {
                        NetInfo.fetch().then(state => {
                            if (state.isConnected == true) {
                                this.goToQuizOnline(navigation, allTestsData[Math.floor(Math.random() * allTestsData.length)]);
                            } else {
                                this.goToQuizOffline(navigation, allTestsData[Math.floor(Math.random() * allTestsData.length)]);
                            }
                        });
                    }}
                    ><Text>WYLOSUJ TEST</Text></TouchableOpacity>

                    {
                        netStatus == true ?
                            allTestsData.map((el) => (
                                <TouchableOpacity style={styles.drawerElement}
                                                  onPress={() => {
                                                      this.goToQuizOnline(navigation, el);
                                                  }
                                                  }><Text
                                    style={{textAlign: 'center'}}>{el.name}</Text></TouchableOpacity>
                            ))
                            :
                            allTestsData.map((el) => (
                                <TouchableOpacity style={styles.drawerElement}
                                                  onPress={() => {
                                                      this.goToQuizOffline(navigation, el);
                                                  }
                                                  }><Text
                                    style={{textAlign: 'center'}}>{el.name}</Text></TouchableOpacity>
                            ))
                    }
                    <TouchableOpacity style={[styles.drawerElement2]} onPress={() => {

                        NetInfo.fetch().then(state => {
                            if (state.isConnected == true) {
                                fetch('http://tgryl.pl/quiz/tests')
                                    .then((response) => response.json())
                                    .then((json) => allTestsData = _.shuffle(json))
                                    .catch((error) => console.error(error));
                                ToastAndroid.showWithGravity('updated!', ToastAndroid.SHORT, ToastAndroid.TOP);
                            } else {
                                ToastAndroid.showWithGravity('no network!', ToastAndroid.SHORT, ToastAndroid.TOP);
                            }
                        });
                    }
                    }><Text>Aktualizuj
                        baze</Text></TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        );
    }
}

const Drawer = createDrawerNavigator();

class App extends Component {
    constructor(props) {
        super(props);
        getDB();
        this.state = {
            testsData: [],
            tags: [],
        };
    }

    async createTestsTable(database) {
        database.transaction(tx => {
            querysToCreate.forEach(value => {

                tx.executeSql(value, []);
            });
        });
    }

    async putTestToDB(database) {
        this.state.testsData.forEach((item, i) => {
            const q = 'INSERT INTO tests VALUES("' + item.id + '" , "' + item.name + '" , "' + item.description + '" ,' + 1 + ', "' + item.level + '" ,' + item.numberOfTasks + ');';
            let q2;
            database.transaction(tx => {
                tx.executeSql(q, [], (transaction, resultSet) => {
                });
                item.tags.forEach((item2, i) => {
                    q2 = 'INSERT INTO tags VALUES( "' + item.tags[i] + '" , "' + item.id + '" );';
                    tx.executeSql(q2, []);
                });
            });
        });
    }

    async putDetailsToDB(database) {
        let testsData = this.state.testsData;
        testsData.forEach((item, i) => {
            let singleTest;
            fetch('http://tgryl.pl/quiz/test/' + item.id)
                .then((response) => response.json())
                .then((json) => {
                    singleTest = json;
                })
                .then(() => {
                    database.transaction(tx => {
                        singleTest.tasks.forEach((item, i) => {
                            tx.executeSql('INSERT INTO questions VALUES( "' + item.question + '" , "' + singleTest.id + '" , ' + item.duration + ' )', [], (tx, results) => {
                            });
                            item.answers.forEach((item2, i2) => {
                                tx.executeSql('INSERT INTO answers VALUES( "' + item2.content + '" , "' + item.question + '" , "' + item2.isCorrect.toString() + '" )', [], (tx, results) => {
                                });
                            });
                        });
                    });
                })
                .catch((error) => console.log('error 1 ' + error));

        });
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            if (state.isConnected == true) {
                const asyncDate = AsyncStorage.getItem('DATE');
                const today = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                if (asyncDate !== today) {
                    fetch('http://tgryl.pl/quiz/' + 'tests')
                        .then((response) => {
                            return response.json();
                        })
                        .then((json) => {
                            this.setState({testsData: _.shuffle(json)});
                            allTestsData = (json);
                        }).then(() => this.createTestsTable(DB))
                        .then(() => this.putTestToDB(DB))
                        .then(() => this.putDetailsToDB(DB))
                        .catch((error) => {
                            console.error('error 2 ' + error);
                        });
                    AsyncStorage.setItem('DATE', today);
                } else {
                    this.getFromDb(DB);
                }

            } else {
                this.getFromDb(DB);
            }
        });
        SplashScreen.hide();
    }

    async getFromDb(database) {
        let query = 'SELECT * FROM tags;';
        let table = [];
        database.transaction(tx => {
            tx.executeSql(query, [], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    for (let i = 0; i < results.rows.length; i++) {
                        table.push(results.rows.item(i));
                    }
                    this.setState({tags: table});
                }
            });
        });

        let tags = this.state.tags;
        query = 'SELECT * FROM tests;';
        let table2 = [];
        database.transaction(tx => {
            tx.executeSql(query, [], (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                    for (let i = 0; i < results.rows.length; i++) {
                        table2.push(results.rows.item(i));
                        let idtag = table2[i].id;
                        table2[i].tags = [];
                        tags.forEach((item, z) => {
                            if (item.id_tag === idtag) {
                                table2[i].tags.push(item.tag);
                            }
                        });
                    }
                    _.shuffle(table);
                    allTestsData = table;
                    this.getTestsDetails(database);
                    this.setState({testsData: table});
                }
            });
        });
    }

    async getTestsDetails(db) {
        let tests = allTestsData;
        db.transaction(tx => {
            let testsDetails = [];
            tests.forEach((itm, i) => {
                let tasks = [];
                tx.executeSql('SELECT * FROM questions WHERE id LIKE "' + itm.id + '" ;', [], (tx, resultsQuest) => {
                    for (let j = 0; j < resultsQuest.rows.length; j++) {
                        let answers = [];
                        tx.executeSql('SELECT * FROM answers WHERE question LIKE "' + resultsQuest.rows.item(j).question + '" ;', [], (tx, resultsAnswer) => {
                            for (let k = 0; k < resultsAnswer.rows.length; k++) {
                                if (resultsAnswer.rows.item(k).isCorrect == 'true') {
                                    answers.push({
                                        'content': resultsAnswer.rows.item(k).content,
                                        'isCorrect': true,
                                    });
                                } else {
                                    answers.push({
                                        'content': resultsAnswer.rows.item(k).content,
                                        'isCorrect': false,
                                    });
                                }
                            }
                            tasks.push({
                                'question': resultsQuest.rows.item(j).question,
                                'answers': answers,
                                'duration': parseInt(resultsQuest.rows.item(j).duration),
                            });
                            if (j == (resultsAnswer.rows.length - 1)) {
                                testsDetails.push({
                                    'tags': itm.tags,
                                    'tasks': tasks,
                                    'name': itm.name,
                                    'description': itm.description,
                                    'level': itm.level,
                                    'id': itm.id,
                                });
                                if (i == (tests.length - 1)) {
                                    allTestsDetails = testsDetails;
                                }
                            }
                        });
                    }
                });
            });
        });
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
