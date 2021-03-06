import React, { Component } from "react";
import { connect } from "react-redux";

import { addTarefa } from "../../store/actions/tarefaActions";
import { getAlunos, getRanking } from "../../store/actions/gameActions";

class AdicionarTarefa extends Component {
  state = {
    descricao: "",
    classificacao: "",
    tag: "",
    dta_resolucao: "",
    validado: 0,
    regra: "",
    tb_aluno_matricula: ""
  };

  componentDidMount() {
    this.props.getAlunos(this.props.game.game.id);
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  criarTarefa = e => {
    e.preventDefault();
    const regra = JSON.parse(this.state.regra);

    const tarefa = {
      descricao: this.state.descricao,
      classificacao: regra.classificacao,
      tag: regra.tag,
      dta_resolucao: this.state.dta_resolucao,
      gameId: this.props.game.game.id,
      matricula:
        this.props.auth.user.papel === "professor"
          ? this.state.tb_aluno_matricula
          : this.props.auth.profile.matricula
    };

    this.props.addTarefa(tarefa);
    this.props.getRanking(tarefa.gameId);
    this.props.toggleAddModal();
  };

  render() {
    const { alunos } = this.props.game;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Nova tarefa</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.props.toggleAddModal}
            />
          </header>
          <form onSubmit={this.criarTarefa}>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Descrição</label>
                <div className="control">
                  <textarea
                    maxLength="45"
                    className="textarea"
                    placeholder="Descrição"
                    name="descricao"
                    onChange={this.handleChange}
                    required
                    value={this.state.descricao}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Data de resolução</label>
                <div className="control">
                  <input
                    required
                    className="input"
                    type="date"
                    placeholder="Data de resolução"
                    name="dta_resolucao"
                    onChange={this.handleChange}
                    value={this.state.dta_resolucao}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Regra</label>
                <div className="control select">
                  <select
                    value={this.state.regra}
                    onChange={this.handleChange}
                    name="regra"
                    required
                  >
                    <option value="" disabled>
                      Classificação/Tag
                    </option>
                    {this.props.regra.regras.map(regra => (
                      <option key={regra.id} value={JSON.stringify(regra)}>
                        {regra.classificacao}/{regra.tag}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {this.props.auth.user.papel === "professor" ? (
                <div className="field">
                  <label className="label">Aluno</label>
                  <div className="control select">
                    <select
                      value={this.state.tb_aluno_matricula}
                      onChange={this.handleChange}
                      name="tb_aluno_matricula"
                      required
                    >
                      <option value="" disabled>
                        Selecione a opção
                      </option>
                      {alunos.map(aluno => (
                        <option key={aluno.matricula} value={aluno.matricula}>
                          {aluno.nome}/{aluno.matricula}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <small className="is-size-7">
                  Suas tarefas ainda precisam ser validadas pelo professor.
                </small>
              )}
            </section>
            <footer className="modal-card-foot">
              <input type="submit" className="button is-link" value="Criar" />
              <button className="button" onClick={this.props.toggleAddModal}>
                Cancelar
              </button>
            </footer>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game, regra, auth }) => ({ game, regra, auth });

export default connect(
  mapStateToProps,
  { addTarefa, getAlunos, getRanking }
)(AdicionarTarefa);
