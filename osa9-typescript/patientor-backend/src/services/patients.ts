import { NewPatient, PublicPatient, Patient } from '../types';
import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { id: uuid(), entries: [], ...patient };
  patients.push(newPatient);
  return newPatient;
};
const findPatient = (id: string): Patient | undefined => {
  const patientFound = patients.find((patient) => patient.id === id);
  return patientFound;
};

export default { getPatients, addPatient, findPatient };
