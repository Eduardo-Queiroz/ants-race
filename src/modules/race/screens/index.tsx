import React, { useEffect, useRef } from "react";
import { Button, Paragraph, List, Headline } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../../store/reducers/ant";
import { StateInterface } from "../../../store/reducers/types";
import { LikelihoodCalculationState } from "../../../util/enum/LikelihoodCalculationState";
import { AntIconContainer } from "../containers/antIcon";
import { styles } from "./styles";
import { RaceScreenSelector } from "./types";
import { Transition, Transitioning } from "react-native-reanimated";

const transition = (
  <Transition.Together>
    <Transition.Change durationMs={500} />
  </Transition.Together>
);

const { startRace } = Actions;
export const RaceScreen = () => {
  const dispatch = useDispatch();
  const ref = useRef<any>();
  const { globalCalculationState, ants } = useSelector<
    StateInterface,
    RaceScreenSelector
  >(({ ants }) => ({
    globalCalculationState: ants.globalCalculationState,
    ants: ants.ants,
  }));
  useEffect(() => {
    ref.current.animateNextTransition();
  }, [ants]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.column}>
        <View style={styles.headTitle}>
          <Headline>{globalCalculationState}</Headline>
        </View>
        <View style={styles.spacing100}>
          <Transitioning.View ref={ref} transition={transition}>
            <FlatList
              data={ants}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <List.Item
                  key={item.id}
                  title={item.antInfo.name}
                  description={`${item.likelihood} | ${item.state}`}
                  left={(props) => (
                    <AntIconContainer color={item.antInfo.color} />
                  )}
                />
              )}
            />
          </Transitioning.View>
        </View>
        <Button
          mode="contained"
          disabled={
            globalCalculationState == LikelihoodCalculationState.IN_PROGRESS
          }
          onPress={() => {
            dispatch(startRace());
          }}
        >
          <Paragraph style={styles.submitButton}>Comecar a corrida</Paragraph>
        </Button>
      </View>
    </SafeAreaView>
  );
};
