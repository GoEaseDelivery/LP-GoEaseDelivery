import { httpClient } from '../httpClient';

export interface SingninParams {
  username: string;
  password: string;
}

interface SingninRespose {
    token: string;
}

export async function singnin(params: SingninParams) {
    const { data } = await httpClient.post<SingninRespose>(
      "/api/auth/SignIn",
      params
    );

    return data;
}
