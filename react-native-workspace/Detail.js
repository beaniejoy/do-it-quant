import React, { Component, useState, Suspense } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Button,
  ScrollView,
  Clipboard,
  Alert,
  TouchableOpacity,
  Dimensions,
  Platform,
  AsyncStorage,
} from "react-native";
// import {Clipboard} from "@react-native-community/clipboard";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AnimatedSplash from "react-native-animated-splash-screen"; // AnimatedSplash Component
import { Table, TableWrapper, Row, Col } from "react-native-table-component"; // table Component
import { TextInput } from "react-native-paper";
import { isRequired } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType";
import { Overlay, ListItem } from "react-native-elements";
import { Card } from "react-native-shadow-cards";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

let deviceWidth = Dimensions.get("window").width;


export class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmpclip: "",
      detailA: [],
      detailB: [],
      isResponse: false,
    };
  }

  render() {
    const { tmpclip } = this.props;
    const { detailA } = this.props;
    const { detailB } = this.props;

    const ClipBoard = () => {
      const [visible, setVisible] = useState(false);

      var clip = tmpclip;

      const showModal = () => {
        setVisible(true);
        setVisible(false);
        // setTimeout(() => setVisible(false), 900);
        setTimeout(() => copyToClipboard(), 1000);
      };
      const hideModal = () => setVisible(false);

      const copyToClipboard = () => {
        Clipboard.setString(clip);
      };

      return (
        <View>
          <TouchableOpacity onPress={showModal}>
            <FontAwesome
              name="clipboard"
              size={deviceWidth > 400 ? 20 : 15}
              style={{ paddingTop: 10, paddingRight: 10 }}
              color="black"
            />
          </TouchableOpacity>
          <Overlay isVisible={visible} onBackdropPress={hideModal}>
            <Text>종목코드가 복사되었습니다.</Text>
          </Overlay>
        </View>
      );
    };

    const CompanyDetailA = () => {
      var data = detailA;

      const styles = StyleSheet.create({
        containerWrap800: {
          flex: 1,
          paddingTop: "5%",
          paddingBottom: "4%",
          paddingRight: "1%",
        },
        containerWrap400: {
          flex: 1,
          paddingTop: "7%",
          paddingBottom: "6%",
          paddingLeft: "2%",
          paddingRight: "1%",
        },
        containerWrap300: {
          flex: 1,
          paddingTop: "7%",
          paddingBottom: "6%",
          paddingLeft: "2%",
          paddingRight: "1%",
        },
        lineWrap: {
          flex: 1,
          flexDirection: "row",
          // marginBottom: 10,
          justifyContent: "center",
        },
        iconWrap: {
          flex: 0.5,
          marginLeft: "8%",
          justifyContent: "center",
        },
        nameWrap: {
          flex: 1.2,
          justifyContent: "center",
        },
        dataWrap: {
          flex: 4,
          justifyContent: "center",
        },
        cardCompanyDetailATitle: {
          flex: 1,
          justifyContent: "center",
          marginLeft: "10%",
          flexDirection: "row",
          ...Platform.select({
            ios: {
              marginVertical: "4%",
            },
            android: {
              marginVertical: "7%",
            },
          }),
        },
        cardCompanyDetailATitleText: {
          fontWeight: "bold",
          ...Platform.select({
            ios: {
              fontSize: 15,
            },
            android: {
              fontSize: 12,
            },
          }),
        },
        cardCompanyDetailAContent: {
          justifyContent: "center",
          ...Platform.select({
            ios: {
              flex: 3.4,
              marginVertical: "4%",
              paddingRight: 30,
            },
            android: {
              flex: 2.5,
              marginVertical: "7%",
              paddingLeft: 10,
              paddingRight: 10,
            },
          }),
        },
        cardCompanyDetailAContentText: {
          ...Platform.select({
            ios: {
              fontSize: 15,
            },
            android: {
              fontSize: 12,
            },
          }),
        },
      });

      return (
        <View
          style={
            deviceWidth > 800
              ? styles.containerWrap800
              : deviceWidth > 400
              ? styles.containerWrap400
              : styles.containerWrap300
          }
        >
          <View style={styles.lineWrap}>
            <View style={styles.iconWrap}>
              <AntDesign
                name="pushpino"
                size={deviceWidth > 800 ? 22 : deviceWidth > 400 ? 18 : 15}
                color="#8E744A"
              />
            </View>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  { fontWeight: "bold" },
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "기업명" : data[0].name}
              </Text>
            </View>
            <View
              style={[
                styles.dataWrap,
                deviceWidth > 800 ? {} : { paddingLeft: "10%" },
              ]}
            >
              <Text
                style={[
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "로딩중..." : data[0].data}
              </Text>
            </View>
          </View>
          <View style={styles.lineWrap}>
            <View style={styles.iconWrap}>
              <AntDesign
                name="pushpino"
                size={deviceWidth > 800 ? 22 : deviceWidth > 400 ? 18 : 15}
                color="#8E744A"
              />
            </View>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  { fontWeight: "bold" },
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "종목코드" : data[1].name}
              </Text>
            </View>
            <View
              style={[
                styles.dataWrap,
                deviceWidth > 800 ? {} : { paddingLeft: "10%" },
              ]}
            >
              <Text
                style={[
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "로딩중..." : data[1].data}
              </Text>
            </View>
          </View>
          <View style={styles.lineWrap}>
            <View style={styles.iconWrap}>
              <AntDesign
                name="pushpino"
                size={deviceWidth > 800 ? 22 : deviceWidth > 400 ? 18 : 15}
                color="#8E744A"
              />
            </View>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  { fontWeight: "bold" },
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "업종" : data[2].name}
              </Text>
            </View>
            <View
              style={[
                styles.dataWrap,
                deviceWidth > 800 ? {} : { paddingLeft: "10%" },
              ]}
            >
              <Text
                style={[
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "로딩중..." : data[2].data}
              </Text>
            </View>
          </View>
          <View style={styles.lineWrap}>
            <View style={styles.iconWrap}>
              <AntDesign
                name="pushpino"
                size={deviceWidth > 800 ? 22 : deviceWidth > 400 ? 18 : 15}
                color="#8E744A"
              />
            </View>
            <View style={styles.nameWrap}>
              <Text
                style={[
                  { fontWeight: "bold" },
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "상세설명" : data[3].name}
              </Text>
            </View>
            <View
              style={[
                styles.dataWrap,
                deviceWidth > 800 ? {} : { paddingLeft: "10%" },
              ]}
            >
              <Text
                style={[
                  deviceWidth > 800
                    ? { fontSize: 21 }
                    : deviceWidth > 400
                    ? { fontSize: 16 }
                    : { fontSize: 13 },
                ]}
              >
                {data.length == 0 ? "로딩중..." : data[3].data}
              </Text>
            </View>
          </View>
        </View>
      );
    };

    const CompanyDetailB = () => {
      var data = detailB;

      const styles = StyleSheet.create({
        contentText: {
          fontWeight: "bold",
          ...Platform.select({
            ios: {
              margin: "4%",
            },
            android: {
              margin: 4,
            },
          }),
        },
      });

      return (
        <View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={
              deviceWidth < 400 ? { marginBottom: 70 } : { marginBottom: 30 }
            }
          >
            {data.map((l, i) => (
              <ListItem
                style={{ marginRight: "5%", marginLeft: "5%" }}
                key={i}
                leftIcon={
                  <FontAwesome
                    name="won"
                    size={deviceWidth > 400 ? 18 : 15}
                    color="#8E744A"
                  />
                }
                title={
                  <Text
                    style={[
                      styles.contentText,
                      deviceWidth > 800
                        ? { fontSize: 18 }
                        : deviceWidth > 400
                        ? {}
                        : { fontSize: 13 },
                    ]}
                  >
                    {l.name}
                  </Text>
                }
                rightSubtitle={l.data}
                bottomDivider
              />
            ))}
          </ScrollView>
        </View>
      );
    };

    const styles = StyleSheet.create({
      titleContainer: {
        flex: 1,
        backgroundColor: "#ffcc00",
        justifyContent: "center",
        alignItems: "center",
      },
      iconWrap400up: {
        borderRadius: 15,
        ...Platform.select({
          ios: {
            height: 80,
            width: 80,
          },
          android: {
            height: deviceWidth / 6,
            width: deviceWidth / 6,
          },
        }),
      },
      iconWrap400down: {
        height: deviceWidth / 7,
        width: deviceWidth / 7,
      },
      titleIcon: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 15,
      },
      title: {
        color: "white",
        fontWeight: "bold",
        paddingTop: 10,
        fontSize: 15,
      },
      bodyContainer: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
      },
      cardCompanyDetailA: {
        flex: 1,
        marginTop: 15,
        paddingTop: 0,
        width: "90%",
        borderRadius: 8,
        flexDirection: "row",
      },
      cardCompanyDetailB: {
        flex: 3,
        marginTop: 15,
        marginBottom: 10,
        width: "90%",
      },
      shadow: {
        ...Platform.select({
          ios: {
            shadowColor: "#4d4d4d",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.4,
            shadowRadius: 4,
          },
          android: {
            shadowColor: "#4d4d4d",
            elevation: 5,
          },
        }),
      },
    });

    let imgUri = 'http://d2dzfaqwlhqkso.cloudfront.net/do-it-quant/' + detailA[1].data + '.jpg'
    Image.getSize(imgUri, () => {this.setState({isResponse: true})}, () => {console.log('실패')});

    const { isResponse } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.titleContainer}>
          <View
            style={
              deviceWidth < 400 ? styles.iconWrap400down : styles.iconWrap400up
            }
          >
            <Image
              style={styles.titleIcon}
              source={
                isResponse? {uri: imgUri}: require('./images/default.jpg')
              }
            />
          </View>
          <Text
            style={[
              styles.title,
              deviceWidth < 800 && deviceWidth > 400
                ? { fontSize: 14 }
                : { fontSize: 12 },
            ]}
          >
            기업 상세 정보
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <Card
            title="companyDetailA"
            style={[styles.cardCompanyDetailA, styles.shadow]}
          >
            <Suspense fallback={<Text>dd</Text>}>
              <CompanyDetailA />
            </Suspense>
            <ClipBoard></ClipBoard>
          </Card>
          <Card
            title="companyDetailB"
            style={[styles.cardCompanyDetailB, styles.shadow]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  alignSelf: "flex-start",
                  flex: 1,
                  paddingTop: 15,
                  paddingLeft: 10,
                }}
              >
                단위: 억원
              </Text>
              <MaterialIcons
                name="info-outline"
                size={24}
                color="#B2B2B2"
                style={{
                  paddingTop: 10,
                  alignSelf: "flex-end",
                  paddingRight: 10,
                }}
              />
            </View>
            <CompanyDetailB></CompanyDetailB>
          </Card>
        </View>
      </View>
    );
  }
}
