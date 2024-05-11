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
}
