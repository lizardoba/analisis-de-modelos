import { db, addPatient, addAnalysis, getPatientFullData, getAllPatients } from './db.js';

async function seedDemoData() {
  // Evita duplicados al recargar
  const existing = await db.patients.count();
  if (existing > 0) return console.log('⚠️ Base de datos ya inicializada.');

  try {
    const pid = await addPatient({
      name: 'Ana Martínez',
      age: 29,
      medicalHistory: 'Alergia a ibuprofeno. Embarazada (1º trimestre).'
    });

    await addAnalysis({
      patientId: pid,
      analysisDate: new Date().toISOString().split('T')[0],
      measurements: JSON.stringify({
        arcoSuperior_mm: 44.2,
        arcoInferior_mm: 41.8,
        discrepanciaAnteroPosterior: 2.4
      }),
      results: 'Discrepancia leve. Indicación: alineadores removibles + control trimestral.'
    });

    console.log('✅ Datos de prueba insertados correctamente.');
  } catch (err) {
    console.error('❌ Error al insertar:', err);
  }
}

async function showData() {
  try {
    const patients = await getAllPatients();
    console.log('📋 Pacientes registrados:', patients);

    if (patients.length > 0) {
      const full = await getPatientFullData(patients[0].id);
      console.log('🦷 Paciente + Análisis:', full);
    }
  } catch (err) {
    console.error('❌ Error al leer:', err);
  }
}

// Ejecutar al cargar
window.addEventListener('DOMContentLoaded', async () => {
  await seedDemoData();
  await showData();
});
