// /* eslint-disable @typescript-eslint/no-var-requires */
// const { pool } = require('../server');

// // Middleware for checking if user is authenticated
// const authMiddleware = (req, res, next) => {
//   if (req.session.email) {
//     next();
//   } else {
//     res.status(401).send("Acesso não autorizado");
//   }
// };

// // Middleware for checking if user is authenticated as a professor
// const checkProfessorAuth = (req, res, next) => {
//   const userEmail = req.session.email;
//   if (userEmail) {
//     // Check if the user exists in the professors table
//     pool.query('SELECT * FROM professores WHERE email = ?', [userEmail], (error, results) => {
//       if (error) {
//         console.error('Error fetching professor:', error);
//         res.status(500).send('Internal Server Error');
//       } else if (results.length > 0) {
//         next();
//       } else {
//         res.status(403).send('Forbidden');
//       }
//     });
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };

// // Middleware for checking if user is authenticated as a student
// const checkStudentAuth = (req, res, next) => {
//   const userEmail = req.session.email;
//   if (userEmail) {
//     // Check if the user exists in the students table
//     pool.query('SELECT * FROM alunos WHERE email = ?', [userEmail], (error, results) => {
//       if (error) {
//         console.error('Error fetching student:', error);
//         res.status(500).send('Internal Server Error');
//       } else if (results.length > 0) {
//         next();
//       } else {
//         res.status(403).send('Forbidden');
//       }
//     });
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };

// module.exports = { authMiddleware, checkProfessorAuth, checkStudentAuth };
