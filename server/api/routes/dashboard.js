const router = require('express').Router();
// const { Student } = require('../../db').models;

// router.get('/', async (req, res, next) => {
//     try {
//         const students = await Student.findAll();
//         res.status(200).send(students);
//     } catch (error) {
//         next(error);
//     }
//   });

// router.get('/:id', async (req, res, next) => {
//     try {
//         const singleStudent = await Student.findByPk(req.params.id);
//         res.status(200).send(singleStudent);
//     } catch (error) {
//         next(error);
//     }
// });

// router.post('/', async (req, res, next) => {
//     try{
//         const data = await Student.create(req.body)
//         res.status(201).send(data);
//     }
//     catch(err) {
//         next(err);
//     }
// })

// router.put('/:studentId', async (req, res, next) => {
//     try{
//         const id = req.params.studentId;
//         const updatedStudent = req.body;

//         const data = await Student.update(updatedStudent, {
//             where: {
//                 id: id,
//             },
//             returning : true
//         })
//         res.status(200).send(data[1][0]);
//     }
//     catch(err) {
//         next(err);
//     }
// })

// router.delete('/:studentId', async (req, res, next) => {
//     try {
//         const student = await Student.findByPk(req.params.studentId);
//         await student.destroy();
//         res.status(200).send(student);
//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router