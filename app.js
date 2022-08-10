const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const validateToken = require('./utils')

 const app = express();
 const routes = express.Router();

 let students = [
    {
        id: 1,
        nombre: 'Estrella',
        Apellido: 'Romano'
    },
    {
        id: 2,
        nombre: 'Dario',
        apellido: 'Molina'
    },
    {
        id: 3,
        nombre: 'Julián',
        apellido: 'Dening'
    }
]

app.use(cors('*'))

app.use(morgan('dev'));

app.use(express.json())

app.get('/', (_, res) => res.send('Servidor para testeo de Postman'));

app.use('/api', validateToken, routes);


routes.get('/students', (_, res) => {
    res.status(200).json(students);
});



routes.get('/student/:id', (req, res) => {
    const student = students.filter(a => a.id === Number(req.params.id));
    student.length > 0 ? res.status(200).json(student) : res.status(404).json({error_message: "El id NO existe"});
});


routes.put('/student/:id', (req, res) => {
    const student = students.filter(a => a.id === Number(req.params.id));
    students[student[0].id-1] = {id: student[0].id, name: req.body.name, lastname: req.body.lastname};
    student.length > 0 ? res.status(200).json(students[student[0].id-1]) : res.status(404).json({error_message: "El id NO existe"})
});


routes.post('/student', (req, res) => {
    try{
        const idStudent = students[students.length-1].id+1
        students.push({id: idStudent, ...req.body});
        res.status(201).json({message: 'Alumno creado'})
    } catch (err) {
        res.json({error_message: "Error no se puedo cargar el alumno nuevo"})
    }
})

routes.delete('/student/:id', (req, res) => {
    const deleteStudents = students.filter(student => student.id != req.params.id);
    students = deleteStudents;
    students.length >= req.params.id ? res.status(200).json({message: "Alumno Eliminado"}) : res.status(404).json({error_message: "El id no existe"})
})


app.listen(8080, () => {
    console.log('Server listening http://localhost:8080');
});