import React, {Component} from 'react';  
import {
  Platform,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
  RefreshControl,
  SafeAreaView,
  ProgressBarAndroid,
  Clipboard,
  FlatList,
  Linking
} from 'react-native';  
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import OneSignal from 'react-native-onesignal';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'




export default class LoginActivity extends Component {  
  constructor(props){
    super(props);
    OneSignal.init("9636fba3-b125-4ab4-9d6e-f70d6f04ceac", {kOSSettingsKeyAutoPrompt : false});// set kOSSettingsKeyAutoPrompt to false prompting manually on iOS

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    this.state = {
      login: false,
      isVisible : true,
      ulogin:'',
      checkin: false
    }
    this.toggleLogin = this.toggleLogin.bind(this);
   }
   componentDidMount(){  
     
    var that = this;
    that.getDatass();  
    setTimeout(function(){  
      that.Hide_Splash_Screen();  
    }, 4000);  

    AdMobInterstitial.setAdUnitID('ca-app-pub-5937824369934646/9285895403');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    
  

    // Display a rewarded ad
    AdMobRewarded.setAdUnitID('ca-app-pub-5937824369934646/4795986056');
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());

   } 

   componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

Hide_Splash_Screen=()=>{  
  this.setState({   
    isVisible : false   
  });  
}  

getDatass = async () => {
      try {
        // await AsyncStorage.setItem('@login', 'true');
        var v = await AsyncStorage.getItem('@login');
        this.setState({ulogin: v});
        // console.error(v);
      } catch (e) {
        // saving error
      }
}

toggleLogin(){
  this.setState(prevState => ({ login: !prevState.login }))
}
 

 removeValues = async () => {
  try {
    await AsyncStorage.removeItem('@login');
  } catch(e) {
    // remove error
  }
  
  console.log('Done.');
};

 logoutFunction = () => {
  // this.setState({ulogin: false});
  // if(this.state.ulogin == 'true'){
   this.removeValues();
   this.setState({ulogin:'false'});
  // }
 //  this.setState(prevState => ({ ulogin: !prevState.ulogin }))
};

  render() {  
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>  
        {/* <View >   */}
         <View style = {{alignItems:'center', flex: 1, justifyContent: 'flex-end'}} >
         <AdMobBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-53784369934646/928589503"
                testDevices={[AdMobBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}
              />

              {/* // Display a DFP Publisher banner */}
              <PublisherBanner
                adSize="fullBanner"
                adUnitID="ca-app-pub-53784369934646/479598606"
                testDevices={[PublisherBanner.simulatorId]}
                onAdFailedToLoad={error => console.error(error)}
                onAppEvent={event => console.log(event.name, event.info)}
              />

            <TouchableOpacity
            onPress={() => {Linking.openURL('https://webmit.org')}}
            >
            <Text style={{paddingBottom: 16, fontStyle:'italic'}}>
               Developed and Designed By WEBMIT
            </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', flex:1,  justifyContent: 'flex-start' }}>
          <Logo/> 
          </View>
        {/* </View> */}
      </View>
    )
    return (  
      <View style={styles.container}>
         <StatusBar
         backgroundColor="#874845"
         barStyle="light-content"
         />
        <ScrollView  style={styles.cont}>
        
           <View>
          
              {this.state.login ? <LoginScreen toggleLogin={this.toggleLogin} /> : <LogoutScreen logoutFunction={this.logoutFunction} toggleLogin={this.toggleLogin} ulogin={this.state.ulogin}/>}
             
           </View>
          </ScrollView>
          {
                (this.state.isVisible === true)? Splash_Screen : null
              }
      </View>  
    );  
  }  
} 




class LoginScreen extends Component {
  constructor(props){
    super(props)
      this.state = {
         fullName: '',
         userName : ''
    }
  }

   showErrorModal(mess, color){
     this.setState({errorColor:color,errorMess:mess, errorModal:true});
     setTimeout(() =>{
      this.setState({errorModal:false});
    }, 1000); 
   }

