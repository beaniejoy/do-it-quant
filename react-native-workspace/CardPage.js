import React, { Component } from "react";
import { Card } from "react-native-shadow-cards";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Button,
  ScrollView,
  Alert,
  NativeModules,
  RecyclerViewBackedScrollView,
} from "react-native";
import { AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BadgeWeights } from "./BadgeWeights";
export class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "기업이름",
        "상품코드",
        "PER",
        "PBR",
        "ROA",
        "ROE",
        "Head7",
        "Head8",
        "Head9",
      ],
      widthArr: [81, 81, 62, 62, 62, 62, 62, 62, 62],
      isVisible: false,
      pageState: true,
      dataSet: this.props.dataSet,
      weights: {
        wPer: 0,
        wPbr: 0,
        wRoa: 0,
        wRoe: 0,
        wDebtRatio: 0,
        wOperMargin: 0,
        wReserveRatio: 0,
      },
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({
      weights: { ...this.props.weights },
    });
  }
  setVisibleTrue = () => {
    this.setState({ isVisible: true });
  };
  setVisibleFalse = () => {
    this.setState({ isVisible: false });
  };
  render() {
    const moveToDetail = (cmpName) => {
      AsyncStorage.getItem(cmpName + "Info").then((data) => {
        data = JSON.parse(data);
        const tmpclip_ = data.code;
        const detailA_ = [
          {
            name: "기업명",
            data: data.cmpName,
          },
          {
            name: "종목코드",
            data: data.code,
          },
          {
            name: "업종",
            data: data.market,
          },
          {
            name: "상세설명",
            data: data.description,
          },
        ];
        const detailB_ = [
          {
            name: "총자산",
            data: data.totalAsset,
          },
          {
            name: "총자본",
            data: data.totalEquity,
          },
          {
            name: "총부채",
            data: data.totalDebt,
          },
          {
            name: "매출액",
            data: data.sales,
          },
          {
            name: "영업이익",
            data: data.operatingProfit,
          },
          {
            name: "당기순이익",
            data: data.netIncome,
          },
          {
            name: "이익잉여금",
            data: data.retainedEarnings,
          },
        ];
        setTimeout(() => {
          this.props.navigation.navigate("Details", {
            tmpclip: tmpclip_,
            detailA: detailA_,
            detailB: detailB_,
            // cmpName: JSON.stringify(this.props.dataSet[i].cmpName).replace('"', '').replace('"', '')
          });
        }, 500);
      });
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 0,
        alignContent: "center",
      },
      cardSection: {
        padding: 16,
        paddingTop: 0,
      },
      header: { height: 50, backgroundColor: "#FFB81C" },
      text: { textAlign: "center", fontWeight: "100" },
      dataWrapper: { marginTop: -1 },
      row: { height: 51.6, backgroundColor: "#ECF0F1" },
      semiheader: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 15,
        borderBottomWidth: 3,
        borderBottomColor: "gray",
        marginBottom: 5,
      },
      headtextmain: {
        flex: 1,
        textAlign: "center",
        paddingRight: 15,
        borderBottomColor: "#FFB81C",
        borderBottomWidth: 0,
      },
      headtexttable: {
        flex: 1,
        textAlign: "center",
        paddingLeft: 15,
        borderBottomColor: "#FFB81C",
        borderBottomWidth: 3,
      },
      modal: {
        // flex: 1,
        // alignItems: 'center',
        backgroundColor: "#FFFFFF",
        borderWidth: 5,
        borderColor: "#FFFFFF", //#8D9093
        padding: 20,
        paddingHorizontal: 10,
        borderStyle: "solid",
        borderColor: "#FFB81C",
        overflow: "visible",
      },
      test: {
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: "white",
        padding: 0,
        marginHorizontal: 30,
        borderRadius: 2,
      },
      card: {
        flex: 1,
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 4,
        width: "98%",
        marginBottom: 5,
        borderRadius: 8,
        flexDirection: "row",
      },
      shadow: {
        ...Platform.select({
          ios: {
            shadowColor: "#4D4D4D",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.4,
            shadowRadius: 4,
          },
          android: {
            shadowColor: "#4D4D4D",
            elevation: 5,
          },
        }),
      },
      rankImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: "contain",
      },
      rankImage2: {
        flex: 0.7,
        height: undefined,
        width: undefined,
        resizeMode: "contain",
      },
    });
    var src1 = "./images/1.png";
    var numL = [
      require(src1),
      require("./images/2.png"),
      require("./images/3.png"),
      require("./images/4.png"),
      require("./images/5.png"),
      require("./images/6.png"),
      require("./images/7.png"),
      require("./images/8.png"),
      require("./images/9.png"),
      require("./images/10.png"),
    ];

    const { weights } = this.state;

    return (

      <View style={styles.container}>
        <BadgeWeights propsWeights={weights} />
        {/* <ScrollView Virtical={true}> */}
        <View style={styles.cardSection}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.dataSet.map((l, i) => (
              <TouchableOpacity
                onPress={() => {
                  moveToDetail(
                    JSON.stringify(this.props.dataSet[i].cmpName)
                      .replace('"', "")
                      .replace('"', "")
                  );
                }}
              >
                <Card style={[styles.card, styles.shadow]} key={i}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "flex-start",
                    }}
                  >
                    <Image
                      source={numL[i]}
                      style={i < 3 ? styles.rankImage : styles.rankImage2}
                    />
                  </View>
                  <View style={{ flex: 5, marginLeft: 4 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      기업명:{" "}
                      {JSON.stringify(this.props.dataSet[i]) == undefined
                        ? "새로고침 해주세요"
                        : JSON.stringify(this.props.dataSet[i].cmpName)
                            .replace('"', "")
                            .replace('"', "")}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      종목코드:{" "}
                      {JSON.stringify(this.props.dataSet[i]) == undefined
                        ? "새로고침 해주세요"
                        : JSON.stringify(this.props.dataSet[i].code)
                            .replace('"', "")
                            .replace('"', "")}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* <Card
                title="companyRank"
               
            >
                <Text>{JSON.stringify(state.dataSet[0])}</Text>
            </Card>
            <Card
                title="companyDetailA"
                style={[styles.cardCompanyDetailA, styles.shadow]}
            >
                <Text>{JSON.stringify(state.dataSet[1])}</Text>
            </Card>
            <Card
                title="companyDetailA"
                style={[styles.cardCompanyDetailA, styles.shadow]}
            >
                <Text>{JSON.stringify(this.props.dataSet[2])}</Text>
            </Card>
            <Card
                title="companyDetailA"
                style={[styles.cardCompanyDetailA, styles.shadow]}
            >
                <Text>{JSON.stringify(this.props.dataSet[3])}</Text>
            </Card>
            <Card
                title="companyDetailA"
                style={[styles.cardCompanyDetailA, styles.shadow]}
            >
                <Text>{JSON.stringify(this.props.dataSet[4])}</Text>
            </Card> */}
        {/* </ScrollView> */}
      </View>
    );
  }
}
