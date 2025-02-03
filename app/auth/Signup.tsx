import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import {  TextInput, Button, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';



 

export default function Signup(){
  const router = useRouter ();

  return (
    
       <View style={styles.container}>
        <Image style={{height:350,width:350}} source={require('./../../assets/images/Do Gram.png')} />
      <Text style={styles.title}>Create New Account</Text>
      <TextInput
        style={styles.input}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        placeholder="Username"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile number"
       
        
        keyboardType="numeric" // Ensures only numeric input
      />
               
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        
      />
      <TextInput
        style={styles.input}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        placeholder="Rewrite Password"
        
      />
       
      
      <Button title="Sign-Up"  />
      <Text style={{marginTop:20}}>Already have an account?</Text>
      <Pressable onPress={() => router.push('/auth/Login')}>
       <Text style={{color:"blue",fontFamily:'outfit-bold'}}> Login</Text>
      </Pressable>
    </View>                                                                                                                                                                                                                                                                      
      );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 364,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
    marginLeft:-70 ,
    marginBottom:-100,
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'#fff',
    height:500,
    borderRadius:20,
    boxShadow: '0 5px 10px rgb(246, 241, 241)',
    marginTop:-50
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    
    backgroundColor:'#e4f9f9'
    
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily:'outfit-bold'
  },
  button: {
    backgroundColor: '#57a7fa',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20
  },
  
 
});