  userSignupFunction(){
    if(this.state.fullName.length > 4){
      if(this.state.userName.length > 3){
        if(this.state.userEmail.length > 6){
          if(this.state.userPassword.length > 5){
              this.setState({visible:true});
              return fetch('https://spiritanssounds.com/signup',  {
                "method": "POST",
                "headers": {
                  'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                fullname:this.state.fullName,
                username:this.state.userName,
                useremail:this.state.userEmail,
                userPassword:this.state.userPassword
              })
              }).then((response) => response.json())
                  .then((responseJson) => {
                    if(responseJson === "success"){
                      this.props.toggleLogin;
                    }else{
                      this.showErrorModal(responseJson, "#cc0000");
                      this.setState({visible:false});
                    }
                  }).catch((error) => {
                    // console.error(error);
                    this.setState({visible:false});
                  });
          }else{
            this.showErrorModal("Password must have atleast 6 characters ", "#cc0000");
          }
        }else{
          this.showErrorModal("Invalid email", "#cc0000");
        }
      }else{
        this.showErrorModal("username must have atleast 4 characters", "#cc0000");
      }
    }else{
      this.showErrorModal("fullname must have atlesat 4 characters", "#cc0000");
    }
};
  render() {
    const color = (
      this.state.errorColor
    )
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={{marginTop:40, marginBottom:30}}>
          <Modal
              style={styles.modal}
                      animationType="fade"
                      transparent={true}
                      visible={this.state.visible}
                      // onRequestClose={() => {
                      //   this.setState({visible : false})   }}           
              >

                <View style={{backgroundColor:'#243754', alignItems:'center', flex: 1, sjustifyContent: 'center', shadowColor:'#000000', shadowOpacity:0.9, opacity:1}}>
                  {/* <View style={styles.SplashScreen}>
                    <View style = {{alignItems:'center', flex: 1, sjustifyContent: 'center'}} >
                      <ActivityIndicator style={{width:500, height:500}} size='large' color="#ffffff" />  
                    </View>
                  </View>
                  </View> */}
                  <View style={{alignItems: 'center', flex:1,  justifyContent: 'flex-start' }}>
                      <Logo3/> 
                  </View>
                  <View style = {{alignItems:'center', flex: 1, justifyContent:'center'}}>
                    <ActivityIndicator style={{width:500, height:500}} size='large' color="#ffffff" />  
                  </View>
                  </View> 
           </Modal>
          {/* error message modal */}
          <Modal
          style={{height:20, backgroundColor:'#ffffff'}}
          transparent={true}
          animationType='slide'
          visible={this.state.errorModal}
          onPress={() => {this.setState({errorModal:false})}} 
          onRequestClose={() => {
            this.setState({errorModal: false})
          }}
          >
            <View>
              <View style={{marginRight:27, marginLeft:27, marginTop:6, paddingTop:5, paddingBottom:5, paddingRight:15, paddingLeft:15, alignContent:'center', alignItems:'center'}}>
                {/* <Button style={{backgroundColor:'#ffffff'}} color='#874845' border title="Text Copied To Clipboard" onPress={() => {this.setState({copyModal:false})}}></Button> */}
                <TouchableOpacity onPress={() => {this.setState({copyModal:false})}} style={{ paddingRight:15, paddingLeft:15, borderRadius:8, backgroundColor: color, height:30}}>
                  <Text style={{color:'#ffffff', fontSize:12, textAlign:'center'}}>{this.state.errorMess}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
         <View style={{marginBottom:20}}> 
         <Logo/>
         </View>
     
        <View style={styles.SectionStyle}>
               <TouchableOpacity
                 style={styles.ImageStyle}>
                   <Icon name="user" color="#874845" size={18} style={{paddingBottom:7}}/>
                 </TouchableOpacity>  
                <TextInput 
                  style={{ flex: 1, backgroundColor:'#ffffff'}}
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="FullName"
                  placeholderTextColor='#243754'
                  selectionColor="#243754"
                  value={this.state.fullName}
                  onSubmitEditing={()=> this.lname.focus()}
                  onChangeText={fullName => this.setState({fullName})}
                  />
              </View>
            <View style={styles.SectionStyle}>
               <TouchableOpacity
                 style={styles.ImageStyle}>
                   <Icon name="user" color="#874845" size={18} style={{paddingBottom:7}}/>
                 </TouchableOpacity>  
                  <TextInput 
                  style={{ flex: 1, backgroundColor:'#ffffff'}} 
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="UserName"
                  placeholderTextColor='#243754'
                  selectionColor="#243754"
                  keyboardType="email-address"
                  value={this.state.userName}
                  ref={(input) => this.lname = input}
                  onSubmitEditing={()=> this.email.focus()}
                  onChangeText={userName => this.setState({userName})}
                  />
              </View>


            <View style={styles.SectionStyle}>
               <TouchableOpacity
                 style={styles.ImageStyle}>
                   <Icon name="envelope-o" color="#874845" size={18} style={{paddingBottom:7}}/>
                 </TouchableOpacity>  
                  <TextInput 
                  keyboardTypes='email-address'
                  style={{ flex: 1, backgroundColor:'#ffffff'}}
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="Email"
                  placeholderTextColor='#243754'
                  selectionColor="#243754"
                  value={this.state.userEmail}
                  ref={(input) => this.email = input}
                  onSubmitEditing={()=> this.password.focus()}
                  onChangeText={userEmail => this.setState({userEmail})}
                  />
             </View>

              <View style={styles.SectionStyle}>
               <TouchableOpacity
                 style={styles.ImageStyle}>
                   <Icon name="eye" color="#874845" size={16} style={{paddingBottom:7}}/>
                 </TouchableOpacity>    
                  <TextInput
                  style={{ flex: 1, backgroundColor:'#ffffff'}}
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor='#243754'
                  value = {this.state.userPassword}
                  ref={(input) => this.password = input}
                  onChangeText={userPassword => this.setState({userPassword})}
                  />
               </View>
              {/* <TouchableOpacity onPress={() => {this.userSignupFunction()}}  style={styles.button}>
                 <Text style={styles.buttText} >Submit</Text>
              </TouchableOpacity> */}
              
               <View style={styles.container}>
               <Icon.Button name="sign-in" backgroundColor='#874845' borderWidth={1} borderColor='#243754' style={{alignContent:'center',  borderRadius:6, alignItems:'center'}} size={20} onPress={() => {this.userSignupFunction()}}>
                <Text style={{fontFamily: 'Arial', textAlign:'center', fontSize: 15, color: '#fff'}}>Submit</Text>  
               </Icon.Button>  
               </View>
            
        <View style={styles.signupTextCont}>
           <Text style={styles.signupText}>Already have an acount?  </Text>
           <TouchableOpacity onPress= {this.props.toggleLogin} ><Text style={styles.signupButton}>Sign in</Text></TouchableOpacity>
        </View>
        </View>
        </ScrollView>
    </View> 
      );
  }

}


