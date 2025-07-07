import { AuthService } from "@/services/auth/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useForgetUserid() {
  const mutate = useMutation({
    mutationFn: (email: string) => new AuthService().forgetUserid(email),
  });

  return mutate;
}
