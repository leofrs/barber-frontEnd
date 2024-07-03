import { Alert } from "react-native";

export class AdminService {
  async getAllUsers() {
    const getUser = await fetch(
      "https://barber-backend-chi.vercel.app/allUsers"
    ).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
    return getUser;
  }

  async getCalendario() {
    const apiCalendario = await fetch(
      "https://barber-backend-chi.vercel.app/calendario"
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert("Erro ao enviar requisição:", error));

    return apiCalendario;
  }

  async apiHorariosDisponiveis(diaSemanaId: any) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaSemanaId),
    };
    const response = await fetch(
      `https://barber-backend-chi.vercel.app/horariosDisponiveis?diaSemanaId=${diaSemanaId}`
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert("Erro ao enviar requisição:", error));

    return response;
  }

  async getUserById(userId: any) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `https://barber-backend-chi.vercel.app/user?id=${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("Erro ao enviar requisição:", error));

    return response;
  }
}

export class UserService {
  async postUser(
    name: string,
    apelido: string,
    numero: number,
    password: string
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, apelido, numero, password }),
    };
    const apiUserPost = await fetch(
      "https://barber-backend-chi.vercel.app/register",
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert("Erro ao enviar requisição:", error));

    return apiUserPost;
  }

  async getUser({ name, password }) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    };

    try {
      const response = await fetch(
        "http:/https://barber-backend-chi.vercel.app/login",
        requestOptions
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      Alert.alert("Erro ao enviar requisição:");
      return null; // Ou outra forma de indicar um erro para o chamador
    }
  }

  async getCalendario() {
    const apiCalendario = await fetch(
      "https://barber-backend-chi.vercel.app/calendario"
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert("Erro ao enviar requisição:", error));

    return apiCalendario;
  }

  async apiHorariosDisponiveis(diaSemanaId) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaSemanaId),
    };
    const response = await fetch(
      `https://barber-backend-chi.vercel.app/horariosDisponiveis?diaSemanaId=${diaSemanaId}`
    )
      .then((response) => response.json())
      .catch((error) => Alert.alert("Erro ao enviar requisição:", error));

    return response;
  }

  async marcarHorario(horarioId, userId) {
    try {
      const response = await fetch(
        `https://barber-backend-chi.vercel.app/horarios?id=${horarioId}`,
        {
          method: "PATCH", // Assuming PATCH method for partial update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to mark the time slot");
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
