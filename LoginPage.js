
import React, { useState } from 'react';
import { View, Button, TextInput, Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, Text } from 'react-native';
import { useGlobalValue } from './GlobalContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LoginPage = ({ navigation }) => {


  const [user, userName] = React.useState('');
  const [pass, password] = React.useState('');
  const [responseData, setResponseData] = useState(null);
  const { globalValue, setGlobalValue } = useGlobalValue();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Light gray background
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333', // Dark gray text color
    },
    input: {
      width: '80%',
      height: 40,
      paddingHorizontal: 10,
      marginBottom: 20,
      backgroundColor: '#fff', // White background for input fields
      borderRadius: 5,
    },
  });


  const handleLogin = async () => {
    try {
      const response = await fetch('https://positnow.com:8040/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      });
      const data = await response.json();
      setResponseData(data);
      setGlobalValue(data.token);
      navigation.navigate('Profit')
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to make POST request');
    }
  };


  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <TextInput onChangeText={userName} placeholder="Username" value={user} />
    //       <TextInput onChangeText={password} placeholder="Password" value={pass} />
    //       <Button title="Login" onPress={handleLogin} />
    // </View>

    // </ScrollView>
    // </SafeAreaView>


    <View style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user}
        onChangeText={userName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={password}
      />
      <Button title="Login" onPress={handleLogin} color="#4CAF50" />
    </View>

  );
};

export default LoginPage;
