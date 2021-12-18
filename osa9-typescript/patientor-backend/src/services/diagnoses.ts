import { Diagnoses } from '../types';
import diagnoses from '../../data/diagnoses';

const getDiagnoses = (): Diagnoses[] => {
  return diagnoses;
};

export default { getDiagnoses };
