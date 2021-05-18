import { StyleSheet } from 'react-native'; 


const styles = StyleSheet.create({  
    cont : {
     height: '100%',
     width: '100%',
    //  flex: 1,
     paddingTop: 10,
    },
    container : {
      width: '100%',
      height: '100%',
      backgroundColor: '#243754',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    padder : {
     marginBottom: 4
    },  
    button:{
      width:300,
      backgroundColor: '#ffffff',
      borderRadius: 2,
      marginVertical: 0,
      paddingVertical: 8
  },
  buttText:{
      fontSize: 19,
      fontWeight: '900',
      color: '#000000',
      textAlign:'center'
  },
  signupTextCont:{
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
},
signupText:{
    color: '#ffffff',
    fontSize:16
},
signupButton:{
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
},
inputBox:{
    width: 300,
    backgroundColor: '#f6f6f6',
    borderRadius: 0,
    paddingHorizontal: 16,
    fontSize:16,
    color: '#243754',
    marginVertical: 16
    
},
button:{
    width:300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 16,
    paddingVertical: 12
},
buttText:{
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign:'center',
}, 
 postBox:{  
    // flex: 1,  
     width: "100%",  
     flexDirection: "row",  
     justifyContent: "space-between",  
     alignItems: "flex-end"  
 }, 
 postBoxLogo:{  
    // flex: 1,  
     width: "100%",  
     flexDirection: "row",  
     justifyContent: "space-between",  
     alignItems: "center"  
 }, 
 logoBox:{  
    // flex: 1,  
     width: "100%",  
     flexDirection: "row",  
     justifyContent: "space-between",  
    //  alignItems: "center"  
 },
 logoText : {
            color: "#ffffff",
            marginVertical: 15,
            fontSize:18,
            // color:'rgba(255, 255, 255, 0.7)'
        },
 logoText2 : {
            color: "#243754",
            marginVertical: 15,
            fontSize:18,
            // color:'rgba(255, 255, 255, 0.7)'
        },
        modal: {  
            justifyContent: 'center',  
            alignItems: 'center',   
            backgroundColor : "#00BCD4",   
            height: 300 ,  
            width: '80%',  
            borderRadius:10,  
            borderWidth: 1,  
            borderColor: '#fff',    
            marginTop: 80,  
            marginLeft: 40,  
             
             },
             SplashScreen_RootView:  
             { 
                flexDirection:'column-reverse',
                 justifyContent: 'center',  
                 flex:1,  
                 margin: 10,  
                 position: 'absolute',  
                //  backgroundColor: '#00BCD4',
                backgroundColor: '#ffffff',
                 width: '100%',  
                 height: '100%',  
               },  

               SplashScreen:  
               { 
                //   flexDirection:'column-reverse',
                   justifyContent: 'center',  
                   flex:1,  
                   margin: 10,  
                   position: 'absolute',  
                   //  backgroundColor: '#00BCD4',
                  //   backgroundColor: '#ffffff',   
                //    backgroundColor: '#000000',  
                //    backgroundColor: 'rgba(100,100,100, 0.5)',      
                   width: '100%',  
                   height: '100%'
                 }, 

             SplashScreen_ChildView:  
             {  
                //  justifyContent: 'center',  
                //  alignItems: 'center',  
                //  backgroundColor: '#00BCD4',  
                //  flex:1,  
             }, 
             TouchableOpacityStyle: {
                position: 'relative',
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                right: 30,
                bottom: 30,
                alignItems: 'flex-end'
              },
            
              FloatingButtonStyle: {
                resizeMode: 'contain',
                width: 50,
                height: 50,
                //backgroundColor:'black'
              },
              MainContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
              },
              SectionStyle: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#f6f6f6',
                height: 40,
                borderRadius: 5,
                margin: 10,
              },
              ImageStyle: {
                padding: 10,
                marginRight: 6,
                margin: 5,
                height: 25,
                marginBottom: 12,
                // width: 25,
                resizeMode: 'stretch',
                alignItems: 'center',
              },
  });  
  

  export default styles;