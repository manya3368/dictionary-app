import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { word: '', definition: '', phonetics: '' };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var definition = response[0].meanings[0].definitions[0].definition;
        console.log(definition);
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'lightblue'}
          centerComponent={{
            text: 'Dictionary',

            style: { color: 'white', fontSize: 30, fontFamily: 'Ariel' },
          }}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Enter Text"
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18,
        color:"white",
    fontFamily:"cursive",
    fontSize:25 }}>{this.state.word}</Text>
        <Text style={{ fontSize: 18,color:"white",
    fontFamily:"cursive",
    fontSize:18 }}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor:"thistle",
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'white',
    outline: 'none',
    color:"maroon",
    fontFamily:"cursive",
    fontSize:25
  },
  searchButton: {
    width: '40%',
    height: 45,
    alignSelf: 'center',
    color:"white",
    margin: 10,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'thistle',
    marginTop:30,
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'times',
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
