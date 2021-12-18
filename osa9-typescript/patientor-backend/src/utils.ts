import { Diagnoses, NewPatient } from './types';
import patientParser from './parsers/patient';
import diagnosesParser from './parsers/diagnoses';

type DiagnosesFields = {
  code: unknown;
  name: unknown;
  latin?: unknown;
};
type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields) => {
  const newPatient: NewPatient = {
    name: patientParser.parseName(name),
    dateOfBirth: patientParser.parseDateOfBirth(dateOfBirth),
    ssn: patientParser.parseSsn(ssn),
    gender: patientParser.parseGender(gender),
    occupation: patientParser.parseOccupation(occupation),
  };
  return newPatient;
};

const toNewDiagnoses = ({ code, name, latin }: DiagnosesFields): Diagnoses => ({
  code: diagnosesParser.parseCode(code),
  name: diagnosesParser.parseName(name),
  latin: diagnosesParser.parseLatin(latin),
});

export default { toNewPatient, toNewDiagnoses };
