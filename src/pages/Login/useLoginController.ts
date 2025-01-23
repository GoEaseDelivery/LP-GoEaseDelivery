import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from '../../app/contexts/hooks/useAuth';
import { SingninParams } from '../../app/services/authService/singnin';
import { authService } from '../../app/services/authService';

const schema = z.object({
  username: z
    .string()
    .nonempty("E=mail é obrigatório"),
    // .email("Informe um e-mail válido"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SingninParams) => {
      return authService.singnin(data);
    },
  });

  const { singnin } = useAuth();
  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { token } = await mutateAsync(data);
      console.log("🚀 ~ handleSubmit ~ accessToken:", token);
      
      singnin(token);
    } catch (error) {
      toast.error("Credenciais inválidas!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
