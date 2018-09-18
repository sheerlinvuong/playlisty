import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
// Form
const Form = t.form.Form;

// Form model
const User = t.struct({
  email: t.String,
  //username: t.maybe(t.String),
  password: t.String,
  //terms: t.Boolean,
});
const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
      error: ' cannot reset pw without email',
    },
    password: {
      error: 'Choose again',
      secureTextEntry: true,
    },
    // terms: {
    //   label: 'Agree to Terms',
    // },
  },
};

const axios = require('axios');

export default class LoginScreen extends Component {
  state = {
    user: {},
  };

  handleSubmit = () => {
    const value = this.loginform.getValue();
    console.log('value: ', value);
    console.log(Object.keys(value));
    axios
      .post('http://localhost:3000/signup', {
        ...value,
      })
      .then(response => {
        console.log('User added!');
      })
      .catch(err => {
        console.error(err);
        console.log(err, 'User not added, try again!');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Playlisty</Text>
        <Form ref={c => (this.loginform = c)} type={User} />
        <Button
          style={styles.button}
          title="Log In"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#343333',
  },
  Title: {
    fontSize: 36,
    color: '#FCFCFC',
    width: 149,
    height: 81,
    backgroundColor: 'red',
    fontFamily: 'montserrat',
  },
  button: {
    height: 36,
    backgroundColor: 'blue',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});
