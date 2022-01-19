import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { ModalOpen, Patient } from '../../types';

interface Props {
  modalOpen: ModalOpen;
  onClose: () => void;
  error?: string;
  patient: Patient;
}

const AddPatientModal = ({ modalOpen, onClose, error, patient }: Props) => (
  <Modal
    open={modalOpen === ModalOpen.Info}
    onClose={onClose}
    centered={true}
    size="tiny"
    closeIcon
  >
    <Modal.Header>{patient.name}</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <p>
        {patient.ssn}
        {patient.gender}
        {patient.id}
        {patient.occupation}
        {patient.entries}
      </p>
    </Modal.Content>
  </Modal>
);

export default AddPatientModal;
