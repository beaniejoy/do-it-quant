import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AnimatedSplash from "react-native-animated-splash-screen"; // AnimatedSplash Component
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AsyncStorage } from "react-native";
import { Modify } from "./Modify";
import { Detail } from "./Detail";
import { CardPage } from "./CardPage";
import { TablePage } from "./TablePage";

let navigationForSend;
let calArr = [];
let calArr10 = [];
let cardRef;
let tableRef;

let globalWeights = {
  wPer: 0,
  wPbr: 0,
  wRoa: 0,
  wRoe: 0,
  wDebtRatio: 0,
  wOperMargin: 0,
  wReserveRatio: 0,
};

const calculateData = (a, b) => {
  let gw = globalWeights;
  let totalA =
    gw.wPer * a.rankPer +
    gw.wPbr * a.rankPbr +
    gw.wRoa * a.rankRoa +
    gw.wRoe * a.rankRoe +
    gw.wOperMargin * a.rankOper +
    gw.wDebtRatio * a.rankDebtRatio +
    gw.wReserveRatio * a.rankReserveRatio;
  let totalB =
    gw.wPer * b.rankPer +
    gw.wPbr * b.rankPbr +
    gw.wRoa * b.rankRoa +
    gw.wRoe * b.rankRoe +
    gw.wOperMargin * b.rankOper +
    gw.wDebtRatio * b.rankDebtRatio +
    gw.wReserveRatio * b.rankReserveRatio;

  if (totalA == totalB) {
    return 0;
  }
  return totalA > totalB ? 1 : -1;
};

let setSortingTableData = () => {
  calArr.sort(calculateData);
  calArr10 = calArr.slice(0, 10);
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    navigationForSend = this.props.navigation;
    this.state = {
      isVisible: false,
      pageState: true,
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
  setVisibleTrue = () => {
    this.setState({ isVisible: true });
  };

  setVisibleFalse = () => {
    this.setState({ isVisible: false });
  };

  changeStateWeights = () => {
    const { navigation } = this.props;
    const updatedWeights = navigation.getParam("weights", null);

    // updatedWeights가 null아니고, 전에 state값과 비교해서 같다면 setState를 실행하지 않도록 합니다.
    if (
      updatedWeights !== null &&
      JSON.stringify(this.state.weights) !== JSON.stringify(updatedWeights)
    ) {
      this.setState({
        weights: { ...updatedWeights },
      });
    }

    // updated가 null이 아닐 때만 globalWeights 전역변수에 변경된 Weights Object를 저장
    updatedWeights !== null && (globalWeights = updatedWeights);

    // 새로운 Weights Object를 가지고 sorting을 실행합니다.
    setSortingTableData();
  };

  render() {
    const state = this.state;
    const Tab = createMaterialTopTabNavigator();
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        alignContent: "center",
      },
      header: { height: 50, backgroundColor: "#ffb81c" },
      text: { textAlign: "center", fontWeight: "100" },
      discription: {
        textAlign: "left",
        fontSize: 25,
        backgroundColor: "#5e514d",
        color: "white",
        padding: 3,
        paddingHorizontal: 20,
        position: "absolute",
        transform: [{ translateX: -20 }, { translateY: 10 }],
      },
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
    });

    this.changeStateWeights();

    const { weights } = this.state;

    const cardComponent = () => <CardScreen propsWeights={weights} />
    const tableComponent = () => <TableScreen propsWeights={weights} />

    return (
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#ffb81c",
            inactiveTintColor: "black",
            labelStyle: { fontSize: 12 },
            indicatorStyle: { borderColor: "#ffb81c", borderWidth: 1 },
          }}
        >
          <Tab.Screen
            name="Card"
            component={cardComponent}
          />
          <Tab.Screen
            name="Table"
            component={tableComponent}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

class CardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      cardWeights: {
        wPer: 0,
        wPbr: 0,
        wRoa: 0,
        wRoe: 0,
        wDebtRatio: 0,
        wOperMargin: 0,
        wReserveRatio: 0,
      },
    };
    cardRef = React.createRef();

    cardRef.current = {
      setDataset: (arr) => {
        this.setState({ dataSet: arr });
      },
    };
  }

  UNSAFE_componentWillMount() {
    const { propsWeights } = this.props;

    propsWeights !== null &&
      this.setState({
        cardWeights: { ...propsWeights },
      });

    tableRef !== undefined && tableRef.current.setDataset(calArr10);
    cardRef !== undefined && cardRef.current.setDataset(calArr10);
  }

  render() {
    const { cardWeights, dataSet } = this.state;

    return (
      <CardPage
        navigation={navigationForSend}
        dataSet={dataSet}
        weights={cardWeights}
      />
    );
  }
}

class TableScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
      tableWeights: {
        wPer: 0,
        wPbr: 0,
        wRoa: 0,
        wRoe: 0,
        wDebtRatio: 0,
        wOperMargin: 0,
        wReserveRatio: 0,
      },
    };
    tableRef = React.createRef();
    JSON.stringify(this.state.dataSet);
    tableRef.current = {
      setDataset: (arr) => {
        this.setState({ dataSet: arr });
        // console.log(arr);
      },
    };
  }

  UNSAFE_componentWillMount() {
    const { propsWeights } = this.props;

    propsWeights !== null &&
      this.setState({
        tableWeights: { ...propsWeights },
      });

    tableRef !== undefined && tableRef.current.setDataset(calArr10);
    cardRef !== undefined && cardRef.current.setDataset(calArr10);
  }

  render() {
    const { tableWeights, dataSet } = this.state;

    console.log('table', tableWeights);
    return (
      <TablePage
        navigation={navigationForSend}
        dataSet={dataSet}
        weights={tableWeights}
      />
    );
  }
}

class ModifyScreen extends React.Component {
  render() {
    return (
      <Modify navigation={this.props.navigation} weights={globalWeights} />
    );
  }
}

class DetailsScreen extends React.Component {
  state = {
    tmpclip: "",
    detailA: [],
    detailB: [],
  };

  UNSAFE_componentWillMount() {
    const { navigation } = this.props;
    const updatedT = navigation.getParam("tmpclip", null);
    const updatedA = navigation.getParam("detailA", null);
    const updatedB = navigation.getParam("detailB", null);

    this.setState({
      tmpclip: updatedT,
      detailA: updatedA,
      detailB: updatedB,
    });
  }

