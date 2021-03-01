import React, { Component } from 'react';
import { View, Text, StatusBar, Image ,StyleSheet} from 'react-native';
import { pxToDp } from "../../../utils/zhuanhuan";
import validator from "../../../utils/validator";
import { Input } from 'react-native-elements';
import ThButton from '../../../component/ThButton'
import {BASE_URI,ACCOUNT_LOGIN,ACCOUNT_VALIDATEVCODE} from "../../../utils/pathMap";
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import request from "../../../utils/request";
import Toast from "teaset/components/Toast/Toast";
export default class Login extends Component {
    state = {
      phoneNum: '',
      phoneValid: true,
      showLogin:true,
      // 验证码输入框的值
      vCodeTxt: "",
      btTex: "",
      // 是否在倒计时中
      isCountDowning:false
    }

  phoneChange = (phoneNum) => {
    this.setState({ phoneNum })
  }

    //获取验证码
  phoneNumberSubmitEditing = async ()=> {
    const {phoneNum} = this.state
    const phoneValid = validator.validatePhone(phoneNum);
    console.log(phoneNum);
    if(!phoneValid) {
      this.setState({phoneValid})
      return
    }else {
      const res = await request.post(ACCOUNT_LOGIN, { phone: phoneNum });
      if(res.code == "10000") {
        this.setState({showLogin:false})
        //开启定时器
        this.countTimer()
      }else {

      }
    }
  }

  countTimer = ()=> {
    if(this.state.isCountDowning) {
      return
    }
    this.setState({isCountDowning:true})
    let seconds = 5;

    this.setState({btTex:`重新获取${seconds}s`})
    let timeId = setInterval(()=> {
      seconds--
      if(seconds === 0) {
        this.setState({btTex:"重新获取",isCountDowning:false})
        clearInterval(timeId)
      }else {
        this.setState({btTex:`重新获取${seconds}s`})
      }
    },1000)

    console.log("zhixing");
  }

  //验证码是否正确
  onVcodeSubmitEditing = async ()=> {
    const { vCodeTxt,phoneNum}=this.state;
    if(vCodeTxt.length!=6){
      Toast.message("验证码不正确",1000,"center");
      return;
    }

    const res=await request.post(ACCOUNT_VALIDATEVCODE,{
      phone:phoneNum,
      vcode:vCodeTxt
    });
    if(res.code!="10000"){
      console.log(res);
      return;
    }

    if(res.data.isNew){
      //  新用户 UserInfo
      this.props.navigation.navigate("UserInfo");

    }else{
      alert('ss')
      //  老用户
      // this.props.navigation.reset({
      //   routes:[{name:"Tabbar"}]
      //
      // })
    }

  }
  //渲染登录界面
  renderLogin = ()=> {
      const {phoneValid} = this.state
      return (
        <View>
          <View style = {{ fontSize: 18, color: '#666666', padding: 20 }}>
            <Text>手机号码登录注册</Text>
          </View>
          <Input
            placeholder = '输入手机号'
            maxLength = { 11 }
            keyboardType = { "phone-pad" }
            errorMessage = {  phoneValid ? "" : "手机格式不正确" }
            onSubmitEditing = { this.phoneNumberSubmitEditing }
            onChangeText = { this.phoneChange }
            leftIcon = {
              { type: 'font-awesome', name: 'phone', color: '#ccc' }
            }
          />

          <View>
            <ThButton onPress={this.phoneNumberSubmitEditing} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>获取验证码</ThButton>
          </View>
        </View>
      )
  }

  //重新获取验证码
  repGetVcode = ()=> {
    this.countTimer()
  }

  //渲染注册界面
  renderRegister = ()=> {
    const { vCodeTxt,btTex,isCountDowning,phoneNum } = this.state;
      return (
        <View>
          <View><Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold", marginTop: 10, marginLeft:30}}>输入6位验证码</Text></View>
          <View style={{ marginTop: pxToDp(10) , marginLeft: 30}}><Text style={{ color: "#888" }}>已发到:+86 {phoneNum}</Text></View>
          <View>
            <CodeField
              rootStyle={{margin:30}}
              cellCount={6}
              onSubmitEditing={this.onVcodeSubmitEditing}
              onChangeText={this.onVcodeChangeText}
              value={vCodeTxt}
              keyboardType="number-pad"
              renderCell={({ index, symbol, isFocused }) => (
              <Text key={index} style={[styles.cell, isFocused && styles.focusCell]}>{symbol || (isFocused ? <Cursor /> : null)}</Text>)} />
          </View>
          <View style={{ marginTop: pxToDp(10) }}>
            <ThButton disabled={isCountDowning}  onPress={this.repGetVcode} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>{btTex}</ThButton>
          </View>
        </View>
      )
  }

  // 验证码输入框的值改变事件
  onVcodeChangeText = (vCodeTxt) => {
    this.setState({ vCodeTxt });
  }

    render() {
      const {showLogin} = this.state
        return (
          <View>
            <StatusBar backgroundColor = 'transparent' translucent = { true } />
            <Image style = {{ width: "100%", height: pxToDp(200) }} source = { require('../../../res/bg_login.jpg') } />
            {showLogin ? this.renderLogin() : this.renderRegister()}
          </View>

        )
    }


}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: "#7d53ea"
  },
  focusCell: {
    borderColor: '#7d53ea'
  },
});
