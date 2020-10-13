import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setManagers, setToken
} from 'actions/';

import { bindActionCreators } from 'redux';
import getAllManagers from './services/getAllManagers'
import createManager from './services/createManager'
import deleteManager from './services/deleteManager'
import editManager from './services/editManager';

import {
  Container,
  AddAppContainer,
  ContainerHeader,
  ContainerTitle,
  ContainerForm,
  Form,
  Inputs,
  InputBlock,
  Input,
  SubmitButton,
  EditInput,
  EditButton,
} from './styles';
import { useForm } from "react-hook-form";
import Modal from 'react-bootstrap/Modal';
import ContentBox from '../ContentBox';

const Managers = ({
  token,
  user,
  managers,
  setManagers,
  setToken
}) => {

  const { handleSubmit } = useForm()
  const [managerName, setManagerName] = useState("")
  const [managerEmail, setManagerEmail] = useState("")
  const [managerPassword, setManagerPassword] = useState("")
  const [modalEdit, setModalEdit] = useState(false);
  const [editingManager, setEditingManager] = useState({});
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [managerShow, setManagerShow] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const _createManager = async () => {
    const data = {
      "manager": {
        "password": managerPassword,
        "email": managerEmail,
        "name": managerName,
        "app_id": 1,
      }
    }
    await createManager(data, token)
    setManagerName("")
    setManagerPassword("")
    setManagerEmail("")
    _getAllManagers(token);
  }

  const _deleteManager = async (id, token) => {
    await deleteManager(id, token)
    _getAllManagers(token)
  }

  const _editManager = async () => {
    const data = {
      "manager": {
        "password": editPassword,
        "email": editEmail,
        "name": editName,
        "app_id": 1,
      }
    };
    await editManager(editingManager.id, data, token);
    setModalEdit(false);
    _getAllManagers(token);
  }

  const handleShow = (content) => {
    setManagerShow(content);
    setModalShow(!modalShow);
  }

  const handleEdit = (content) => {
    setEditingManager(content);
    setEditName(content.name);
    setEditEmail(content.email);
    setModalEdit(!modalEdit);
  }

  const handleEditName = (value) => {
    setEditName(value);
  }

  const handleEditEmail = (value) => {
    setEditEmail(value);
  }

  const handleEditPassword = (value) => {
    setEditPassword(value);
  }

  const _getAllManagers = async (token) => {
    const response = await getAllManagers(token)
    loadManagers(response)
  }

  const loadManagers = async (response) => {
    let aux_managers = [];
    if (!response.managers) {
      response.managers = [];
    }
    response.managers.map(manager => {
      aux_managers.push({
        "id": manager.id,
        "name": manager.name,
        "email": manager.email,
      })
    })
    await setManagers(aux_managers)
  }

  useEffect(() => {
    _getAllManagers(token)
    setToken(token)
  }, []);

  const fields =
    [{
      key: "id",
      value: "ID"
    },
    {
      key: "name",
      value: "Nome",
    }];

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Informações do Gerente
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <EditInput>
            <label>ID</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.id}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Nome</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.name}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>E-mail</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.email}
              disabled
            />
          </EditInput>

          <EditInput>
            <label>Grupo</label>
            <input
              className="text-dark"
              type="text"
              value={managerShow.group_name}
              disabled
            />
          </EditInput>
        </Modal.Body>

        <Modal.Footer>
          <EditButton onClick={() => setModalShow(false)}>Voltar</EditButton>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalEdit}
        onHide={() => setModalEdit(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Editar Gerente
          </Modal.Title>
        </Modal.Header>
        <form id="editManager" onSubmit={handleSubmit(_editManager)}>
          <Modal.Body>
            <EditInput>
              <label htmlFor="edit_name">Nome</label>
              <input
                type="text"
                id="edit_name"
                value={editName}
                onChange={(e) => handleEditName(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_email">E-mail</label>
              <input
                type="email"
                id="edit_email"
                value={editEmail}
                onChange={(e) => handleEditEmail(e.target.value)}
              />
            </EditInput>

            <EditInput>
              <label htmlFor="edit_password">Senha</label>
              <input
                type="password"
                id="edit_password"
                value={editPassword}
                onChange={(e) => handleEditPassword(e.target.value)}
              />
            </EditInput>
          </Modal.Body>
          <Modal.Footer>
            <EditButton type="submit">Editar</EditButton>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <ContentBox
          title="Gerentes de Instituições"
          token={token}
          contents={managers ? managers : []}
          fields={fields}
          delete_function={_deleteManager}
          handleEdit={handleEdit}
          handleShow={handleShow}
        />

        <AddAppContainer className="shadow-sm">
          <ContainerHeader>
            <ContainerTitle>Adicionar Gerente</ContainerTitle>
          </ContainerHeader>
          <ContainerForm>
            <Form id="addApp" onSubmit={handleSubmit(_createManager)}>
              <Inputs>
                <InputBlock>
                  <label htmlFor="name">Nome</label>
                  <Input
                    type="text"
                    id="name"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="email">E-mail</label>
                  <Input
                    type="email"
                    id="email"
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                  />
                </InputBlock>
                <InputBlock>
                  <label htmlFor="password">Senha</label>
                  <Input
                    type="password"
                    id="password"
                    value={managerPassword}
                    onChange={(e) => setManagerPassword(e.target.value)}
                  />
                </InputBlock>
              </Inputs>
              <SubmitButton type="submit">
                Adicionar
              </SubmitButton>
            </Form>
          </ContainerForm>
        </AddAppContainer>
      </Container >
    </>
  );
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
  managers: state.user.managers
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    setManagers,
    setToken
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Managers);