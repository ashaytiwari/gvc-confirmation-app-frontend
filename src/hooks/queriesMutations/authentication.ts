import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import routesPath from "@/constants/routesPath";
import { ILoginParamsModel } from "@/interfaces/models/authentication";

import { authenticationService } from "@/services/authentication";

import { clearApplicationStorage, setApplicationStorage } from "@/utilities/storage";

export function useAdminLogin() {

  const router = useRouter();

  return useMutation({
    mutationFn: (params: ILoginParamsModel) => authenticationService.adminLogin(params),
    onSuccess: (response) => {
      setApplicationStorage(response.data.data);
      router.push(routesPath.adminDashboardRoute);
    }
  });

}

export function useAdminLogout() {

  const router = useRouter();

  return useMutation({
    mutationFn: () => authenticationService.adminLogout(),
    onSuccess: (response) => {
      clearApplicationStorage();
      router.push(routesPath.initialRoute);
    }
  });

}