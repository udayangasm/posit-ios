import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Tooltip } from 'react-native-elements';

const HomePage = ({ navigation }) => {


  const [menuVisible, setMenuVisible] = useState(false);


  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
  };


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const goToLoginPage = () => {
    // Replace 'Login' with the actual name of your login screen component
    navigation.navigate('Login');
  };

  return (
    // <View style={styles.container}>
    //   <Text>Welcome to PosIt</Text>
    //   <View style={styles.loginButtonContainer}>
    //     <Button
    //       title="Login"
    //       onPress={() => navigation.navigate('Login')}
    //     />
    //   </View>
    // </View>



    <View style={styles.container}>
      <View style={styles.topRight}>
        <TouchableOpacity onPress={goToLoginPage} >
          <MaterialIcons name="login" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.topLeft}>
        <TouchableOpacity onPress={toggleMenu}>
          <MaterialIcons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome to POSIT</Text>

      {menuVisible && (
        <View style={styles.dropdown}>
          <ScrollView contentContainerStyle={styles.menuContent}>
            <TouchableOpacity style={styles.menuOption} onPress={() => navigateToPage('Profit')}>
              <MaterialIcons name="attach-money" size={24} color="#333" />
              <Text style={styles.menuText}>Profit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <MaterialIcons name="storage" size={48} color="#FF5722" />
          <Text style={styles.featureTitle}>Inventory Management</Text>
          <Text style={styles.featureDescription}>
            Manage your inventory efficiently with our intuitive tools.
          </Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.featureItem}>
          <MaterialIcons name="receipt" size={48} color="#3F51B5" />
          <Text style={styles.featureTitle}>Invoicing</Text>
          <Text style={styles.featureDescription}>
            Create and manage invoices with ease to streamline your business transactions.
          </Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.featureItem}>
          <MaterialIcons name="people" size={48} color="#F44336" />
          <Text style={styles.featureTitle}>Customer Outstanding</Text>
          <Text style={styles.featureDescription}>
            Keep track of outstanding balances and customer accounts effortlessly.
          </Text>
        </View>
        <View style={styles.hr} />
        <View style={styles.featureItem}>
          <MaterialIcons name="account-balance" size={48} color="#4CAF50" />
          <Text style={styles.featureTitle}>Accounting</Text>
          <Text style={styles.featureDescription}>
            Handle your financial records and transactions efficiently for better insights.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  topRight: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  topLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: '#5DADE2',
    borderRadius: 10,
    zIndex: 1,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  hr: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '80%',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  menuTooltip: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  tooltipContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
  },
  tooltipContent: {
    paddingTop: 8,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuContent: {
    paddingVertical: 10,
  },
});

export default HomePage;