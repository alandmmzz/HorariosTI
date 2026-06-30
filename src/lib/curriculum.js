// Plan 2007 - Tecnólogo en Informática (Fing - UdelaR)
// Fuente: plan oficial por créditos. Créditos mínimos totales: 252.
// Nota: el plan distingue exigir "Curso" (ganaste el derecho a examen) o
// "Examen" (la exoneraste/aprobaste) como previa de otra materia. Como esta
// app solo trackea "completada sí/no", tratamos cualquiera de las dos como
// "tenés que haberla marcado como completada".

export const TOTAL_DEGREE_CREDITS = 252

export const AREAS = [
  {
    key: 'matematica',
    name: 'Matemática',
    minCredits: 26,
    subjects: [
      { key: 'mat', name: 'Matemática', credits: 0, requires: [] },
      { key: 'mdl1', name: 'Matemática Discreta y Lógica 1', credits: 12, requires: [] },
      { key: 'mdl2', name: 'Matemática Discreta y Lógica 2', credits: 6, requires: ['mdl1'] },
      { key: 'pye', name: 'Probabilidad y Estadística', credits: 8, requires: ['mdl1', 'mdl2'] },
    ],
  },
  {
    key: 'programacion',
    name: 'Programación',
    minCredits: 44,
    subjects: [
      { key: 'prinprog', name: 'Principios de Programación', credits: 0, requires: [] },
      { key: 'eda', name: 'Estructuras de Datos y Algoritmos', credits: 16, requires: ['prinprog', 'mdl1'] },
      { key: 'progavan', name: 'Programación Avanzada', credits: 12, requires: ['eda'] },
      { key: 'progapli', name: 'Programación de Aplicaciones', credits: 16, requires: ['eda', 'bd1', 'progavan', 'bd2'] },
      { key: 'butia', name: 'Butiá: Robótica Educativa', credits: 8, requires: ['prinprog'] },
      { key: 'comprobotica', name: 'Competencias Robóticas - IEEE SEK', credits: 4, requires: ['prinprog'] },
      { key: 'tallerrobotica', name: 'Taller de Robótica Educativa', credits: 6, requires: ['eda'] },
      { key: 'frobotica', name: 'Fundamentos de la Robótica Autónoma', credits: 7, requires: ['arqcomp', 'mdl1', 'mdl2', 'eda', 'progavan'] },
      { key: 'desgx', name: 'Desarrollo de Aplicaciones con GeneXus', credits: 12, requires: ['bd1', 'bd2', 'progavan'] },
      { key: 'gxav', name: 'Taller de GeneXus Avanzado', credits: 12, requires: ['desgx'] },
      { key: 'desphp', name: 'Desarrollo de Sitios Web con PHP', credits: 4, requires: ['bd1', 'bd2', 'progavan', 'redes'] },
      { key: 'desapphp', name: 'Taller de Desarrollo de Aplicaciones Web con PHP', credits: 12, requires: ['bd1', 'bd2', 'progapli'] },
      { key: 'xml', name: 'Introducción a XML y Estándares Asociados', credits: 4, requires: ['bd2', 'progavan'] },
      { key: 'introjuegos', name: 'Introducción al Desarrollo de Juegos', credits: 12, requires: ['progavan', 'bd2', 'mdl2'] },
      { key: 'vj2d', name: 'Taller de Diseño y Programación de Videojuegos 2D', credits: 4, requires: ['progavan', 'bd2', 'mdl2'] },
      { key: 'tam', name: 'Taller de Aplicaciones para Dispositivos Móviles', credits: 4, requires: ['bd1', 'progavan'] },
      { key: 'ria', name: 'Taller de Aplicaciones de Internet Ricas', credits: 4, requires: ['progapli'] },
      { key: 'tsig', name: 'Taller de Sistemas de Información Geográfica', credits: 12, requires: ['bd2', 'ingsoft', 'progapli'] },
      { key: 'tsi_jee', name: 'Taller de Sistemas de Información Java EE', credits: 12, requires: ['bd1', 'bd2', 'progapli'] },
      { key: 'tsi_net', name: 'Taller de Sistemas de Información .NET', credits: 12, requires: ['bd1', 'bd2', 'progapli'] },
    ],
  },
  {
    key: 'arq_so_redes',
    name: 'Arquitectura, Sist. Operativos y Redes',
    minCredits: 32,
    subjects: [
      { key: 'arqcomp', name: 'Arquitectura de Computadoras', credits: 0, requires: [] },
      { key: 'so', name: 'Sistemas Operativos', credits: 12, requires: ['arqcomp'] },
      { key: 'redes', name: 'Redes de Computadoras', credits: 12, requires: ['arqcomp'] },
      { key: 'adminf', name: 'Administración de Infraestructuras', credits: 8, requires: ['so', 'redes'] },
      { key: 'adminf2', name: 'Administración de Infraestructuras II', credits: 12, requires: ['arqcomp', 'so', 'redes', 'adminf'] },
      { key: 'sistcontrol', name: 'Introducción a los Sistemas de Control', credits: 12, requires: ['arqcomp', 'redes', 'so', 'adminf'] },
    ],
  },
  {
    key: 'bd_si',
    name: 'Bases de Datos y Sistemas de Información',
    minCredits: 24,
    subjects: [
      { key: 'bd1', name: 'Bases de Datos I', credits: 12, requires: ['prinprog'] },
      { key: 'bd2', name: 'Bases de Datos II', credits: 12, requires: ['bd1'] },
      { key: 'cdatos', name: 'Calidad de Datos', credits: 12, requires: ['bd2', 'progapli'] },
      { key: 'infsalud', name: 'Informatización de Organizaciones de Salud', credits: 4, requires: ['bd1', 'bd2', 'ingsoft'] },
      { key: 'sgc', name: 'Sistema de Gestión de Contenidos', credits: 4, requires: ['progapli', 'ria'] },
      { key: 'tbdnsql', name: 'Taller de Bases de Datos NoSQL', credits: 4, requires: ['bd1', 'bd2'] },
    ],
  },
  {
    key: 'desarrollo_sw',
    name: 'Desarrollo de Software',
    minCredits: 12,
    subjects: [
      { key: 'ingsoft', name: 'Ingeniería de Software', credits: 12, requires: ['bd1', 'eda', 'progavan'] },
      { key: 'testing', name: 'Introducción al Testing Funcional', credits: 12, requires: ['ingsoft', 'progavan', 'progapli'] },
    ],
  },
  {
    key: 'humanas',
    name: 'Ciencias Humanas y Sociales',
    minCredits: 28,
    subjects: [
      { key: 'ingtec1', name: 'Inglés Técnico 1 (Act. Compl. 1)', credits: 8, requires: [] },
      { key: 'ingtec2', name: 'Inglés Conversacional (Act. Compl. 2)', credits: 4, requires: [] },
      { key: 'coe', name: 'Comunicación Oral y Escrita (Act. Compl. 3)', credits: 4, requires: [] },
      { key: 'cont', name: 'Contabilidad (Act. Compl. 4)', credits: 8, requires: [] },
      { key: 'rpyl', name: 'Relaciones Personales y Laborales', credits: 4, requires: [] },
      { key: 'economia', name: 'Economía', credits: 7, requires: [] },
      { key: 'gestinnovacion', name: 'Taller de Gestión de la Innovación en Tecnología', credits: 6, requires: [] },
      { key: 'conceptoscontables', name: 'Conceptos Contables (TAC)', credits: 10, requires: [] },
      { key: 'empresa', name: 'Aprender y Gestionar una Empresa', credits: 4, requires: ['cont', 'rpyl', 'coe'] },
      { key: 'tct', name: 'Taller de Cambio Tecnológico en Instituciones Financieras', credits: 12, requires: ['coe', 'cont', 'rpyl'] },
    ],
  },
  {
    key: 'proyecto_pasantia',
    name: 'Proyecto y Pasantía Laboral',
    minCredits: 30,
    subjects: [
      {
        key: 'paslab',
        name: 'Pasantía Laboral',
        credits: 10,
        requires: ['bd1', 'prinprog', 'bd2', 'arqcomp', 'progavan', 'redes', 'so', 'eda'],
      },
      {
        key: 'proyecto',
        name: 'Proyecto',
        credits: 20,
        requires: ['bd1', 'arqcomp', 'ingsoft', 'bd2', 'adminf', 'so', 'redes', 'progavan', 'progapli', 'mat', 'mdl1', 'prinprog', 'mdl2', 'eda'],
      },
    ],
  },
]