  render() {
    return (
      <Detail
        tmpclip={this.state.tmpclip}
        detailA={this.state.detailA}
        detailB={this.state.detailB}
      />
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Main",
        headerTitleAlign: "center",
      },
    },
    Modify: {
      screen: ModifyScreen,
      navigationOptions: {
        title: "Modify",
        headerTitleAlign: "center",
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        title: "Details",
        headerTitleAlign: "center",
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const Container = createAppContainer(AppNavigator);

class App extends React.Component {
  state = {
    isLoaded: false,
    loadingText: "반갑습니다",
    calArr: [],
  };

  async componentDidMount() {
    let todayDate = new Date().toDateString();
    const keys = await AsyncStorage.getAllKeys();
    let f = true;
    for (var i in keys) {
      if ("updated_cd_date" == keys[i]) {
        f = false;
        break;
      }
    }
    const getCompanyDetailApiAsync = async (
      url,
      setLoadingText = (text) => {
        this.setState({ loadingText: text });
      },
      setLoaded = (loadbool) => {
        this.setState({ cdIsLoaded: loadbool });
      }
    ) => {
      try {
        let response = await fetch(
          "http://ec2-15-164-117-230.ap-northeast-2.compute.amazonaws.com:8080/companies"
        );
        let json = await response.json();
        const companyDetailData = json;
        let update_companyDetailData = async (
          companyDetailData,
          setLoadingText,
          setLoaded
        ) => {
          setLoadingText("기업 세부 정보 업데이트 중입니다.");
          await AsyncStorage.setItem(
            "updated_cd_date",
            new Date().toDateString()
          );
          await companyDetailData.map(async (value, index) => {
            AsyncStorage.setItem(value.cmpName + "Info", JSON.stringify(value));
          });
        };
        await update_companyDetailData(companyDetailData, setLoadingText);
      } catch (e) {
        console.log(e);
      }
    };
    if (f == true) {
      await getCompanyDetailApiAsync();
    }

    const getCompanyApiAsync = async (
      url,
      setLoadingText = (text) => {
        this.setState({ loadingText: text });
      },
      setLoaded = (loadbool) => {
        this.setState({ isLoaded: loadbool });
      }
    ) => {
      try {
        let response = await fetch(
          "http://ec2-15-164-117-230.ap-northeast-2.compute.amazonaws.com:8080/quantdata/rank"
        );
        let json = await response.json();
        const companyData = json;

        let update_companyData = async (
          companyData,
          setLoadingText,
          setLoaded
        ) => {
          setLoadingText("기업 정보 업데이트 중입니다.");

          await AsyncStorage.setItem("updated_date", new Date().toDateString());

          await companyData.map(async (value, index) => {
            AsyncStorage.setItem(value.cmpName, JSON.stringify(value));
          });
        };

        update_companyData(companyData, setLoadingText);

        setTimeout(() => {
          setLoadingText("Do IT Quant");
          AsyncStorage.getItem("삼성전자").then(function (data) {
            // console.log('삼성전자:' + data);
          });
          setTimeout(() => {
            setLoadingText("");
            setLoaded(true);
          }, 1000);
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    let mergeArr = [];

    const setCalArr = () =>
      AsyncStorage.getAllKeys().then(
        (
          keys,
          setDataset = () => {
            this.setState({ dataSet: arr });
          },
          setTestArray = (arr) => {
            return Promise.resolve(arr);
          }
        ) => {
          AsyncStorage.multiGet(keys).then((data) => {
            let parseString;
            let parseData;
            let jsonArr;

            data.map((value, index) => {
              if (
                value[0] != "updated_date" &&
                value[0] != "updated_cd_date" &&
                value[0] != "updated_data" &&
                value[0].substring(value[0].length - 4, value[0].length) !=
                  "Info"
              ) {
                parseString = value[1];
                parseData = JSON.parse(parseString);
                jsonArr = [parseData];
                mergeArr = mergeArr.concat(jsonArr);

                if (mergeArr.length == 2353) {
                  setTestArray(mergeArr).then((arr) => {
                    console.log(mergeArr.length);
                    calArr = calArr.concat(arr);
                    calArr.sort(calculateData);
                    calArr10 = calArr.slice(0, 10);
                    cardRef.current.setDataset(calArr10);
                    tableRef.current.setDataset(calArr10);
                  });
                }
              }
            });
          });
        }
      );

    AsyncStorage.getItem("updated_date").then(
      (
        date,
        setLoadingText = (text) => {
          this.setState({ loadingText: text });
        },
        setLoaded = (bool) => {
          this.setState({ isLoaded: bool });
        }
      ) => {
        console.log("date:" + date);
        console.log("todayDate:" + todayDate);

        if (date == todayDate) {
          setCalArr().then(() => {
            setLoadingText("");
            setLoaded(true);
          });
        } else {
          getCompanyApiAsync().then(() => {
            setCalArr().then(() => {
              setLoadingText("");
              setLoaded(true);
            });
          });
        }
      }
    );
  }

  render() {
    return (
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/KBDataSystems_CI_eng.jpg")}
        backgroundColor={"#ffcc22"}
        logoHeight={150}
        logoWidht={150}
        loadingText={this.state.loadingText}
      >
        {(console.disableYellowBox = true)}
        <Container />
      </AnimatedSplash>
    );
  }
}

export default App;
