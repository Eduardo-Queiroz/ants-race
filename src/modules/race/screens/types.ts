import {AntRanking} from '../../../interfaces/AntRanking';
import {LikelihoodCalculationState} from '../../../util/enum/LikelihoodCalculationState';

export interface RaceScreenSelector {
  globalCalculationState: LikelihoodCalculationState;
  ants: AntRanking[];
}
