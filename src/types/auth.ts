export interface RegisterFormData {
  restaurantName: string;
  address: string;
  ownerName: string;
  email: string;
  password: string;
  document: string; // CNPJ or CPF
}

export interface LoginFormData {
  email: string;
  password: string;
}