import { useState } from "react";
import { useAdminLoginMutation } from "src/api/login/loginAdmin";

interface AdminLoginForm {
  email: string;
  password: string;
}

export const useAdminLogin = () => {
  const [adminLoginForm, setAdminLoginForm] = useState<AdminLoginForm>({
    email: "",
    password: "",
  });
  const {
    mutate: loginAdminMutate,
    isPending,
    isError,
    error,
  } = useAdminLoginMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginAdminMutate(adminLoginForm);
  };

  return {
    adminLoginForm,
    onChange,
    onSubmit,
    isLoading: isPending,
    isError,
    error,
  };
};
