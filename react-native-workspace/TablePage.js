import React, { Component, Children } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Col,
  Cell,
  Cols,
} from "react-native-table-component"; // table Component
import AsyncStorage from "@react-native-community/async-storage";
import { AppLoading } from "expo";
import { Card } from "react-native-shadow-cards";
import { Badge } from "react-native-elements";
import * as Font from "expo-font";
import { BadgeWeights } from "./BadgeWeights";

const CellDesign = (text) => {
  const styles = StyleSheet.create({
    textStyle: {
      backgroundColor: "#fffeb3",
      alignItems: "center",
      padding: 10,
    },
  });

  return (
    <View style={styles.textStyle}>
      <Text>{text}</Text>
    </View>
  );
};

export class TablePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assetsLoaded: false,
      tableHead: {},
      widthArr: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
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

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
      "NanumGothic-Regular": require("./assets/fonts/NanumGothic-Regular.ttf"),
      "NanumGothic-Bold": require("./assets/fonts/NanumGothic-Bold.ttf"),
    });

    this.setState({ assetsLoaded: true });
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

  setTableData = (per, pbr, roa, roe) => {
    //  AsyncStorage
  };

  whatColor = (weight) => {
    if (weight >= 50) {
      return "error";
    } else if (weight >= 30) {
      return "warning";
    } else if (weight >= 10) {
      return "primary";
    } else {
      return "success";
    }
  };

  render() {
    const state = this.state;
    let tableData = {};
    let tableScrollData = {};
    const hey = () => {
      let nameData = ["기업이름"];
      let codeData = ["종목코드"];
      let perdata = ["PER"];
      let pbrdata = ["PBR"];
      let operatingdata = ["영업이익률"];
      let roadata = ["ROA"];
      let roedata = ["ROE"];
      let reverseRatiodata = ["유보율"];
      let debtRatiodata = ["부채비율"];

      this.props.dataSet.map((val, i) => {
        nameData.push(val.cmpName);
        codeData.push(val.code);
        perdata.push(val.per);
        pbrdata.push(val.pbr);
        operatingdata.push(val.operatingProfitRatio);
        roadata.push(val.roa);
        roedata.push(val.roe);
        reverseRatiodata.push(val.reserveRatio);
        debtRatiodata.push(val.debtRatio);
      });

      tableData = [nameData, codeData];

      tableScrollData = [
        perdata,
        pbrdata,
        roadata,
        roedata,
        debtRatiodata,
        operatingdata,
        reverseRatiodata
      ];
      console.log('first: ', tableScrollData[6]);
    };

    hey();

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignContent: "center",
      },
      tableContainer: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        alignContent: "center",
        flexDirection: "row",
      },
      scrollTable: { paddingRight: 130 },
      header: { height: 50, backgroundColor: "#ffb81c" },
      text: { textAlign: "center", fontWeight: "100" },
      // discription: { textAlign: 'left', fontSize: 25, backgroundColor: '#5e514d', color: 'white', padding: 3, paddingHorizontal: 20, position: 'absolute', translateX: -20, translateY: 10 },
      dataWrapper: { marginTop: -1 },
      row: { height: 51.6 },
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
        borderBottomColor: "#ffb81c",
        borderBottomWidth: 0,
      },
      headtexttable: {
        flex: 1,
        textAlign: "center",
        paddingLeft: 15,
        borderBottomColor: "#ffb81c",
        borderBottomWidth: 3,
      },
      modal: {
        backgroundColor: "#ffffff",
        borderWidth: 5,
        borderColor: "#ffffff", //#8D9093
        padding: 20,
        paddingHorizontal: 10,
        borderStyle: "solid",
        borderColor: "#ffb81c",
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
      modifyBtn: {
        marginHorizontal: 30,
        marginBottom: 30,
        color: '#ffb81c',
        fontFamily: "NanumGothic-Bold"
      },
    });

    const { assetsLoaded, weights } = this.state;

    return (
      <View style={styles.container}>
        {console.log('tableScrollData: ', tableScrollData[6], 'tableData: ', tableData[0])}
        <BadgeWeights propsWeights={weights} />

        <View style={styles.tableContainer}>
          <Table
            borderStyle={{ borderBottomWidth: 3, borderBottomColor: "#C1C0B9" }}
          >
            <TableWrapper>
              <Cols
                navigation={this.props.navigation}
                data={tableData}
                heightArr={state.widthArr}
                widthArr={[68, 59]}
                style={[styles.row]}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
          <View style={styles.scrollTable}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Table
                borderStyle={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#C1C0B9",
                }}
              >
                <TableWrapper>
                  <Cols
                    navigation={this.props.navigation}
                    data={tableScrollData}
                    heightArr={state.widthArr}
                    widthArr={[50, 43, 43, 48, 55, 65, 55]}
                    style={[styles.row]}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
            </ScrollView>
          </View>
        </View>

        <View style={styles.modifyBtn}>
            <Button
              // style={assetsLoaded? [styles.modifyBtn, {fontFamily: "NanumGothic-Bold"}]:styles.modifyBtn}
              color='#ffb81c'
              title="수치 변경하기"
              onPress={() => this.props.navigation.navigate("Modify")}
            />
        </View>
      </View>
    );
  }
}
