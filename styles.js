const React = require('react-native');
const {StyleSheet} = React;

export default {
  container: {
    flex: 1,
  },
  container2: {
    backgroundColor: '#4A9470',
  },
  item: {
    backgroundColor: '#B0FFD9',
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#87E0B5',
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'FredokaOne-Regular',
    textAlign: 'center',
  },
  tags: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
    margin: 5,
  },
  drawerElement: {
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    borderColor: 'black',
    borderRadius: 6,
    textAlign: 'center',
  },
  drawerElement2: {
    marginTop: 15,
    borderWidth: 2,
    padding: 10,
    fontWeight: 'bold',
    borderColor: 'black',
    backgroundColor: '#75fffa',
    borderRadius: 6,
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  answersBox: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 20,
    backgroundColor: '#FFB3B0',
    marginBottom: 50,
  },
  imageStyle: {
    height: 40,
    width: 40,
    alignSelf: 'flex-start',
    resizeMode: 'stretch',
  },
  answersRow: {
    flexDirection: 'column',
    alignConent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
  },
  answers: {
    width: 20,
    marginStart: 10,
  },
  header: {
    flex: 1,
    backgroundColor: '#329456',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  content: {
    flex: 10,
  },
  text: {textAlign: 'center'},
  font22: {
    width: '70%',
    fontSize: 15,
    fontWeight: 'bold',
  },
  centerMode: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    marginBottom: 3,
    marginLeft: 8,
    borderWidth: 2,
    borderRadius: 6,
    textAlign: 'center',
  },
};
