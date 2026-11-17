const Movie = require("../models/MovieModel");

// Create Movie
const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const result = await newMovie.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read All Movies
const readMovies = async (req, res) => {
    try {
        const result = await Movie.find();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Read Movie By ID
const readMovieById = async (req, res) => {
    try {
        const result = await Movie.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Movie
const updateMovieById = async (req, res) => {
    try {
        const result = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Movie
const deleteMovieById = async (req, res) => {
    try {
        const result = await Movie.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMovie,
    readMovies,
    readMovieById,
    updateMovieById,
    deleteMovieById
};