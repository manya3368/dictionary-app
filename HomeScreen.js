import React, { Component } from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            lexicalCategory: '',
            definition: '',
            isSearchPressed: "false",
            word: "Loading...",
            isLoading: "false"
        }
    }
    getWord = (word) => {
        var searchKeyword = word.toLowerCase()
        var url = "https://rupinwhitehatjr.github.io/dictionary" + searchKeyword + ".json"
        return fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    return data.json
                }
                else {
                    return null
                }
            })
            .then((response) => {
                var ResponseObject = response
                if (ResponseObject) {
                    var wordData = ResponseObject.definition[0]
                    var definition = wordData.description
                    var lexicalCategory = wordData.wordtype
                    this.setState({
                        "word": this.state.text,
                        "lexicalCategory": lexicalCategory,
                        "definition": definition
                    })
                }
                else {
                    this.setState({
                        "word": this.state.text,
                        "definition": "not found"
                    })
                }
            })
    }
    render() {
        return (
            <View style={styles.inputBoxContainer}>
                <TextInput style={styles.inputBox}>
                    onChangeText={(text) => {
                        this.setState({
                            text: text,
                            isSearchPressed: false,
                            word: "Loading....",
                            lexicalCategory: '',
                            examples: [],
                            definition: ''
                        });
                    }}
          value={this.state.text}
                </TextInput>
                <TouchableOpacity
                    style={styles.GoButton}>
                    onPress={() => {
                        this.setState({ isSearchPressed: true })
                        this.getWord(this.state.text)
                    }}
                </TouchableOpacity>
                <Text style={{fontSize:20}}>
            {
              this.state.isSearchPressed && this.state.word === "Loading..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Loading..." ?
              (
                <View style={{justifyContent:'center', marginLeft:10 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>
                    <Text style={{fontSize:18}}>
                      {this.state.lexicalCategory}
                    </Text>
                  </View>
                  <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>
                    <Text style={{ fontSize:24}}>
                      {this.state.definition}
                    </Text>
            </View>
            

        );
    }
}