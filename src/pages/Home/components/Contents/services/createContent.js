import api from 'services/api';

const createContent = async (data, token) =>
  api.post(`/contents`, data,
    {
      headers: {
        "Authorization": token,
      }
    }
  )
    .then(async (res) => {
      alert('Conteudo criado!');
      const response = { data: res.data };
      return response
    })
    .catch((e) => {
      alert('Algo deu errado, tente novamente!');
      console.log(e);
      return { data: {}, errors: e }
    });
export default createContent;