// Creating Profile activity.
class ProfileActivity extends Component
{ 
  constructor(props) {
    super(props)
    this.state = {
      
  }
}

showErrorModal(mess, color){
  this.setState({errorColor:color,errorMess:mess, errorModal:true});
  setTimeout(() =>{
   this.setState({errorModal:false});
 }, 1000); 
}

_onRefresh(){
  this.setState({refreshing: true});
  // this.fetchPostFunction().then(() => {
  //   this.setState({refreshing: false});
  // });
}


setModalVisible(visible, uid, pid) {
  //  this.fetchCommentFunction();
  // alert(pid);
   this.setState({comments: ''});
   this.setState({modalVisible: visible});
   return fetch('https://spiritanssounds.com',  {
  "method": "GET",
  "headers": {
    'Accept': 'application/json',
   'Content-Type': 'application/json',
  }
}).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson === "success"){
         alert(responseJson)
      }else{
        // alert(responseJson); 
        // console.error(responseJson);  
        setTimeout(() =>{
          this.setState({comments: responseJson});
          
          // console.error(this.state.comments);
          // this.setState({sloadey: false});
        }, 5000); 
        
      }
    }).catch((error) => {
      //  console.error(error);
     });
};

fetchUserPost(user_id){
   this.setState({userPostModal: true});
   var t = this.state.posts;
   this.setState({posts:[]});
  // this.setState({userId: this.props.userId})
  // this.setState({loadey: true});
  return fetch('https://spiritanssounds.com/fetchuserpost.php/?user_id='+user_id,  {
    "method": "GET",
    "headers": {
      'Accept': 'application/json',
     'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson === "success"){
          //  alert(responseJson)
        }else{
          // alert(responseJson); 
          // console.error(responseJson);  
          // alert(responseJson);
          // this.setState({loadey: false});
          
          // this.setState({fakePosts:t});
          this.setState({posts: responseJson});
          this.setState({fakePosts:t});
          // console.error(this.state.posts);
        }
      }).catch((error) => {
        //  console.error(error);
       });
};


  getDatas = async () => {
    try {
      var posts =  await AsyncStorage.getItem('@posts');
      // console.error(JSON.parse(posts));
      if(posts !== null){
        var a_posts = JSON.parse(posts);
        this.setState({posts: a_posts});
      }
      // console.error(v);
    } catch (e) {
      // saving error
    }
  }

  // handleConnectivityChange(isConnected){
  //   if (isConnected == true) {
  //     this.setState({ connection_Status: "online" })
  //   }
  //   else {
  //     this.setState({ connection_Status: "offline" })
  //   }
  // };

componentDidMount () {
  
  // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange());

  //   NetInfo.isConnected.fetch().then((isConnected) => {
  //     if (isConnected == true) {
  //       this.setState({ connection_Status: "online" })
  //     }
  //     else {
  //       this.setState({ connection_Status: "offline" })
  //     }
  //   });
  
    let that = this;
  this.getDatas();
  this.setState({userId: this.props.userId})
  this.setState({loadey: true});
  
  return fetch('https://spiritanssounds.com/fetch_post.php',  {
                  method: "POST",
                  headers: {
                    'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    user_id: this.props.userId,
                    post: this.state.post
                 
                  })
  }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({networkErrorColor: '#243754', networkErrorText:''})
        if(responseJson === "success"){
          //  alert(responseJson)
        }else{
          // alert(responseJson); 
          // console.error(responseJson);  
          // alert(responseJson);
          
          that.setState({loadey: false});
          that.setState({posts: responseJson});
          this.storeDatas();
          // console.error(that.state.posts);
        }
      }).catch((error) => {
        //  console.error(error);
        if(error == "TypeError: Network request failed"){
         this.setState({networkErrorColor: '#cc0000', networkErrorText:'No internet connection'});
        }
       });
}


// componentWillUnmount() {
//   NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange())
// }


// clickComment(id){

// };
sendLike(id, value){
  return fetch('https://spiritanssounds.com/like.php/?user_id='+this.props.userId+'&&post_id='+id+'&&value='+value,  {
    "method": "GET",
    "headers": {
      'Accept': 'application/json',
     'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson === "success"){
           alert(responseJson)
        }else{
          // alert(responseJson)
        }   
      }).catch((error) => {
        //  console.error(error);
       });
}

// console.error(this.state.posts);

  placeSubmitHandler(){  
    alert("Message Sent")  ;
  }
