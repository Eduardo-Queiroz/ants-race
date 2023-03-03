import {Action} from '@reduxjs/toolkit';
import {Ant} from '../../../interfaces/Ant';
import {AntRanking} from '../../../interfaces/AntRanking';
import {LikelihoodCalculationState} from '../../../util/enum/LikelihoodCalculationState';

export interface AntStateInterface {
  ants: AntRanking[];
  pendingGetAnts: boolean;
  errorGetAnts?: String;
  globalCalculationState: LikelihoodCalculationState;
}

export interface AntActionTypes {
  GET_ANTS: string;
  GET_ANTS_PENDING: string;
  GET_ANTS_SUCCESS: string;
  GET_ANTS_ERROR: string;

  START_RACE: string;
  START_ANT_RACE: string;
  ANTS_UPDATE: string;
}

export interface AntAction {
  getAnts(): Action;
  getAntsPending(): Action;
  getAntsSuccess(ants: Ant[]): Action;
  getAntsError(error: string): Action;

  startRace(): Action;
  startAntRace(payload: any): Action;
  antsUpdate(id: string, likelihood: number): Action;
}
