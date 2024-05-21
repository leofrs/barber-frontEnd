export class AdminService {
  async getAllUsers() {
    const getUser = await fetch(
      'https://barber-back-end.vercel.app/admin/users'
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
      `http://192.168.1.110:3001/user?id=${userId}`,
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
      `http://192.168.1.110:3001/horariosDisponiveis?diaSemanaId=${diaSemanaId}`
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return response;
  }

  async getCalendario() {
    const apiCalendario = await fetch('http://192.168.1.110:3001/calendario')
      .then((response) => response.json())
      .catch((error) => Alert.alert('Erro ao enviar requisição:', error));

    return apiCalendario;
  }
}
