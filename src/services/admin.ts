import axiosClient from "@/axiosClient";

import { IConfirmationFormModel } from "@/interfaces/models/admin";

class AdminServices {

  async updateConfirmationForm(params: IConfirmationFormModel) {
    const response = await axiosClient.post('/updateConfirmationForm', params);
    return response;
  }

  async getConfirmationForms(page: number, title?: string) {
    const response = await axiosClient.get(`/getConfirmationForms?page=${page}&limit=6&title=${title}`);
    return response;
  }

};

export const adminServices = new AdminServices();