import React from 'react';
import {Button, Paragraph, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {Actions} from '../../../store/reducers/ant';
import {StateInterface} from '../../../store/reducers/types';
import {styles} from './styles';
const {getAnts} = Actions;

export const InitialScreen = () => {
  const dispatch = useDispatch();
  const pending = useSelector<StateInterface>(({ants}) => ants.pendingGetAnts);
  return (
    <SafeAreaView style={styles.safeArea}>
      {pending ? (
        <ActivityIndicator />
      ) : (
        <Button
          mode="contained"
          onPress={() => {
            dispatch(getAnts());
          }}>
          <Paragraph style={styles.submitButton}>Obter Formigas</Paragraph>
        </Button>
      )}
    </SafeAreaView>
  );
};
