import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Overlay } from "react-native-elements";
import * as Font from "expo-font";

class Info extends Component {
  static defaultProps = {
    isVisible: false,
  };

  state = {
    assetsLoaded: false,
    dataList: [
      {
        id: 0,
        title: "   PER",
        imgSrc: require("./images/per.png"),
        imgStyle: { width: 200, height: 50 },
        description:
          " Price Earning Ratio의 줄임말로 회사의 주가 (Price) 가 회사의 순이익 (Earnings) 에 비해 적절한 가격인지를 볼 수 있는 지표입니다. \n\n" +
          "기업의 적정주가를 PER에 근거하는 경우가 많습니다. 보통 PER이 낮으면 저평가, 높으면 고평가로 판단합니다.\n" +
          "즉, 시장 평균에 비해 얼마나 프리미엄이 붙어 있는지 평가하는데 사용합니다.\n\n" +
          "하지만 PER에 대한 기준은 유동적이기 때문에 무조건 저PER이 긍정적이고 고PER이 부정적인 것만은 아닙니다.\n" +
          "상황에 따라 현명하게 가치판단하는 것이 올바르지만 여기서는 철저하게 데이터만을 가지고 접근을 했습니다.\n" +
          "그렇기에 투자자 본인이 직접 여러 지표와 조합해보고 보완하는 것을 추천드립니다.\n",
      },
      {
        id: 1,
        title: "   PBR",
        imgSrc: require("./images/pbr.png"),
        imgStyle: { width: 200, height: 40 },
        description:
          " PBR은 주가를 주당순자산가치(BPS)로 나눈 값입니다. BPS는 한 주당 순자산가치로, 해당 기업이 모든 기업활동을 중단하고 매각했을 때 한 주당 얼마씩 주주들에게 돌아가는지를 나타내는 지표입니다. \n\n" +
          "PBR은 이러한 BPS와 현재주가와 비교하는 지표입니다. 보통 1을 기준으로 삼는데 1보다 작으면 주가가 기업의 장부 상 가치보다 낮다는 것입니다. 즉, 기업의 순자산가치를 100% 반영을 받지 못한다고 할 수 있습니다. \n\n" +
          "하지만, PER과 마찬가지로 1보다 낮다고 기업이 저평가되어 있다고만 판단할 수 없습니다. 여러 지표와 조합을 통해 판단해보시기 바랍니다. \n",
      },
      {
        id: 2,
        title: "   ROA",
        imgSrc: require("./images/roa.png"),
        imgStyle: { width: 200, height: 50 },
        description:
          " Return On Assets의 약자로 자본과 부채를 합한 총자산 대비 얼마만큼의 순이익을 벌어들였는지 알려주는 지표입니다. 즉, 기업이 투자한 자본과 부채 대비 수익성을 살펴볼 수 있는 지표입니다. \n\n" +
          "ROE는 부채를 제외시킨 지표이기 때문에 기업의 부채비율 높아지거나 부채 자체의 위험성이 높아지면 ROE 지표는 신뢰성이 약화됩니다. ROA는 부채 요소를 포함한 지표이기에 ROE의 취약한 부분을 보완해줍니다. \n\n" +
          "기업이 부채를 높여 ROE를 끌어올릴 수 있지만 ROA는 쉽게 조정할 수 없습니다. 그렇기에 ROA와 ROE간에 격차가 심하면 부채에 대한 요소를 고려해봐야 합니다. \n" +
          "ROA와 ROE를 같이 고려한다면 더 높은 수준의 투자 결정을 할 수 있을 것입니다.\n",
      },
      {
        id: 3,
        title: "   ROE",
        imgSrc: require("./images/roe.png"),
        imgStyle: { width: 200, height: 50 },
        description:
          " Return On Equity의 약자로 자본 대비 얼마만큼의 순이익을 기업이 벌어들였는지 알려주는 지표입니다. 즉 기업이 투자한 자본 대비 수익성을 살펴볼 수 있는 지표입니다.\n\n" +
          "ROE가 높다는 것은 적은 자본으로 높은 수익을 실현했다는 의미로 해석할 수 있습니다. 투자자가 투입한 비용 대비 높은 수익을 받을 수 있다는 것입니다. \n" +
          "보통 10%대 이상의 높은 ROE를 꾸준하게 유지하는 회사는 투자가치가 높은 기업이라고 할 수 있습니다.\n\n" +
          "부채까지 고려한 ROA 지표와 같이 조합해본다면 더욱 풍성한 투자 리스트를 구성할 수 있을 것입니다.\n",
      },
      {
        id: 4,
        title: "  부채비율",
        imgSrc: require("./images/debtRatio.png"),
        imgStyle: { width: 200, height: 50 },
        description:
          " 부채비율은 부채 총계를 자본 총계로 나눈 지표입니다. 부채는 쉽게 말해서 남의 돈을 빌린 것이고 자본은 내 돈을 투자한 것입니다. \n\n" +
          "즉, 부채비율은 투자한 기업 자체의 자본 대비 다른 곳에서 빌려온 돈의 비율이 어떻게 되는지 보여주는 지표입니다. 부채비율이 높다는 것은 자본보다 부채의 비중이 높은 상태이며 기업의 재무건전성이 안좋다는 신호입니다. \n\n" +
          "산업군마다 기준이 다르지만 보통 200%를 기준으로 하고 있으며 그 이하의 부채비율을 가진 기업을 양호하다고 판단하고 있습니다. \n",
      },
      {
        id: 5,
        title: "  영업이익률",
        imgSrc: require("./images/operProfitRatio.png"),
        imgStyle: { width: 200, height: 50 },
        description:
          " 영업이익률은 기업의 영업이익을 매출액으로 나눈 지표입니다. 영업이익은 회사가 영업을 하면서 벌어들인 수익을 말합니다. \n\n" +
          "즉, '영업어익 = 매출액 - 매출원가 - 판관비'이며 순이익과 다른 개념입니다. \n" +
          "영업이익률은 회사의 총 매출 중에서 영업이익의 비중이 어느정도인지 알려주는 지표입니다. \n\n" +
          "높으면 높을수록 비용을 효율적으로 사용하여 영업을 한다는 의미로 해석할 수 있습니다. \n",
      },
      {
        id: 6,
        title: "  유보율",
        imgSrc: require("./images/reserveRatio.png"),
        imgStyle: { width: 200, height: 40 },
        description:
          "유보율은 이익잉여금과 자본잉여금을 합친 금액을 납입자본금으로 나눈 지표입니다. 납입자본금은 회사에 출자된 최초 자본금, 주주금액이라고 할 수 있습니다.\n\n" +
          "유보율은 기업이 벌어들이고 남은 잉여현금 총액을 초기투자금과 비교한 지표입니다. 유보율이 높을수록 초기투자금에 비해 기업의 자금을 더 많이 불렸다는 것으로 볼 수 있고 기업의 안정성 측면에서도 높은 평가를 줄 수 있습니다.\n\n" +
          "하지만 기업의 이슈에 의해 일시적으로 유보율이 급등할 수 있는 만큼 다른 지표와 조합해서 살펴보시기 바랍니다. \n",
      },
    ],
  };

