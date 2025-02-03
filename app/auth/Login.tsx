import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import {  TextInput, Button, TouchableOpacity} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';



 

export default function Login1(){
  const router = useRouter ();

  return (
   
     

    
    
   
       <View style={styles.container}>
       <Image style={{height:350,width:350}} source={require('./../../assets/images/Do Gram.png')} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        
      />
      <Pressable onPress={()=> router.push('/pages/home')}>
      <Button title="Login"  />
      </Pressable>
      
      <Text style={{marginTop:20}}>Don't have an account?</Text>
      <Pressable onPress={() => router.push('/auth/Signup')}>
       <Text style={{color:"blue"}}> Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/pages/home')}>
       <Text style={{color:"blue"}}> Home</Text>
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
    height:300,
    borderRadius:20,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
   
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    boxShadow: '0 0 10px rgba(0.0,0,0.2)',
    backgroundColor:'#e4f9f9'
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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

