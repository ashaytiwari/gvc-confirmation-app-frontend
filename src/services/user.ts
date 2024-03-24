import axiosClient from "@/axiosClient";

class UserServices {

  async getConfirmationFormDetails(formId: string) {
    const url = `/getConfirmationFormDetails?formId=${formId}`;
    const response = await axiosClient.get(url);

    if (response.data.statusCode !== 200) {
      throw response.data;
    }

    return response;
  }

};

export const userServices = new UserServices();