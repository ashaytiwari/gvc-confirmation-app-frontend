import { useQuery } from "@tanstack/react-query";

import queryKeys from "@/constants/queryKeys";

import { userServices } from "@/services/user";

export function useGetConfirmationFormDetails(formId: string) {

  return useQuery({
    queryKey: [queryKeys.confirmationFormDetailsForUser],
    queryFn: () => userServices.getConfirmationFormDetails(formId)
  });

}