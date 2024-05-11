import { Alert } from 'react-native';

export class UserService {
  async postUser({ name, email, password }) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    };
    const apiUserPost = await fetch(
      'https://barber-back-end.vercel.app/register',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return apiUserPost;
  }

  async getUser({ name, password }) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    };
    const apiUserPost = await fetch(
      'https://barber-back-end.vercel.app/login',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return apiUserPost;
  }

  async getCalendario() {
    const apiCalendario = await fetch('http://192.168.1.110:3001/calendario')
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return apiCalendario;
  }

  async apiHorariosDisponiveis(diaSemanaId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diaSemanaId),
    };
    const response = await fetch(
      `http://192.168.1.110:3001/horariosDisponiveis?diaSemanaId=${diaSemanaId}`
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return response;
  }
}
