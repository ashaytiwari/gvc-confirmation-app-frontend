import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";

import queryKeys from "@/constants/queryKeys";

import { IUpdateUserConfirmationsParamsModel } from "@/interfaces/models/user";

import { userServices } from "@/services/user";

export function useGetConfirmationFormDetails(formId: string) {

  return useQuery({
    queryKey: [queryKeys.confirmationFormDetailsForUser],
    queryFn: () => userServices.getConfirmationFormDetails(formId)
  });

}

export function useUpdateUserConfirmation() {

  return useMutation({
    mutationFn: (params: IUpdateUserConfirmationsParamsModel) => userServices.updateUserConfirmations(params),
    onSuccess: (response) => {
      if (response.data.statusCode !== 200) {
        toast(response.data.message);
      }
    }
  });

}