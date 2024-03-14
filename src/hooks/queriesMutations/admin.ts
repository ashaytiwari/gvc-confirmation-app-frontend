import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { IConfirmationFormModel } from "@/interfaces/models/admin";

import { adminServices } from "@/services/admin";

export function useUpdateConfirmationForm() {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: IConfirmationFormModel) => adminServices.updateConfirmationForm(params),
    onSuccess: (response) => {

      const responseData = response.data;
      if (responseData.statusCode === 200) {
        toast.success(responseData.message);
      }

      queryClient.invalidateQueries({ queryKey: ['confirmForm'] });
    }
  });

}