  async componentDidMount() {
    Font.loadAsync({
      Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
      "NanumGothic-Regular": require("./assets/fonts/NanumGothic-Regular.ttf"),
      "NanumGothic-Bold": require("./assets/fonts/NanumGothic-Bold.ttf"),
    });

    this.setState({ assetsLoaded: true });
  }

  // 상위 component의 true --> false로
  handleNotVisible = (e) => {
    e.preventDefault();

    this.props.onNotVisible();
  };

  render() {
    const { assetsLoaded, id, propVisible } = this.props;

    const data = this.state.dataList.filter((data) => data.id == id);

    return (
      <Overlay isVisible={propVisible} onBackdropPress={this.handleNotVisible}>
        <View style={styles.overlayInnerWrap}>
          <View style={styles.innerBox}>
            <Text style={styles.title} onPress={this.handleNotVisible}>
              What is
              <Text
                style={assetsLoaded ? {
                  fontFamily: "NanumGothic-Bold",
                  fontSize: 18,
                } : {fonSize: 18}}
              >
                {data[0].title}
              </Text>
              ?
            </Text>
            <View style={styles.description}>
              <Text></Text>
              <Text></Text>
              <Image style={data[0].imgStyle} source={data[0].imgSrc} />
              <Text></Text>
              <Text style={assetsLoaded? { fontFamily: "NanumGothic-Regular", fontSize: 13 }: {fontSize: 13}}>
                {data[0].description}
              </Text>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayInnerWrap: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").height * 0.7,
    borderStyle: "solid",

    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  innerBox: {
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.69,
    borderStyle: "solid",
    backgroundColor: "#ffffff",
    borderWidth: 5,
    padding: 20,
    paddingHorizontal: 15,
    margin: 0,
    borderStyle: "solid",
    borderColor: "#ffb81c",
    overflow: "visible",
  },
  title: {
    width: Dimensions.get("window").width * 0.59,
    textAlign: "left",
    fontFamily: "Lobster",
    fontSize: 20,
    backgroundColor: "#5e514d",
    color: "white",
    padding: 5,
    paddingHorizontal: 20,
    transform: [{ translateX: -50 }, { translateY: 10 }],
  },
  description: {
    flexDirection: "column",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "stretch",
    width: Dimensions.get("window").width * 0.65,
    height: Dimensions.get("window").height * 0.7,
  },
});

export default Info;
