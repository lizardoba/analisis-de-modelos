import Dexie from 'dexie';

export const db = new Dexie('ClinicaDentalDB');

// Versión 1: Definición de tablas e índices
db.version(1).stores({
  // ++id = clave primaria autoincremental
  // Solo indexamos lo que usaremos para búsquedas o relaciones
  patients: '++id',
  dentalAnalyses: '++id, patientId' // patientId actúa como clave foránea
});

// 📝 Funciones CRUD básicas
export const addPatient = async (data) => {
  return await db.patients.add(data);
};

export const addAnalysis = async (data) => {
  return await db.dentalAnalyses.add(data);
};

export const getPatientFullData = async (patientId) => {
  const patient = await db.patients.get(patientId);
  const analyses = await db.dentalAnalyses.where('patientId').equals(patientId).toArray();
  return { patient, analyses };
};

export const getAllPatients = async () => {
  return await db.patients.toArray();
};
