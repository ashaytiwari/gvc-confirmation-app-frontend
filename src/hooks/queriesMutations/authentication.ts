import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { ILoginParamsModel } from "@/interfaces/models/authentication";

import { authenticationService } from "@/services/authentication";

export function useAdminLogin() {

  return useMutation({
    mutationFn: (params: ILoginParamsModel) => authenticationService.adminLogin(params)
  });

}