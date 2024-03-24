import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar, useColorScheme, Platform, TouchableOpacity } from 'react-native';
import { useGlobalValue } from './GlobalContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, } from 'react-native/Libraries/NewAppScreen';

const ProfitScreen = ({ navigation }) => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, };



  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, seToDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [salesValue, setSalesValue] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [profit, setProfit] = useState('');
  const [showFromDatePicker, setFromDateShowPicker] = useState(false);
  const [showToDatePicker, setToDateShowPicker] = useState(false);
  const { globalValue } = useGlobalValue();

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setFromDateShowPicker(false);
    setFromDate(currentDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setToDateShowPicker(false);
    seToDate(currentDate);
  };

  const showFromDateTimePicker = () => {
    setFromDateShowPicker(true);
  };

  const showToDateTimePicker = () => {
    setToDateShowPicker(true);
  };

  // const styles = StyleSheet.create({
  //   baseText: {
  //     fontFamily: 'Cochin',
  //   },
  //   valueText: {
  //     fontSize: 15,
  //     fontWeight: 'bold',
  //   },
  //   nameText: {
  //     fontSize: 15,
  //     fontWeight: 'normal',
  //   },
  // });


  const handlProfitRequest = async () => {
    try {
      const response = await fetch('https://positnow.com:8010/profit/getAllProfit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + globalValue
        },
        body: JSON.stringify({
          fromDate: fromDate,
          toDate: toDate,
          salesRefId: 0
        }),
      });

      const data = await response.json();
      setSalesValue(data.salesValue.toFixed(2));
      setUnitCost(data.unitCost.toFixed(2));
      const sales = parseFloat(salesValue);
      const cost = parseFloat(unitCost);
      const profit = sales - cost;
      setProfit(profit.toFixed(2));
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

    //       {showFromDatePicker && (
    //         <DateTimePicker
    //           value={date}
    //           mode="datetime"
    //           display="default"
    //           onChange={onChangeFromDate}
    //         />
    //       )}

    //       {showToDatePicker && (
    //         <DateTimePicker
    //           value={date}
    //           mode="datetime"
    //           display="default"
    //           onChange={onChangeToDate}
    //         />
    //       )}

    //   <TextInput onChangeText={showFromDateTimePicker} placeholder="from date" value={JSON.stringify(fromDate)} />
    //   <TextInput onChangeText={showToDateTimePicker} placeholder="to date" value={JSON.stringify(toDate)} />

    //   <Button title="Find" onPress={handlProfitRequest} />
    //       <Text style={styles.baseText}>
    //         <Text style={styles.nameText}>
    //           {'\n'}
    //           {'\n'}
    //           {'Sales Value : '}
    //         </Text>
    //         <Text style={styles.valueText}>
    //           {salesValue}
    //         </Text>
    //         <Text style={styles.nameText}>
    //           {'\n'}
    //           {'\n'}
    //           {'Unit Cost : '}
    //         </Text>
    //         <Text style={styles.valueText}>
    //           {unitCost}
    //         </Text>
    //         <Text style={styles.nameText}>
    //           {'\n'}
    //           {'\n'}
    //           {'Profit : '}
    //         </Text>
    //         <Text style={styles.valueText}>
    //           {profit}
    //           {'\n'}
    //           {'\n'}
    //         </Text>
    //       </Text>

    //   <Button
    //     title="Go to Home"
    //     onPress={() => navigation.navigate('Home')}
    //   />
    // </View>
    // </ScrollView>
    // </SafeAreaView>


    <View style={styles.container}>
      <Text style={styles.title}>Profit Calculation</Text>
      <View style={styles.inputContainer}>

        {showFromDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeFromDate}
          />
        )}

        <TouchableOpacity >

          <TextInput onChangeText={showFromDateTimePicker} placeholder="from date" value={JSON.stringify(fromDate)} />

        </TouchableOpacity>

        {showToDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeToDate}
          />
        )}

        <TouchableOpacity >
          <TextInput onChangeText={showToDateTimePicker} placeholder="to date" value={JSON.stringify(toDate)} />

        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlProfitRequest}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Sales Value: {salesValue}</Text>
        <Text style={styles.resultText}>Unit Cost: {unitCost}</Text>
        <Text style={styles.resultText}>Profit: {profit}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2E86C1',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfitScreen;
