export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum ModalOpen {
  Form = 'form',
  Info = 'info',
  None = '',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
