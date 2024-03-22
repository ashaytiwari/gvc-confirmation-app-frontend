import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import messages from "@/constants/messages";
import routesPath from "@/constants/routesPath";

import { ILoginParamsModel } from "@/interfaces/models/authentication";
import { IChangePasswordModel } from "@/interfaces/models/admin";

import { authenticationService } from "@/services/authentication";

import { clearApplicationStorage, setApplicationStorage } from "@/utilities/storage";

export function useAdminLogin() {

  const router = useRouter();

  return useMutation({
    mutationFn: (params: ILoginParamsModel) => authenticationService.adminLogin(params),
    onSuccess: (response) => {
      if (response.data.statusCode === 200) {
        setApplicationStorage(response.data.data);
        router.push(routesPath.adminDashboardRoute);
      } else {
        toast(response.data.message);
      }
    }
  });

}

export function useAdminLogout() {

  const router = useRouter();

  return useMutation({
    mutationFn: () => authenticationService.adminLogout(),
    onSuccess: (response) => {
      if (response.data.statusCode === 200) {
        clearApplicationStorage();
        router.push(routesPath.initialRoute);
      } else {
        toast(response.data.message);
      }
    }
  });

}

export function useChangePassword() {

  const router = useRouter();

  return useMutation({
    mutationFn: (params: IChangePasswordModel) => authenticationService.changePassword(params),
    onSuccess: (response) => {
      if (response.data.statusCode === 200) {
        clearApplicationStorage();
        router.push(routesPath.initialRoute);
        toast.success(messages.passwordChangeSuccessfully);
      } else {
        toast.error(response.data.message);
      }
    }
  });

}