export const ALL_SUBJECTS = AREAS.flatMap((a) => a.subjects)
export const SUBJECT_BY_KEY = Object.fromEntries(ALL_SUBJECTS.map((s) => [s.key, s]))
export const TOTAL_SUBJECTS = ALL_SUBJECTS.length

// Agrupación alternativa "por semestre", como en la malla original que
// pasaste al principio. Las materias que no estaban en esa malla (talleres
// y optativas agregados después con el plan oficial) van todas juntas en
// un pool de "Electivas (5to/6to)", igual que antes.
const SEMESTER_KEYS = [
  { semester: 1, keys: ['prinprog', 'mdl1', 'mat', 'ingtec1', 'arqcomp'] },
  { semester: 2, keys: ['bd1', 'eda', 'ingtec2', 'mdl2', 'so'] },
  { semester: 3, keys: ['bd2', 'coe', 'cont', 'redes', 'progavan'] },
  { semester: 4, keys: ['adminf', 'ingsoft', 'pye', 'progapli', 'rpyl'] },
]

const ASSIGNED_KEYS = new Set(SEMESTER_KEYS.flatMap((s) => s.keys))

export const SEMESTER_VIEW = [
  ...SEMESTER_KEYS.map((s) => ({
    key: `sem-${s.semester}`,
    label: `${s.semester}.º Semestre`,
    minCredits: null,
    subjects: s.keys.map((k) => SUBJECT_BY_KEY[k]).filter(Boolean),
  })),
  {
    key: 'electivas',
    label: 'Electivas (5to / 6to)',
    minCredits: null,
    subjects: ALL_SUBJECTS.filter((s) => !ASSIGNED_KEYS.has(s.key)),
  },
]

export function isUnlocked(subject, completedSet) {
  return subject.requires.every((req) => completedSet.has(req))
}

export function missingRequirements(subject, completedSet) {
  return subject.requires
    .filter((req) => !completedSet.has(req))
    .map((req) => SUBJECT_BY_KEY[req]?.name ?? req)
}

export function creditsCompleted(completedSet) {
  return ALL_SUBJECTS.filter((s) => completedSet.has(s.key)).reduce((sum, s) => sum + s.credits, 0)
}

export function areaCreditsCompleted(area, completedSet) {
  return area.subjects.filter((s) => completedSet.has(s.key)).reduce((sum, s) => sum + s.credits, 0)
}
