// Plan de estudios - Tecnólogo en Informática (Fing - UdelaR)
// Las materias de 5to y 6to semestre incluyen talleres optativos:
// no hace falta cursarlos todos, tildá solo los que efectivamente curses.

export const CURRICULUM = [
  {
    semester: 1,
    optional: false,
    subjects: [
      { key: 'arqcomp', name: 'Arquitectura del Computador', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/arqcomp/middlearq.html' },
      { key: 'ingtec1', name: 'Inglés Técnico 1', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/ingtec1/middleit1.htm' },
      { key: 'mat', name: 'Matemática', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/mat/middlemat.htm' },
      { key: 'mdl1', name: 'Matemática Discreta y Lógica 1', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/mdl1/middlemdl1.htm' },
      { key: 'prinprog', name: 'Principios de Programación', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/prinprog/middlepp.htm' },
    ],
  },
  {
    semester: 2,
    optional: false,
    subjects: [
      { key: 'bd1', name: 'Bases de Datos 1', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/bd1/middlebd1.html' },
      { key: 'eda', name: 'Estructuras de Datos y Algoritmos', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/eda/middleeda.html' },
      { key: 'ingtec2', name: 'Inglés Técnico 2', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/ingtec2/middleit2.htm' },
      { key: 'mdl2', name: 'Matemática Discreta y Lógica 2', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/mdl2/middlemdl2.htm' },
      { key: 'so', name: 'Sistemas Operativos', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/so/middlessoo.html' },
    ],
  },
  {
    semester: 3,
    optional: false,
    subjects: [
      { key: 'bd2', name: 'Bases de Datos 2', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/bd2/middlebd2.html' },
      { key: 'coe', name: 'Comunicación Oral y Escrita', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/coe/middlecoe.html' },
      { key: 'cont', name: 'Contabilidad', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/cont/middlecont.htm' },
      { key: 'redes', name: 'Redes de Computadoras', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/redes/middleredes.htm' },
      { key: 'progavan', name: 'Programación Avanzada', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/progavan/middleprogavan.htm' },
    ],
  },
  {
    semester: 4,
    optional: false,
    subjects: [
      { key: 'adminf', name: 'Administración de Infraestructuras', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/adminf/middleadminf.htm' },
      { key: 'ingsoft', name: 'Ingeniería de Software', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/ingsoft/middleingsoft.htm' },
      { key: 'pye', name: 'Probabilidad y Estadística', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/pye/middlepye.htm' },
      { key: 'progapli', name: 'Programación de Aplicaciones', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/progapli/middleprogapli.htm' },
      { key: 'rpyl', name: 'Relaciones Personales y Laborales', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/rpyl/middlerpyl.htm' },
    ],
  },
  {
    semester: 5,
    optional: true,
    subjects: [
      { key: 'ria', name: 'Taller de Aplicaciones de Internet Ricas', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/ria/middleria.htm' },
      { key: 'tsi_net', name: 'Taller de Sistemas de Información .NET', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tsi_net/middletsi_net.htm' },
      { key: 'tsig', name: 'Taller de Sistemas de Información Geográfica', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tsig/middletsig.htm' },
      { key: 'cdatos', name: 'Calidad de Datos', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/cdatos/middlecdatos.htm' },
      { key: 'paslab', name: 'Pasantía Laboral', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/paslab/middlepaslab.htm' },
      { key: 'otbutia', name: 'Butiá: Robótica Educativa', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/otbutia/otbutia.pdf' },
      { key: 'otinfsalud', name: 'Informatización de Sistemas de Salud', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/otinfsalud/middleinfsalud.htm' },
      { key: 'desphp', name: 'Desarrollo de Sitios Web con PHP', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/desphp/middledesphp.htm' },
      { key: 'testing', name: 'Introducción al Testing Funcional', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/testing/middletesting.htm' },
      { key: 'frobotica', name: 'Fundamentos de la Robótica Autónoma', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/frobotica/middlefrobotica.htm' },
      { key: 'proyecto5', name: 'Proyecto', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/proyecto/middleproyecto.htm' },
    ],
  },
  {
    semester: 6,
    optional: true,
    subjects: [
      { key: 'tam', name: 'Taller de Aplicaciones Para Dispositivos Móviles', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tam/middletam.htm' },
      { key: 'tct', name: 'Taller de Cambio Tecnológico', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tct/middletct.htm' },
      { key: 'tsi_jee', name: 'Taller de Sistemas de Información Java EE', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tsi_jee/middletsi_jee.htm' },
      { key: 'desapphp', name: 'Desarrollo de Aplicaciones Web con PHP', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/desapphp/middledesapphp.htm' },
      { key: 'desgx', name: 'Desarrollo de Aplicaciones Basadas en Tecnologías Genexus', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/desgx/middledesgx.htm' },
      { key: 'vj2d', name: 'Taller de Diseño y Programación de Video Juegos 2D', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/vj2d/middlevj2d.html' },
      { key: 'xml', name: 'Introducción a XML y Estándares Asociados', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/xml/middlexml.htm' },
      { key: 'tbdnsql', name: 'Taller de Bases de Datos No SQL', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/tbdnsql/middletbdnsql.htm' },
      { key: 'adi2', name: 'Administración de Infraestructuras II', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/adi2/adi2.pdf' },
      { key: 'proyecto6', name: 'Proyecto', url: 'https://www.fing.edu.uy/tecnoinf/mvd/cursos/proyecto/middleproyecto.htm' },
    ],
  },
]

export const TOTAL_SUBJECTS = CURRICULUM.reduce((sum, s) => sum + s.subjects.length, 0)
