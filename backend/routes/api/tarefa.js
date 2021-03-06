const express = require("express");
const router = express.Router();
const passport = require("passport");

const checkUserRole = require("../../utils/checkUserRole");

const TarefaController = require("../../controllers/tarefaController");

// @route   GET api/tarefa/getTarefasByGame/id
// @desc    Get all tarefas for the current game
// @returns All tarefas
// @access  private
router.get(
  "/getTarefasByGame/:id",
  passport.authenticate("jwt", { session: false }),
  TarefaController.getTarefasByGame
);

// @route   GET api/tarefa/pendentes
// @desc    Get all tarefas not validated
// @returns All tarefas
// @access  private
router.get(
  "/pendentes/:matricula",
  passport.authenticate("jwt", { session: false }),
  TarefaController.getPendentes
);

// @route   POST api/tarefa/
// @desc    Create tarefa
// @params  Classificacao, descricao, data de resolucao, tag, matricula, game id
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  TarefaController.createTarefa
);

// @route   DELETE api/tarefa
// @desc    Delete a tarefa
// @params  TarefaID
// @access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  TarefaController.deleteTarefa
);

// @route   UPDATE api/tarefa/updateTarefa
// @desc    Update a tarefa
// @params  TarefaID, Classificação, Descrição e Tag
// @access  private
router.put(
  "/updateTarefa",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  TarefaController.updateTarefa
);

// @route   UPDATE api/tarefa/updateValidado
// @desc    Update validado
// @params  TarefaID and Validado
// @access  private
router.put(
  "/updateValidado",
  passport.authenticate("jwt", { session: false }),
  checkUserRole(["professor"]),
  TarefaController.updateValidado
);

// @route   DELETE api/tarefa
// @desc    Delete a tarefa
// @params  TarefaID
// @access  private
router.delete(
  "/aluno/:matricula/:gameId",
  passport.authenticate("jwt", { session: false }),
  TarefaController.deleteAlunoTarefas
);

module.exports = router;
