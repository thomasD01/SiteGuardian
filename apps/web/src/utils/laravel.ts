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
    .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422)
          throw error
        error(error.response.data.errors)
      })
  }

  export type LoginOptions = {
    email: string;
    password: string;
    remember?: boolean;
  }
  export async function login(options: LoginOptions) {
    await csrf()

    return axios.post('/login', options);
    .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422)
          throw error

        error(error.response.data.errors)
      })
  }

  export type ForgotPasswordOptions = {
    email: string;
  }
  export async function forgotPassword(options: ForgotPasswordOptions) {
    await csrf()
    return axios.post('/forgot-password', options);
    .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422)
          throw error

        error(error.response.data.errors)
      })
  }


  export type ResetPasswordOptions = {
    email: string;
    password: string;
    password_confirmation: string;
  }
  export async function resetPassword(options: ResetPasswordOptions) {
    await csrf()

    return axios.post('/reset-password', { token: router.query.token, ...options });
    .then(response =>
      router.push('/login?reset=' + btoa(response.data.status)),
    )
      .catch(error => {
        if (error.response.status !== 422)
          throw error

        error(error.response.data.errors)
      })
  }

  export type ResendEmailOptions = {
  }
  export async function resendEmailVerification(options: ResendEmailOptions) {
    return axios.post('/email/verification-notification');
    .then(response => setStatus(response.data.status))
  }

  export async function logout() {
    return await axios.post('/logout');
  }
}

export default Laravel;