showUserPost(){
  this.setState
}
  // sho

   render()
   {
    // const handleConnectivityChange =(
    //   this.handleConnectivityChange()
    // );
    const color = (
      this.state.errorColor
    )
    const comment_icon = (  
      <Iconn name="ios-paper-plane" size={30} color='#243754' style={{paddingRight:11, paddingBottom:5}} onPress={()=>{ this.commentFunction(post.p_id);}}></Iconn>  
     );

     const details = (
        <Text style={{color:'#243754', fontSize:17, paddingLeft:6, marginRight:15, fontFamily:'', fontWeight:'bold'}}>Details</Text>
     );
     
     const deletep = (
      <Text style={{color:'#243754', fontSize:17, paddingLeft:6, marginRight:15, fontWeight:'bold'}}>Delete</Text>
    );
     const logoBox  = (
      <View style={styles.logoBox}>

      <View style={{width:'80%', paddingBottom:3, paddingLeft:15}}>
        <Logo2/>
      </View>
      <View style={{width:'20%', paddingTop:16, paddingRight:15, alignItems: 'flex-end'}}>
        
          { this.state.showSearch == true ?
          <View style={styles.postBox}>
            <Icon name="search" size={20} color='#7B3F00' style={{paddingRight:20, paddingBottom:4}} onPress={() => {this.hideSearch()}}></Icon>
            <Icon name="user" size={30} color='#ffffff' style={{alignItems: "center"}} onPress={() => {this.socialMedia(); this.setState({pModal: true});}}></Icon>
          </View>
          :
          <View style={styles.postBox}>
            <Icon name="search" size={20} color='#ffffff' style={{paddingRight:20, paddingBottom:4}} onPress={() => {this.showSearch()}}></Icon>
            <Icon name="user" size={30} color='#ffffff' style={{alignItems: "center"}} onPress={() => {this.socialMedia(); this.setState({pModal: true});}}></Icon>
          </View>
          }

     </View>
   </View>
     )
     const networkErrorColor = (
       this.state.networkErrorColor
     )

     const networkErrorText = (
       this.state.networkErrorText
     )
      return(
      <View style={styles.container}>
        <SafeAreaView>
        <ScrollView>
                 <View>{logoBox}</View>
   
            {/* closeOnTouchOutside */}
          <ScrollView style={{height:575}}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>{this.fetchPostFunction()}} /> }>
          <View style = { styles.MainContainer, {justifyContent: "flex-start", backgroundColor: '#243754'} }>   
          
        
            <View style= {{borderRadius:10, marginLeft:5, justifyContent: "center", marginRight:5, paddingBottom: 2, backgroundColor: '#243754', color:'#ffffff'}}>
            
            
            
            <View style = {{borderRadius:10, marginLeft:5,  marginRight:5, paddingBottom: 10, backgroundColor: '#243754', color:'#ffffff' }}>
            {this.state.showSearch == true 
            ? 
            <View>
            <Text style={{paddingTop: 5, fontSize: 15, paddingLeft: 12, color:'#ffffff'}}>Input search value</Text>
            <View style = {styles.postBox}>
              <TextInput
              //  Inherit any props passed to it; e.g./ mutiline, nubersofline below
                //  {...this.props}
                editable = {this.state.editable}
                // maxLenght = {10}
                // multiline = {true}
                // numberOfLines = {1}
                onChangeText={(search) => {this.setState({search}); this.search(search)}}
                value={this.state.search}
                placeholder = {'input search value'}
                style={{fontSize: 12, backgroundColor: "#ebebeb", borderRadius: 3, marginLeft: 5, marginRight: 0, width: '80%'}}
              />
                {/* <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Email } </Text> */}
                {/* <Button  style={{width: 30, marginRight: 10, borderRadius:60}}
                                title="SEND"  
                                onPress={() => {this.postFunction();}}
                        />   */}
              {this.state.showClickLoader==true ? 
                // <View  style={{paddingRight:11, paddingBottom:4}} >
                <ActivityIndicator size='large' color='#ffffff'  style={{paddingRight:11, paddingBottom:4}} />
                // </View>
                :
                <Icon name="search" size={20} color='#ffffff' style={{paddingRight:11, paddingBottom:10}}onPress={() => {this.search(this.state.search);}}></Icon>
              }
                </View>
            </View>
            :
            <View>
              <View>
              {this.props.adminUser == 'true' ?
               <View>
                <Text style={{paddingTop: 5, fontSize: 15, paddingLeft: 12, color:'#ffffff'}}>Enter Your Post</Text>
                <View style = {styles.postBox}>
                    <TextInput
                    //  Inherit any props passed to it; e.g./ mutiline, nubersofline below
                      //  {...this.props}
                      editable = {this.state.editable}
                      // maxLenght = {10}
                      multiline = {true}
                      numberOfLines = {1}
                      onChangeText={(wpost) => {this.setState({wpost});}}
                      value={this.state.wpost}
                      placeholder = {'post'}
                      style={{maxHeight:150, fontSize: 12, backgroundColor: "#ebebeb", borderRadius: 3, marginLeft: 5, marginRight: 0, width: '80%'}}
                    />
                      {/* <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Email } </Text> */}
                      {/* <Button  style={{width: 30, marginRight: 10, borderRadius:60}}
                                      title="SEND"  
                                      onPress={() => {this.postFunction();}}
                              />   */}
                  
                    <Iconn name="ios-paper-plane" size={30} color='#ffffff' style={{paddingRight:11, paddingBottom:10}}onPress={() => {this.setState({editable:false}), this.postFunction();}}></Iconn>
                  </View>
                  <View style={{marginTop:7, marginBottom:0, marginRight:3, marginLeft:3}}>
                      {this.state.showProgress == true ? 
                          <ProgressBarAndroid
                            styleAttr= "Horizontal"
                            color= {this.state.progressColor}
                            indeterminate={false}
                            progress={this.state.searchProgressValue} 
                          />
                      : null }
                    </View> 
                   </View>
                : null }
                </View>
              </View>
              
          }
          </View>
          </View>
          
          <View>
            <SafeAreaView> 
                  <ScrollView
                  >
                    <View>
                      <Text style={{color: '#ffffff', fontSize: 18, paddingLeft: 15, paddingBottom: 4}}>Recent Post</Text>
                    {this.state.searchLoader == true ? <ActivityIndicator size='large' color='#ffffff'  style={{paddingRight:11, paddingBottom:4}}/> : null}
                            {/* <Text style={{color: '#ffffff', fontSize: 18, paddingLeft: 15, paddingBottom: 4}}>{this.props.userName}</Text> */}
                    {this.state.searc == true ? null :
                    <View>
                    { this.state.posts.length < 1 ? <ActivityIndicator size="large" color="#ffffff" /> : <View></View> }
                    </View>
                   }
                    <View>        
                      { this.state.posts.map((post, i) => (
                      <View key={i} style={{backgroundColor: '#243754', marginLeft: 8, marginRight: 8, borderRadius: 10}}>
                        {/* <TouchableOpacity onPress={() => {this.deleteFunction(i)}}><Text>rrrr</Text></TouchableOpacity> */}
                      <View style={{marginBottom: 15, backgroundColor: '#ffffff', borderRadius:10}}>
                          <View style={{backgroundColor: '#874845'}}>

                          <View style={{justifyContent: "center"}}>
                          <TouchableOpacity onPress={() =>{this.fetchUserPost(post.p_uid);}}>
                          <View style = {styles.postBox}>
                              <Text style= {{color :'#ffffff', paddingLeft: 13, fontWeight:'bold', paddingBottom:12, fontSize: 16}}>{post.p_fname}</Text>
                              <Text style ={{color: '#f6f6f6', fontSize: 11, fontStyle:'italic', paddingBottom:11,}}>{post.p_date}</Text>
                              {post.p_uid == this.props.userId ?
                              <ModalDropdown 
                                  options={[deletep]} 
                                  // onSelect={(index,value)=>{this.setState({selected:value})}}
                                  onSelect={() => {this.deleteFunction(i, post.p_id);}}
                                  animated={true}
                                  style={{marginRight:4, marginBottom:8}} 
                                  dropdownStyle={{borderRadius:2, width:150, height:100}} 
                                  dropdownTextStyle={{fontSize:15, borderBottomColor:'#000000'}}
                                  // onSelect={}
                              >
                                  <Text style={{fontSize:25, color:'#f6f6f6', fontWeight:'bold', fontWeight:'bold'}}>...</Text>
                              </ModalDropdown>
                              :
                              <Icon name="check" size={15} color='green' style={{alignItems: "center", fontWeight:'bold', paddingBottom:4}}></Icon> }
                            </View>
                            </TouchableOpacity>
                          </View>
                          
                          </View>
                            <View style={{flex:1, marginTop:9, marginRight:7, marginLeft:7}}>
                          
                                      
                                          
                                          <SafeAreaView>
                                            <ScrollView>
                                              <View style={{fontSize: 14, color: 'grey'}} >
                                              
                                              {
                                                // tt = this.state.posts[i],
                                                // p = tt['post'],
                                               (post.post_num >= 500) ?
                                                  this.state.posts[post.p_id+'show'] == true ? 
                                                    <View>
                                                      <TouchableOpacity 
                                                      onPress = {() => {
                                                        this.setState({showPid: post.p_id, comments:""});
                                                        this.setState({comments:"", showPost: post.post, showName: post.p_fname, showDate: post.p_date, showPid: post.p_id, showi:i, likeNum:post[post.p_id+'like'], dislikeNum:post[post.p_id+'dlike'], c_num:post.c_num  });
                                                        if(this.state.comments == ""){
                                                        // this.setModalVisible(true, this.props.userId, post.p_id);
                                                        this.fetchCommentFunction(true, this.props.userId, post.p_id);
                                                        
                                                        }
                                                        }}
                                                        onLongPress={() => {Clipboard.setString(post.post); this.showCopyModal() }}
                                                        >
                                                      <Autolink
                                                      stripPrefix={false}
                                                      stripTrailingSlash={false}
                                                      truncate={250}
                                                      text = {post.post} 
                                                      />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                         onPress={() => {var po =this.state.posts; po[post.p_id+'show'] = false; this.setState({posts:po});}}
                                                        >
                                                          <Iconn name="ios-arrow-up"
                                                            size={30} color='#000000' style={{alignItems: "center"}}>
                                                          </Iconn>
                                                        </TouchableOpacity>
                                                      
                                                                                                                                                    
                                                    </View>
                                                  : 
                                                    <View>
                                                      <TouchableOpacity 
                                                      onPress = {() => {
                                                        this.setState({showPid: post.p_id, comments:""});
                                                        this.setState({comments:"", showPost: post.post, showName: post.p_fname, showDate: post.p_date, showPid: post.p_id, showi:i, likeNum:post[post.p_id+'like'], dislikeNum:post[post.p_id+'dlike'], c_num:post.c_num  });
                                                        if(this.state.comments == ""){
                                                        // this.setModalVisible(true, this.props.userId, post.p_id);
                                                        this.fetchCommentFunction(true, this.props.userId, post.p_id);
                                                        
                                                        }
                                                        }}
                                                        onLongPress={() => {Clipboard.setString(post.post); this.showCopyModal() }}
                                                        >
                                                        <Autolink
                                                        stripPrefix={false}
                                                        stripTrailingSlash={false}
                                                        truncate={250}
                                                        text = {post.post.slice(0, 650)} 
                                                        />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                        onPress={() => {var po =this.state.posts; po[post.p_id+'show'] = true; this.setState({posts:po})}}
                                                        >
                                                         <Iconn name="ios-arrow-down" 
                                                          size={30} color='#000000' style={{alignItems: "center"}}>
                                                         </Iconn>
                                                        </TouchableOpacity>
                                                      
                                                    </View>
                                              :
                                              <TouchableOpacity 
                                              onPress = {() => {
                                                this.setState({showPid: post.p_id, comments:""});
                                                this.setState({comments:"", showPost: post.post, showName: post.p_fname, showDate: post.p_date, showPid: post.p_id, showi:i, likeNum:post[post.p_id+'like'], dislikeNum:post[post.p_id+'dlike'], c_num:post.c_num  });
                                                if(this.state.comments == ""){
                                                // this.setModalVisible(true, this.props.userId, post.p_id);
                                                this.fetchCommentFunction(true, this.props.userId, post.p_id);
                                                
                                                }
                                                }}
                                                onLongPress={() => {Clipboard.setString(post.post); this.showCopyModal() }}
                                                >
                                                
                                              <Autolink
                                              stripPrefix={false}
                                              stripTrailingSlash={false}
                                              truncate={250}
                                              text = {post.post}
                                              />
                                               </TouchableOpacity>
                                             }
                                              </View>
                                          </ScrollView>
                                          </SafeAreaView>
                                     
                                  
                              </View>
                              {/* <View>
                                <TextInput
                                    //  Inherit any props passed to it; e.g./ mutiline, nubersofline below
                                      //  {...this.props}
                                      maxLenght = {10}
                                      editable = {false}
                                      multiline = {true}
                                      value= '<Autolink text = '+{post.post}+'/>'
                                      style={{maxHeight:150, fontSize: 14, color: 'grey', borderRadius: 20, padding: 4}}
                                    />
                              </View> */}
                          <Text>{ }</Text>
                            <View style={{justifyContent: "center"}}>
                              <View style = {styles.postBox}>
                              <TextInput
                                  editable = {true}
                                  maxLenght = {20}
                                  multiline = {false}
                                  numberOfLines = {1}
                                  onChangeText = {(comment) => {var p = this.state.posts; var pp = p[i]; pp[post.p_id] = comment; this.setState({posts: p});}}
                                  // onChangeText={(comment) => this.state.posts[post.p_id] = comment}
                                  value = {this.state.posts[post.p_id]}
                                  placeholder = {'comment'}
                                  style={{fontSize: 12, backgroundColor: "#ebebeb", borderRadius: 20, marginLeft: 5, marginRight: 0, width: '80%'}}
                                  // { this.: ? }
                                />                                                                                                                                                                          
                                
                              
                            {/* <Button  style={{width: 30, marginRight: 10, borderRadius:60}} title="SEND"  type={post.p_id}
                                        onPress={() => { this.commentFunction(post.p_id);}} */}
                                {/* />   */}
                                <Iconn name="ios-paper-plane" size={30} color='#243754' style={{paddingRight:11, paddingBottom:5}} onPress={()=>{ this.commentFunction(post.p_id, i);}}></Iconn>
                                </View>
                              </View>
                              <View style={styles.postBox}>
                                <View style={{width:'30%', flexDirection: "row"}}>
                                  <Iconn name="md-thumbs-up" size={22} color='#243754' style={{paddingLeft:10, alignItems: "center", fontWeight:'bold', paddingBottom:4, paddingRight:4}}
                                  onPress={()=>{this.likePost(post.p_id, i, post.p_id+'like', post.p_id+'cLike', post.p_id+'dlike', post.p_id+'cDlike');}} ></Iconn>
                                      <Text style={{color:'#7B3F00', fontSize:12, fontStyle:'italic', paddingBottom:0}}>{post[post.p_id+'like'] > 1 ? post[post.p_id+'like']+'  likes' : post[post.p_id+'like']+'  like'}</Text>
                                </View>
                                <View style={{width:'30%', flexDirection: "row"}}>
                                  <Iconn name="md-thumbs-down" size={22} color='#243754' style={{alignItems: "center", fontWeight:'bold', paddingBottom:4, paddingRight:4}}
                                  onPress={()=>{this.disLikePost(post.p_id, i, post.p_id+'dlike', post.p_id+'cDlike', post.p_id+'like', post.p_id+'cLike' );}}></Iconn>
                                      <Text style={{fontSize:12, color:'#7B3F00', fontStyle:'italic', paddingBottom:0}}>{post[post.p_id+'dlike'] > 1 ? post[post.p_id+'dlike']+'  dislikes' : post[post.p_id+'dlike']+'  dislike'}</Text>
                                </View>
                                <View style={{width:'40%', flexDirection: "row", marginRight:35}}>
                                  <Icon name="comments" size={22} color='green' style={{color:'#243754', alignItems: "center", fontWeight:'bold', paddingBottom:4, paddingRight:4}}></Icon>
                                  <Text style={{fontSize:12, color:'#7B3F00', fontStyle:'italic', paddingRight:4}}>{post.c_num > 1 ?post.c_num+' comments' : post.c_num+'  comment' }</Text>
                                </View>
                              </View>
                          </View>
                          
                    </View>
                      ))}
                      </View>
                      


                    </View>
                    {/* <View><Text>{this.posts}</Text></View> */}
                  </ScrollView>
              </SafeAreaView>
          </View>
          </View>
          </ScrollView>
          <View>
            <View style={styles.container}>
              <View style={{backgroundColor: networkErrorColor, width:'100%'}}>
                <Text style={{color:'#ffffff', textAlign:'center'}}>{ this.state.networkErrorText}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        
        {/* </FlatList> */}
        </SafeAreaView>
        </View>
     );
   }
}
 
