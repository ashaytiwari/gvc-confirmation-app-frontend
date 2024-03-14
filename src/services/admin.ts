import axiosClient from "@/axiosClient";

import { IConfirmationFormModel } from "@/interfaces/models/admin";

class AdminServices {

  async updateConfirmationForm(params: IConfirmationFormModel) {
    const response = await axiosClient.post('/updateConfirmationForm', params);
    return response;
  }

};

export const adminServices = new AdminServices();