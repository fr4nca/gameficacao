const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const GameController = require("../../controllers/gameController");

// @route   GET api/game/
// @desc    Get all games for the current logged in user
// @returns All games
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  GameController.getGames
);

// @route   POST api/game/
// @desc    Create a game
// @params  Nome, data de inicio, data de fim, id disciplina and matricula professor
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.createGame
);

// @route   GET api/game/getAlunoGame
// @desc    Get all alunos from a game
// @params  Game id
// @access  private
router.get(
  "/getAlunoGame",
  passport.authenticate("jwt", { session: false }),
  GameController.getAlunoGame
);

// @route   POST api/game/addAlunoGame
// @desc    Add a aluno to a game
// @params  Game ID and aluno matricula
// @access  private
router.post(
  "/addAlunoGame",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  GameController.addAlunoGame
);

module.exports = router;