class LogoutScreen extends Component {
  constructor(props) {
    
    super(props)
      this.state = {
       
      }
      // this.userName = this.state.userName

      // this.toggleLogin = this.toggleLogin.bind(this);
      
    }
    
    
    

  // userLoginFunction =  => {
    userLoginFunction(){
      this.setState({blur: true});
      if(this.state.userName.trim() === ""){
        this.setState({blur: false});
        // this.setState({error: 'email cannot be empty'});
        // null
      }else{
        if(this.state.userName.length < 4){
          this.showErrorModal('Email or password invalid', '#cc0000');
          this.setState({blur: false});
        }else{
           
          if(this.state.userPassword.length < 6){
            if(this.state.userPassword.length == 0){
              null
            }else{
              if(this.state.userPassword.length < 6){
                this.showErrorModal('Email or password invalid', '#cc0000');
              }
            }
          }else{
            this.showSplash();
                  //  alert(this.state.UserEmail);
        const { userName }  = this.state;
        const { userPassword }  = this.state;
        // alert(userEmail);
        // http://192.168.43.91/church/login.php/?useremail="+this.state.userEmail+"&&password="+this.state.userPassword
          return fetch("https://spiritanssounds.com", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             username: userName,
             password: userPassword
          
           })
          
          }).then((response) => response.json())
                .then((responseJson) => {
              // console.error(responseJson);
              // alert("rfgbergbiuv");
                  // If server response message same as Data Matched
                if(responseJson.msg === 'Data Matched')
                  {   
                      var t = 'true';

                          //  AsyncStorage.setItem('login', t);
                           
                          // saving erro
                          // this.setState({login: 'true'});
                          //  console.error(AsyncStorage.getItem('@login'));

                      this.setState({ulogin: true, userId: responseJson.id, fullName : responseJson.fname, userName: responseJson.uname, userEmail: responseJson.email, visible: false, adminUser: responseJson.admin_user});
                      this.storeData();
                      this.hideSplash();
                  }
                  else{
                  // console.error(responseJson)
                  
                  this.setState({error: responseJson});
                  this.showErrorModal(responseJson, '#cc0000')
                  this.setState({visible: false});
                  this.hideSplash();
                  this.setState({blur: false});
                  // this.setState({Lerror: responseJson})
                  }
          
                }).catch((error) => {
                //  console.error(error);
                if(error == "TypeError: Network request failed"){
                  this.setState({blur: true});
                  this.showErrorModal('Your device is not connected to the internet', '#cc0000')
                  this.hideSplash();
                }else{
                  // alert(error);
                  this.hideSplash();
                }
                  this.hideSplash();
                
                });
          }
        }
      }
    
     };

     

     removeValue = async () => {
      try {
        await AsyncStorage.removeItem('@login')
      } catch(e) {
        // remove error
      }
    
      console.log('Done.')
    }

     logoutFunction = () => {
         this.setState({ulogin: false});
         if(this.state.ulogin == 'true'){
          this.removeValue();
         }
        //  this.setState(prevState => ({ ulogin: !prevState.ulogin }))
     };

     hideSplash(){  
      this.setState({   
        visible : false   
      });  
    }  

    showSplash(){  
      this.setState({   
        visible : true   
      });  
     }  

     showAlert(){
      this.setState({
        showAlert: true
      });
    };
   
    hideAlert(){
      this.setState({
        showAlert: false
      });
    };                                  
    showPassword(){
      this.setState({showPassword:false});
      setTimeout(() =>{  
        this.setState({showPassword:true});
      }, 1000);  
    }

    logout(){
      this.props.logoutFunction;
      this.setState({ulogin: 'false'});
    }
    componentDidMount(){
      let that = this;
      that.getData();
    }
    
   showErrorModal(mess, color){
    this.setState({errorColor:color,errorMess:mess, errorModal:true});
    setTimeout(() =>{
     this.setState({errorModal:false});
   }, 1000); 
  }
      render() { 
        const logout = (
          this.props.logoutFunction
        );
        
        const color = (
          this.state.errorColor
        )
        
      return (
        
        this.props.ulogin == 'true' || this.state.ulogin == 'true' ?
        <View>
          <ProfileActivity logoutFunction={logout} fullName={this.state.fullName} userEmail={this.state.userEmail} userName={this.state.userName} userId={this.state.userId} adminUser={this.state.adminUser}/>
          {/* <Text style={{fontSize:60}} onPress={this.logoutFunction}>{this.state.userName}</Text> */}
          {/* <Button title="Click here to Logout" onPress={() => {this.setState({nlogin: false})} } /> */}
        </View>
        :
       <View style={styles.container}>
         <ScrollView stye={{width:'100%', height:'100%'}}>
           <View style={{flex:1, marginTop:30, marginBottom:30}}>
            
            <View style={styles.container}>
             <Logo/>
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 10,}}>
               <View style={styles.SectionStyle}>
                <TouchableOpacity
                  style={styles.ImageStyle}>
                    <Icon name="user" color="#874845" size={18} style={{paddingBottom:7}}/>
                  </TouchableOpacity>          
                  <TextInput 
                  // style={styles.inputBox} 
                  style={{ flex: 1, backgroundColor:'#ffffff'}}
                  underlineColorAndroid='rgba(0,0,0,0)' 
                  placeholder="Username"
                  placeholderTextColor='#243754'
                  // selectionColor="#243754"
                  selectionColor="#000000"
                  // keyboardTypes="email.address"
                    // keyboardType='email-address'
                  value = {this.state.userName}
                  // autoCompleteType = 'email'
                  autoCorrect={false}
                  autoFocus={false}
                  onSubmitEditing={()=> this.password.focus()}
                  onChangeText={userName => this.setState({userName})}
                  blurOnSubmit ={this.state.blur}
                  />
               </View>
               <View style={styles.SectionStyle}>
                <TouchableOpacity
                  style={styles.ImageStyle}
                  onPress={() =>{this.showPassword()}}
                  >
                    <Icon name="eye" color="#874845" size={18} style={{paddingBottom:7}}/>
                  </TouchableOpacity>
                <TextInput
                //  style={styles.inputBox} 
                style={{ flex: 1, backgroundColor:'#ffffff', borderTopEndRadius:6, borderTopStartRadius:0, borderBottomStartRadius:6, borderBottomEndRadius:0}}
                underlineColorAndroid="transparent" 
                placeholder="Password"
                secureTextEntry={this.state.showPassword}
                // placeholderTextColor='#243754'
                // selectionColor="#243754"
                selectionColor="#000000"
                //  'eye-solid'  
                ref={(input) => this.password = input}
                onChangeText={userPassword => this.setState({userPassword})}
                blurOnSubmit ={this.state.blur}
                inlineImageLeft='search_icon'
                />
              </View>
               
               {/* <TouchableOpacity onPress={this.userLoginFunction} style={styles.button} >
                 <Icon name="sign-in" color="#ffffff" size={25} onPress={() => {this.props.logoutFunction}}>  </Icon>
                 <Text style={styles.buttText}>Login</Text>
               </TouchableOpacity> */}
               <View style={{backgroundColor:''}}>
               <Icon.Button name="sign-in" backgroundColor='#874845' borderWidth={1} borderColor='#243754' style={{alignContent:'center',  borderRadius:6, alignItems:'center'}} size={20} onPress={() => {this.userLoginFunction();}}>
                <Text style={{fontFamily: 'Arial', textAlign:'center', fontSize: 15, color: '#fff'}}>Login</Text>  
               </Icon.Button>  
               </View>
             </View>
             <View style={styles.signupTextCont}>
                <Text style={styles.signupText} >Don't have an account yet?  </Text>
                <TouchableOpacity onPress={this.props.toggleLogin}> 
                   <Text style={styles.signupButton, {color:'#874845'}}>Signup</Text>
                </TouchableOpacity>
                
                {/* <Text> {this.state.Test} </Text> */}
                {/* <Button title='Logout' onPress={this.props.toggleLogin} /> */}
             </View>
             <TouchableOpacity onPress={() => {this.setState({forgetPwdModal: true})}}> 
                  <Text style={styles.signupButton, {fontStyle:'italic', color:'#ffffff'}}>Forgot Password</Text>
             </TouchableOpacity>
         </View>
         

            
         {/* {
                (this.state.isVisible === true)? Splash : null
              } */}
            </View>
          </ScrollView>
       </View>
      );
    
  }
}

// profileScreen (){
//   constructor(props) {
    
//     super(props)
//       this.state = {
       
//       }
     
      
//     }
// }
