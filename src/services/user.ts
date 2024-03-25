import axiosClient from "@/axiosClient";

import { IUpdateUserConfirmationsParamsModel } from "@/interfaces/models/user";

class UserServices {

  async getConfirmationFormDetails(formId: string) {
    const url = `/getConfirmationFormDetails?formId=${formId}`;
    const response = await axiosClient.get(url);

    if (response.data.statusCode !== 200) {
      throw response.data;
    }

    return response;
  }

  async updateUserConfirmations(params: IUpdateUserConfirmationsParamsModel) {
    const response = await axiosClient.post('/updateUserConfirmation', params);
    return response;
  }

  async getUserConfirmationsByFormId(formId: string) {
    const url = `/getUserConfirmations?formId=${formId}`;
    const response = await axiosClient.get(url);

    if (response.data.statusCode !== 200) {
      throw response.data;
    }

    return response;
  }

};

export const userServices = new UserServices();