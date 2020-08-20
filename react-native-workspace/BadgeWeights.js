import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-shadow-cards";
import { Badge } from "react-native-elements";
import * as Font from "expo-font";

export class BadgeWeights extends React.Component {
  state = {
    assetsLoaded: false,
    weights: {
      wPer: 0,
      wPbr: 0,
      wRoa: 0,
      wRoe: 0,
      wDebtRatio: 0,
      wOperMargin: 0,
      wReserveRatio: 0,
    },
    weightsList: [
      {
        name: "PER",
        stateKey: "wPer",
      },
      {
        name: "PBR",
        stateKey: "wPbr",
      },
      {
        name: "ROA",
        stateKey: "wRoa",
      },
      {
        name: "ROE",
        stateKey: "wRoe",
      },
      {
        name: "DEBT",
        stateKey: "wDebtRatio",
      },
      {
        name: "OPER",
        stateKey: "wOperMargin",
      },
      {
        name: "RES",
        stateKey: "wReserveRatio",
      },
    ],
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

  UNSAFE_componentWillMount() {
    const { propsWeights } = this.props;

    this.setState({
      weights: { ...propsWeights },
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
      "NanumGothic-Regular": require("./assets/fonts/NanumGothic-Regular.ttf"),
      "NanumGothic-Bold": require("./assets/fonts/NanumGothic-Bold.ttf"),
    });

    this.setState({ assetsLoaded: true });
  }

  render() {
    const { assetsLoaded, weightsList, weights } = this.state;
    if (assetsLoaded) {
      return (
        <View style={styles.badgeList}>
          {weightsList.map((weight) => {
            return (
              <Card style={[styles.badgeComp, styles.shadow]}>
                <Text style={styles.badgeTitle}>{weight.name}</Text>
                <Badge
                  value={weights[weight.stateKey].toString()}
                  status={this.whatColor(weights[weight.stateKey])}
                />
              </Card>
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.badgeList}>
          {weightsList.map((weight) => {
            return (
              <Card style={[styles.badgeComp, styles.shadow]}>
                <Text
                  style={{
                    marginBottom: 2,
                    color: "#ffbc00",
                    fontSize: 8,
                  }}
                >
                  {weight.name}
                </Text>
                <Badge
                  value={weights[weight.stateKey].toString()}
                  status={this.whatColor(weights[weight.stateKey])}
                />
              </Card>
            );
          })}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  badgeList: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
    backgroundColor: "#60584c",
    paddingVertical: 10,
  },
  badgeComp: {
    alignItems: "center",
    marginHorizontal: 2,
    backgroundColor: "#89734c",
    padding: 5,
    width: 40,
    borderRadius: 20,
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
  badgeTitle: {
    fontFamily: "NanumGothic-Bold",
    marginBottom: 2,
    color: "#ffbc00",
    fontSize: 8,
  },
});
