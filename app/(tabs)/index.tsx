import { Image, StyleSheet, Platform, Pressable } from 'react-native';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';



 

export default function Login(){
  const router = useRouter ();

  return (
   
       <View style={styles.container}>
        <Image  source={require('./../../assets/images/Do Gram.png')} 
   style={{ width:'100%',height:330}}
   />
   <View style={{padding:25,backgroundColor:'#3ac3fe',height:'100%',borderRadius:30}}>
   <Text style={styles.title}>Welcome</Text>
   <Text style={{textAlign:'center',color:'#fff'}}>" Express Yourself, Anytime, Anywhere. "</Text>
   <Pressable style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#2d65e7' : '#fff' ,borderRadius:5,height:50,marginTop:'20'}, // Changes color on press
        ]}onPress={() => router.push('/auth/Signup')}>
   <View >
        <Text style={styles.buttonText}>
         Get started
        </Text>
      </View>
   </Pressable>
   <Pressable style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#2d65e7' : 'transparent' ,borderRadius:5,height:50,marginTop:'20', borderWidth:1,borderColor:'#fff'}, // Changes color on press
        ]}onPress={() => router.push('/auth/Login')}>
   <View >
        <Text style={styles.buttonText}>
         Already have an Account?
        </Text>
      </View>
   </Pressable>
   
   </View>
     
      
      
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
 
  container: {
    flex: 1,
   
    backgroundColor:'#d2e0fe',
    
   
  },
  
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign:'center',
    fontWeight:'bold',
  },
  button: {
   
    
  },
  
  buttonText: {
    
    fontSize: 16,
    borderRadius:20,
    textAlign:'center',
    marginTop:10,
   
  },
  
});

