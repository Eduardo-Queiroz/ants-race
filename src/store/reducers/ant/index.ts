import {createActions, createReducer} from 'reduxsauce';
import uuid from 'react-native-uuid';
import {Ant} from '../../../interfaces/Ant';
import {LikelihoodCalculationState} from '../../../util/enum/LikelihoodCalculationState';
import {AntAction, AntActionTypes, AntStateInterface} from './types';
import {AntRanking} from '../../../interfaces/AntRanking';

const AntState: AntStateInterface = {
  ants: [],
  pendingGetAnts: false,
  globalCalculationState: LikelihoodCalculationState.NOT_YET_RUN,
};

export const {Types, Creators: Actions} = createActions<
  AntActionTypes,
  AntAction
>({
  getAnts: null,
  getAntsPending: null,
  getAntsSuccess: ['ants'],
  getAntsError: ['error'],

  startRace: null,
  startAntRace: ['id'],
  antsUpdate: ['id', 'likelihood'],
});

const getAntsPending = (state: AntStateInterface) =>
  <AntStateInterface>{
    ...state,
    pendingGetAnts: true,
  };

const getAntsError = (state: AntStateInterface, {error}: {error: string}) =>
  <AntStateInterface>{
    ...state,
    pendingGetAnts: false,
    errorGetAnts: error,
  };

const getAntsSuccess = (state: AntStateInterface, {ants}: {ants: Ant[]}) =>
  <AntStateInterface>{
    ...state,
    ants: ants.map(ant => ({
      id: uuid.v4().toString(),
      likelihood: 0,
      state: LikelihoodCalculationState.NOT_YET_RUN,
      antInfo: ant,
    })),
    pendingGetAnts: false,
  };

const startAntRace = (state: AntStateInterface) =>
  <AntStateInterface>{
    ...state,
    globalCalculationState: LikelihoodCalculationState.IN_PROGRESS,
    ants: state.ants.map(ant => ({
      ...ant,
      likelihood: 0,
      state: LikelihoodCalculationState.IN_PROGRESS,
    })),
  };

const updateAnts = (
  state: AntStateInterface,
  {id, likelihood}: {id: string; likelihood: number},
) => {
  const newAntRaking = state.ants
    .map((ant, index) =>
      ant.id == id
        ? {
            ...ant,
            likelihood: likelihood,
            state: LikelihoodCalculationState.CALCULATED,
          }
        : ant,
    )
    .sort((a, b) => b.likelihood - a.likelihood);

  const newGlobalCalculationState = newAntRaking.find(
    ranking => ranking.state != LikelihoodCalculationState.CALCULATED,
  )
    ? state.globalCalculationState
    : LikelihoodCalculationState.CALCULATED;

  return <AntStateInterface>{
    ...state,
    ants: newAntRaking,
    globalCalculationState: newGlobalCalculationState,
    pendingGetAnts: false,
  };
};

export const HANDLERS = {
  [Types.GET_ANTS_ERROR]: getAntsError,
  [Types.GET_ANTS_SUCCESS]: getAntsSuccess,
  [Types.GET_ANTS_PENDING]: getAntsPending,

  [Types.START_RACE]: startAntRace,
  [Types.ANTS_UPDATE]: updateAnts,
};

export const Reducer = createReducer(AntState, HANDLERS);
