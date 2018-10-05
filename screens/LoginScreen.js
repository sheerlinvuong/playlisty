import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Linking } from 'react-native';
import { AuthSession, WebBrowser } from 'expo';
import Expo from 'expo';
import { FB_APP_ID } from 'react-native-dotenv';

export default class LoginScreen extends Component {
  state = {
    user: {},
    result: null,
  };

  handleLogout = async () => {
    let result = await AuthSession.dismiss();
    this.setState({ result });
    console.log(this.state.result);
  };
  handleLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v3.1/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
    console.log(result);
    console.log(result.type);
    console.log(result.errorCode);

    // WebBrowser.openBrowserAsync('https://sheerlin.netlify.com/');
    console.log(result.params.expires_in);

    Expo.SecureStore.setItemAsync(userToken, result.params.access_token);
    Expo.SecureStore.setItemAsync(userToken, result.params.expires_in);
  };

  handleSignup = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v3.1/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });
    this.setState({ result });
    console.log(result);
    console.log(result.type);
    console.log(result.errorCode);

    // WebBrowser.openBrowserAsync('https://sheerlin.netlify.com/');
    console.log(result.params.access_token);
    console.log(result.params.expires_in);

    Expo.SecureStore.setItemAsync('userToken', 'result.params.access_token');
    Expo.SecureStore.setItemAsync('expiresIn', 'result.params.expires_in');

    if (result.type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${
          result.params.access_token
        }&fields=id,name,picture.type(large)`,
      );
      // const { picture, name } = await response.json();

      console.log(await response.json());
      //console.log('Logged in!', `Hi ${(await response.json()).id}!`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Playlisty</Text>
        <Button
          style={styles.button}
          title="Log In"
          onPress={this.handleLogin}
        />
        <Button
          style={styles.button}
          title="Sign Up With Facebook"
          onPress={this.handleSignup}
        />
        <Button
          style={styles.button}
          title="Log Out"
          onPress={this.handleLogout}
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
