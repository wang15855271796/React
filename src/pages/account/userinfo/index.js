import React, { Component } from 'react';
import { Text,View,TouchableOpacity } from "react-native";
import { male, female } from "../../../res/font/iconSvg";
import {pxToDp} from "../../../utils/zhuanhuan";
import SvgUri from "react-native-svg-uri";
import { Input } from "react-native-elements";
class UserInfo extends Component {

  state = {
    // 昵称
    nickname: "",
    // 性别
    gender: "男",
    // 生日
    birthday: "",
    // 城市
    city: "",
    // 头像
    header: "",
    // 经度
    lng: "",
    // 纬度
    lat: "",
    // 详细的地址
    address: ""
  }

  // 选择性别
  chooeseGender = (gender)=> {
    this.setState({ gender });
  }

  render() {
    const { gender ,nickname} = this.state;
    return (
      <View style={{ backgroundColor: "#fff", flex: 1, padding: 25 }}>
        <Text style={{ fontSize: 20, color: "#666", fontWeight: "bold" }} >填写资料</Text>
        <Text style={{ fontSize: 20, color: "#666", fontWeight: "bold" }} >提升我的魅力</Text>
        <View style={{ marginTop: pxToDp(20) }}>
          <View style={{ justifyContent: "space-around", width: "60%", flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity onPress={this.chooeseGender.bind(this, "男")} style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: gender === "男" ? "red" : "#eee",
              justifyContent: 'center', alignItems: 'center'
            }} >
              <SvgUri svgXmlData={male} width="36" height="36" />
              <SvgUri svgXmlData={female} width="36" height="36" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.chooeseGender.bind(this, "女")} style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: gender === "女" ? "red" : "#eee",
              justifyContent: 'center', alignItems: 'center'
            }} >

            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Input
            value={nickname}
            onChangeText={(nickname)=> {this.setState({nickname})}}
            placeholder={"请输入昵称"}
          />
        </View>
      </View>
    );
  }
}


export default UserInfo;
