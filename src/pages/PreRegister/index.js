import React, { useState } from 'react';
import {
  Container,
  Body,
  TitleDiv,
  Title,
  Subtitle
} from './styles';

import Header from 'sharedComponents/Header'
import Form from './Form'
import Thanks from './Thanks'

const PreRegister = () => {
  const [redirect, setRedirect] = useState(false)

  const setRedirectCallback = (redirect) => {
    setRedirect(redirect)
  }

  return (
    <>
      {redirect ?
        <Thanks />
        :
        <Container>
          <Header />
          <Body>
            <TitleDiv>
              <Title>Retorne às atividades com segurança</Title>
              <Subtitle>Use o Guardiões da Saúde para monitorar o estado de saúde dos integrantes da sua instituição</Subtitle>
            </TitleDiv>
            <Form setRedirectCallback={setRedirectCallback} />
          </Body>
        </Container>
      }
    </>
  );
}

export default PreRegister;