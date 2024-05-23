export class AdminService {
  async getAllUsers() {
    const getUser = await fetch(
      'https://barber-backend-chi.vercel.app/allUsers'
    ).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
    return getUser;
  }

  async getUserById(userId) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(
      `https://barber-backend-chi.vercel.app/user?id=${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log('Erro ao enviar requisição:', error));

    return response;
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
      `https://barber-backend-chi.vercel.app/horariosDisponiveis?diaSemanaId=${diaSemanaId}`
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return response;
  }

  async getCalendario() {
    const apiCalendario = await fetch(
      'https://barber-backend-chi.vercel.app/calendario'
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return apiCalendario;
  }
}
