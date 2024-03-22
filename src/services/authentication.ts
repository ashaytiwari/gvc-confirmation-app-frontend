import axiosClient from "@/axiosClient";

import { IChangePasswordModel } from "@/interfaces/models/admin";
import { ILoginParamsModel } from "@/interfaces/models/authentication";

class AuthenticationService {

  async adminLogin(params: ILoginParamsModel) {
    const response = await axiosClient.post('/adminLogin', params);
    return response;
  }

  async adminLogout() {
    const response = await axiosClient.post('/logout');
    return response;
  }

  async changePassword(params: IChangePasswordModel) {
    const response = await axiosClient.post('/changePassword', params);
    return response;
  }

}

export const authenticationService = new AuthenticationService();