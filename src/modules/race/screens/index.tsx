import React from 'react';
import {Button, Paragraph, List, Headline} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Actions} from '../../../store/reducers/ant';
import {StateInterface} from '../../../store/reducers/types';
import {LikelihoodCalculationState} from '../../../util/enum/LikelihoodCalculationState';
import {AntIconContainer} from '../containers/antIcon';
import {styles} from './styles';
import {RaceScreenSelector} from './types';

const {startRace} = Actions;
export const RaceScreen = () => {
  const dispatch = useDispatch();
  const {globalCalculationState, ants} = useSelector<
    StateInterface,
    RaceScreenSelector
  >(({ants}) => ({
    globalCalculationState: ants.globalCalculationState,
    ants: ants.ants,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.column}>
        <View style={styles.headTitle}>
          <Headline>{globalCalculationState}</Headline>
        </View>
        <View style={styles.spacing100}>
          {ants.map(item => (
            <List.Item
              key={item.id}
              title={item.antInfo.name}
              description={`${item.likelihood} | ${item.state}`}
              left={props => <AntIconContainer color={item.antInfo.color} />}
            />
          ))}
        </View>
        <Button
          mode="contained"
          disabled={
            globalCalculationState == LikelihoodCalculationState.IN_PROGRESS
          }
          onPress={() => {
            dispatch(startRace());
          }}>
          <Paragraph style={styles.submitButton}>Comecar a corrida</Paragraph>
        </Button>
      </View>
    </SafeAreaView>
  );
};
