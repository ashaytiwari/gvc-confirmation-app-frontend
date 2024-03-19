import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import queryKeys from "@/constants/queryKeys";
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

      queryClient.invalidateQueries({ queryKey: [queryKeys.confirmationForm] });
    }
  });

}

export function useGetConfirmationForms(page: number, title?: string) {

  return useQuery({
    queryKey: [queryKeys.confirmationForm, page],
    queryFn: () => adminServices.getConfirmationForms(page, title),
    placeholderData: keepPreviousData
  });

}