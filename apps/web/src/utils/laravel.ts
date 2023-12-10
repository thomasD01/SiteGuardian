import { axios } from "./axios";

namespace Laravel {

  export async function csrf() {
    return axios.get('/sanctum/csrf-cookie');
  }

  export type RegisterOptions = {
    name: string;
    email: string;
    password: string;
  }
  export async function register(options: RegisterOptions) {
    await csrf()

    return axios.post('/register', options);
  }

  export type LoginOptions = {
    email: string;
    password: string;
    remember?: boolean;
  }
  export async function login(options: LoginOptions) {
    await csrf()

    return axios.post('/login', options);
  }

  export type ForgotPasswordOptions = {
    email: string;
  }
  export async function forgotPassword(options: ForgotPasswordOptions) {
    await csrf()
    return axios.post('/forgot-password', options);
  }


  export type ResetPasswordOptions = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  export async function resetPassword(options: ResetPasswordOptions) {
    await csrf()

    return axios.post('/reset-password', options);
  }

  export type ResendEmailOptions = {
  }
  export async function resendEmailVerification(options: ResendEmailOptions) {
    return axios.post('/email/verification-notification');
  }

  export async function logout() {
    return await axios.post('/logout');
  }
}

export default Laravel;
