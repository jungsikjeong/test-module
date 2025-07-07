import Service from "../Service";

export class AuthService extends Service {
  async forgetUserid(email: string) {
    try {
      const response = await this.axios.post("/auth/forget-userid", {
        email,
      });

      console.log("response:", response);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 404:
            throw new Error("존재하지 않는 이메일입니다");
          case 400:
            throw new Error(data.message || "잘못된 요청입니다");
          case 500:
            throw new Error(
              "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요"
            );
          default:
            throw new Error(data.message || "알 수 없는 오류가 발생했습니다");
        }
      } else if (error.request) {
        throw new Error("네트워크 연결을 확인해주세요");
      } else {
        throw new Error("요청을 처리할 수 없습니다");
      }
    }
  }
}
