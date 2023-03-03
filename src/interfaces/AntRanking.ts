import {LikelihoodCalculationState} from '../util/enum/LikelihoodCalculationState';
import {Ant} from './Ant';

export interface AntRanking {
  id: string;
  likelihood: number;
  state: LikelihoodCalculationState;
  antInfo: Ant;
}
