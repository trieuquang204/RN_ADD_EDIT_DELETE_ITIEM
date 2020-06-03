import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TextInput } from 'react-native';

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import FlatListData from '../data/FlatListData';

var screen = Dimensions.get('window');

export default class EditModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foodName: '',
            foodDescription: ''
        }
    }

    showEditModal = (editingFood, flatlistItem) => {
        console.log(`editingFood = ${JSON.stringify(editingFood)}`);
        this.setState({
            key: editingFood.key,
            foodName: editingFood.name,
            foodDescription: editingFood.foodDescription,
            flatlistItem: flatlistItem
        })
        this.refs.myModal.open();
    }

    generateKey = (numberOfCharacters ) => {
        return require('random-string')({length: numberOfCharacters });
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                    // alert('Modal closed');
                }}
            >
                <Text
                    style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 40 }}>New foods infomation
                </Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ foodName: text })}
                    placeholder="Editing food name"
                    value={this.state.foodName}
                />

                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({ foodDescription: text })}
                    placeholder="Editing food description"
                    value={this.state.foodDescription}
                />

                <Button 
                style={{fontSize:18, color:'white'}}
                containerStyle={{
                    padding:8,
                    marginLeft:70,
                    marginRight:70,
                    height:40,
                    borderRadius:6,
                    backgroundColor: 'mediumseagreen'
                }}
                onPress={() => {
                    if(this.state.foodName.length == 0 || this.state.foodDescription.length == 0) {
                        alert("You must enter food's name and description ")
                        return;
                    }
                    // Updating food 
                    var foundIndex = FlatListData.findIndex(item => this.state.key === item.key);
                    if(foundIndex < 0 ) {
                        return; // Not found
                    }
                    FlatListData[foundIndex].name = this.state.foodName;
                    FlatListData[foundIndex].foodDescription = this.state.foodDescription;

                    // Refhesh 
                    this.state.flatlistItem.refeshFlatListItem();
                    this.refs.myModal.close();
                }}
                >
                Save 
                </Button>
            </Modal>
        )
    }
}