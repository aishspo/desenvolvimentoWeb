/* eslint-disable @typescript-eslint/no-var-requires */

const db = require("../server");

const authMiddleware = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).send("Acesso não autorizado");
  }
};

// Middleware for checking if user is authenticated as a professor
const checkProfessorAuth = (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    // Check if the user exists in the professors table
    db.query(
      "SELECT * FROM professores WHERE id = ?",
      [userId],
      (error, results) => {
        if (error) {
          console.error("Error fetching professor:", error);
          res.status(500).send("Internal Server Error");
        } else if (results.length > 0) {
          next();
        } else {
          res.status(403).send("Forbidden");
        }
      }
    );
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = { authMiddleware, checkProfessorAuth };
