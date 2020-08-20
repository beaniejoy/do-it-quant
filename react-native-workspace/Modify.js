import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Info from "./Info";
import { Card } from "react-native-shadow-cards";

export class Modify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: {
        wPer: 0,
        wPbr: 0,
        wRoa: 0,
        wRoe: 0,
        wDebtRatio: 0,
        wReserveRatio: 0,
        wOperMargin: 0,
      },
      isRight: this.isPercentRight,
      id: 0,
      isVisible: false,
      editing: false,
      dataList: [
        {
          id: 0,
          title: "PER",
          subtitle: "Price Earnings Ratio",
          stateKey: "wPer",
        },
        {
          id: 1,
          title: "PBR",
          subtitle: "Price Book Ratio",
          stateKey: "wPbr",
        },
        {
          id: 2,
          title: "ROA",
          subtitle: "Return on Assets",
          stateKey: "wRoa",
        },
        {
          id: 3,
          title: "ROE",
          subtitle: "Return on Earnings",
          stateKey: "wRoe",
        },
        {
          id: 4,
          title: "부채비율",
          subtitle: "Debt Ratio",
          stateKey: "wDebtRatio",
        },
        {
          id: 5,
          title: "영업이익률",
          subtitle: "Operating Margin",
          stateKey: "wOperMargin",
        },
        {
          id: 6,
          title: "유보율",
          subtitle: "Reserve Ratio",
          stateKey: "wReserveRatio",
        },
      ],
    };

    this.onScroll = this.onScroll.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      inputData: { ...this.props.weights },
    });
  }

  setInputData = (text, key) => {
    let newInput = parseInt(text);
    if (newInput === NaN) newInput = 0;

    // 첫 수정시 나머지 값들은 0으로 초기화하고 editing은 true로 설정
    if (!this.state.editing) {
      this.setState({
        inputData: {
          wPer: 0,
          wPbr: 0,
          wRoa: 0,
          wRoe: 0,
          wDebtRatio: 0,
          wReserveRatio: 0,
          wOperMargin: 0,
          [key]: newInput,
        },
        editing: true,
      });
    } else {
      this.setState((prevState) => ({
        inputData: {
          ...prevState.inputData,
          [key]: newInput, // => 요기
        },
      }));
    }
  };

  isPercentRight = () => {
    const { inputData } = this.state;
    let arr = Object.values(inputData);
    let sum = arr.reduce((total, num) => total + num);
    if (sum === 100) {
      return true;
    } else {
      return false;
    }
  };

  setOverlayVisible = (id, visible) => {
    this.setState({
      id: id,
      isVisible: visible,
    });
  };

  handleNotVisible = () => {
    this.setState({ isVisible: false });
  };

  onScroll(event) {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction =
      currentOffset > this.state.offset
        ? currentOffset + " down " + this.state.offset
        : currentOffset + " up " + this.state.offset;
    this.setState({
      offset: currentOffset,
    }),
      Alert.alert(direction);
  }

  render() {
    const { isRight, id, isVisible, dataList, inputData, editing } = this.state;
    const { weights } = this.props;

    return (
      <View style={styles.item}>
        {/* Overlay start */}
        <Info
          id={id}
          propVisible={isVisible}
          onNotVisible={this.handleNotVisible}
        />
        {/* Overlay end */}

        {/* Modify content start */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={[styles.inputCard, styles.shadow]}>
            {dataList.map((data) => {
              return (
                <ListItem
                  key={data.id}
                  title={
                    <Text
                      style={styles.title}
                      onPress={() => {
                        this.setOverlayVisible(data.id, true); // => 요기
                      }}
                    >
                      {data.title + " "}
                      <MaterialIcons
                        name="info-outline"
                        size={15}
                        color="black"
                      />
                    </Text>
                  }
                  leftIcon={
                    <AntDesign
                      name="pushpino"
                      size={24}
                      color="black"
                      onPress={() => {
                        this.setOverlayVisible(data.id, true); // => 요기
                      }}
                    />
                  }
                  subtitle={data.subtitle} // => 요기
                  subtitleStyle={styles.subtitleStyle}
                  rightElement={<Text>%</Text>}
                  input={{
                    placeholder:
                      JSON.stringify(weights) === JSON.stringify(inputData)
                        ? inputData[data.stateKey].toString()
                        : "0",
                    keyboardType: "number-pad",
                    onChangeText: (text) =>
                      this.setInputData(text, data.stateKey),
                  }}
                  bottomDivider
                />
              );
            })}
          </Card>

          {!isRight() ? (
            <View>
              <Button
                title={
                  <Text>
                    7개 지표의 비중 총합이 100%를 만족해야 합니다. 다시
                    확인해주세요.
                  </Text>
                }
                titleStyle={styles.errorTitle}
                icon={
                  <MaterialIcons name="error-outline" size={18} color="red" />
                }
                type="outline"
                buttonStyle={styles.errorMsg}
              />
            </View>
          ) : (
            <View></View>
          )}

          <View style={styles.btnWrap}>
            <Button
              title=" Submit"
              buttonStyle={{
                backgroundColor: "#ffbc00",
              }}
              icon={<AntDesign name="checkcircleo" size={24} color="white" />}
              disabled={!isRight()}
              onPress={() => {
                console.log("Modify: ", inputData);

                this.props.navigation.navigate('Home', {
                  weights: inputData
                });
              }}
            />
          </View>
        </ScrollView>
        {/* Modify content end */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  errorTitle: {
    fontSize: 8.5,
    color: "red",
    marginLeft: 4,
  },
  errorMsg: {
    marginTop: 20,
    marginHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    height: 35,
  },
  btnWrap: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  subtitleStyle: {
    width: 150,
  },
  inputCard: {
    flex: 1,
    marginTop: 15,
    paddingTop: 0,
    borderRadius: 8,
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

});
