import axiosClient from "@/axiosClient";

import { ILoginParamsModel } from "@/interfaces/models/authentication";

class AuthenticationService {

  async adminLogin(params: ILoginParamsModel) {
    const response = await axiosClient.post('/adminLogin', params);
    return response;
  }

}

export const authenticationService = new AuthenticationService();