import React from 'react'
import useSWR from 'swr'
import { axios } from 'utils/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Laravel from 'utils/laravel'

type IOptions = {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}
type IProps = {
  options: IOptions
}

const authContenxt = React.createContext(null);
export function useAuth() {
  return React.useContext(authContenxt)
}

export function AuthProvider(props: IProps){
  const router = useRouter()
  const { data: user, error, mutate } = useSWR('/api/user', () =>
    axios
      .get('/api/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) 
          throw error

        router.push('/verify-email')
      }),
  )

  const [status, setStatus] = React.useState('idle');
  const [errors, setErrors] = React.useState(null);

  const register = async (options: Laravel.RegisterOptions) => {

    Laravel.register(options)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) 
          throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async (options: Laravel.LoginOptions) => {

    setStatus('loading')

    Laravel.login(options)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422)
          throw error

        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async (options: Laravel.ForgotPasswordOptions) => {

    setStatus('loading')

    Laravel.forgotPassword(options)
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) 
          throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async (options: Laravel.ResetPasswordOptions) => {

    setStatus('loading')

    Laravel.resetPassword(options)
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) 
          throw error

        setErrors(error.response.data.errors)
      })
  }

  const resendEmailVerification = (options: Laravel.ResendEmailOptions) => {
    Laravel.resendEmailVerification(options)
      .then(response => setStatus(response.data.status))
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (props.options.middleware === 'guest' && props.options.redirectIfAuthenticated && user){
      router.push(props.options.redirectIfAuthenticated)
    }

    if (
      window.location.pathname === '/verify-email' &&
      user?.email_verified_at
    ){
      if(props.options.redirectIfAuthenticated)
        router.push(props.options.redirectIfAuthenticated)
      else
        router.push('/')
    }

    if (props.options.middleware === 'auth' && error) logout()
  }, [user, error])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  }
}