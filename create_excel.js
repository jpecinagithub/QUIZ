// Script para crear el archivo Excel con las preguntas de ejemplo
const XLSX = require('xlsx');

// Datos de las preguntas
const data = [
    ['Pregunta', 'Respuesta Verdadera', 'Respuesta Falsa 1', 'Respuesta Falsa 2', 'Respuesta Falsa 3'],
    ['¿Cuál es la capital de Francia?', 'París', 'Londres', 'Roma', 'Berlín'],
    ['¿Cuál es el planeta más cercano al Sol?', 'Mercurio', 'Venus', 'Marte', 'Júpiter'],
    ['¿Cuántos continentes hay en el mundo?', '7', '5', '6', '8'],
    ['¿Quién escribió Cien años de soledad?', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Pablo Neruda', 'Isabel Allende'],
    ['¿En qué país se encuentra Machu Picchu?', 'Perú', 'México', 'Bolivia', 'Colombia'],
    ['¿Cuál es el océano más grande del mundo?', 'Pacífico', 'Atlántico', 'Índico', 'Ártico'],
    ['¿En qué año llegó el hombre a la Luna?', '1969', '1968', '1970', '1971'],
    ['¿Cuál es el elemento químico más abundante en el universo?', 'Hidrógeno', 'Oxígeno', 'Carbono', 'Helio'],
    ['¿Quién pintó La Mona Lisa?', 'Leonardo da Vinci', 'Miguel Ángel', 'Rafael', 'Donatello'],
    ['¿Cuál es la montaña más alta del mundo?', 'Monte Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
    ['¿En qué continente se encuentra Egipto?', 'África', 'Asia', 'Europa', 'América'],
    ['¿Cuál es la velocidad de la luz?', '300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
    ['¿Cuál es el río más largo del mundo?', 'Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'],
    ['¿En qué año comenzó la Segunda Guerra Mundial?', '1939', '1940', '1938', '1941'],
    ['¿Cuál es la capital de Australia?', 'Canberra', 'Sídney', 'Melbourne', 'Perth']
];

// Crear un nuevo libro de trabajo
const wb = XLSX.utils.book_new();

// Crear una hoja de trabajo con los datos
const ws = XLSX.utils.aoa_to_sheet(data);

// Ajustar el ancho de las columnas
const colWidths = [
    { wch: 50 }, // Pregunta
    { wch: 25 }, // Respuesta Verdadera
    { wch: 25 }, // Respuesta Falsa 1
    { wch: 25 }, // Respuesta Falsa 2
    { wch: 25 }  // Respuesta Falsa 3
];
ws['!cols'] = colWidths;

// Añadir la hoja al libro
XLSX.utils.book_append_sheet(wb, ws, 'Preguntas');

// Escribir el archivo
XLSX.writeFile(wb, 'quiz.xlsx');

console.log('Archivo quiz.xlsx creado exitosamente!');