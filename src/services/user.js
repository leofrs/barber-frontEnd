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
      'http://192.168.1.110:3001/register',
      requestOptions
    )
      .then((response) => response.json())
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

    try {
      const response = await fetch(
        'http://192.168.1.110:3001/login',
        requestOptions
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
      Alert.alert('Erro ao enviar requisição:', error.message);
      return null; // Ou outra forma de indicar um erro para o chamador
    }
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

  async marcarHorario(horarioId, userId) {
    try {
      const response = await fetch(
        `http://192.168.1.110:3001/horarios?id=${horarioId}`,
        {
          method: 'PATCH', // Assuming PATCH method for partial update
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to mark the time slot');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
