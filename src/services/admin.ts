import axiosClient from "@/axiosClient";

import { IConfirmationFormModel } from "@/interfaces/models/admin";

class AdminServices {

  async updateConfirmationForm(params: IConfirmationFormModel) {
    const response = await axiosClient.post('/updateConfirmationForm', params);
    return response;
  }

  async getConfirmationForms(page: number, title?: string) {

    let url = `/getConfirmationForms?page=${page}&limit=2`;

    if (title) {
      url += ` &title=${title}`;
    }

    const response = await axiosClient.get(url);
    return response;
  }

};

export const adminServices = new AdminServices();