import axios from 'axios';

const dataBase = process.env.URL_DATABASE;

export class UserApi {
  async getUser() {
    axios
      .get(`${dataBase}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }

  async postUser(user) {
    try {
      const response = await axios.post(`${dataBase}`, user);
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error('Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao fazer solicitação:', error);
      throw error;
    }
  }
}

export default UserApi;
