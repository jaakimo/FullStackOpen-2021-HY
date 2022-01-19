import express from 'express';
import patientService from '../services/patients';
import utils from '../utils';

const router = express.Router();

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.send(400).json({ error: 'malformatted id' });
  }

  const patient = patientService.findPatient(id);
  if (!patient) {
    res.status(404).json({ message: 'patient not found' });
  }

  res.status(200).json(patient);
});

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
});

export default router;
