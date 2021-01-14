import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles';
import React, {Component} from 'react';

import NetInfo from '@react-native-community/netinfo';
const _ = require('lodash');

let netStat;
const isOnline = NetInfo.addEventListener((state) => {
  netStat = state.isConnected;
});

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testsData: [],
      aTag: [],
    };
  }

  async getQuiz(id) {
    return await fetch('http://tgryl.pl/quiz/' + 'test/' + id)
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => console.error(error));
  }

  async goQuiz(navigation, item) {
    playerScore = 0;
    const quizContent = await this.getQuiz(item.id);
    quizContent.tasks = _.shuffle(quizContent.tasks);
    navigation.navigate(item.id, {
      id: item.id,
      quizContent: quizContent,
      qnumber: 0,
      lastquestion: item.numberOfTasks,
    });
  }
  async getFromDb(database) {
    let query = 'SELECT * FROM tags;';
    let table = [];
    database.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        let len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            table.push(results.rows.item(i));
          }
          this.setState({aTag: table});
        }
      });
    });

    let tags = this.state.aTag;
    query = 'SELECT * FROM tests;';
    let table2 = [];
    database.transaction((tx) => {
      tx.executeSql(query, [], (tx, results) => {
        let len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < results.rows.length; i++) {
            table2.push(results.rows.item(i));
            let idtag = table2[i].id;
            table2[i].aTag = [];
            aTag.forEach((item, z) => {
              if (item.id_tag === idtag) {
                table2[i].aTag.push(item.tag);
              }
            });
          }
          allTestsData = table;
          this.setState({testsData: table});
        }
      });
    });
  }
  componentDidMount() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        fetch('http://tgryl.pl/quiz/' + 'tests')
          .then((response) => response.json())
          .then((json) => {
            this.setState({testsData: _.shuffle(json)});
          })
          .catch((error) => console.error('error 3 ' + error));
      } else {
        this.getFromDb(DB);
      }
    });
  }
  render() {
    const testsData = this.state.testsData;
    const navigation = this.props.navigation;
    const renderItem = ({item}) => (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            this.goQuiz(navigation, item);
          }}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={[{flexDirection: 'row'}]}>
            {item.tags.map((el) => (
              <Text style={styles.tags}>{el}</Text>
            ))}
          </View>
          <Text style={{fontSize: 12}}>{item.info}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{flex: 1, marginLeft: 10}}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={require('../icons/menu.png')}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={[{flex: 13, alignItems: 'center'}]}>
            <Text style={styles.headerText}>Strona Glowna</Text>
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            data={testsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListFooterComponent={
              <View
                style={[
                  {
                    flexDirection: 'column',
                    allignItems: 'flex-end',
                    height: 100,
                  },
                ]}>
                <Text style={styles.footerText}>{'SPRAWDZ RANKING'}</Text>
                <View
                  style={[
                    {
                      flexDirection: 'column',
                      alignSelf: 'center',
                      height: 30,
                      width: 100,
                    },
                  ]}>
                  <Button
                    title={'Ranking'}
                    style={[{width: 20}]}
                    onPress={() => navigation.navigate('Rank')}
                  />
                </View>
              </View>
            }
            ListFooterComponentStyle={styles.container2}
          />
        </View>
      </SafeAreaView>
    );
  }
}
export default HomeScreen;
