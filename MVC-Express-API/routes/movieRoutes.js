const express = require("express");
const router = express.Router();

const {
    createMovie,
    readMovies,
    readMovieById,
    updateMovieById,
    deleteMovieById
} = require("../controllers/movieController");

router.post("/", createMovie);
router.get("/", readMovies);
router.get("/:id", readMovieById);
router.put("/:id", updateMovieById);
router.delete("/:id", deleteMovieById);

module.exports = router;