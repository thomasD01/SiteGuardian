"use client"
import React from 'react'
import { Button, Input, Link } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import Form, { type IFormState } from 'components/form/controlledForm'
import PasswordInput from 'components/passwordInput'
import ValidatedPasswordInput from 'components/validatedPasswordInput'
import { useAuth } from 'hooks/useAuth'

const initialState: IFormState = {
  error: null,
  data: null
}

export default function() {

  const [ email, setEmail ]                     = React.useState('');
  const [ password, setPassword ]               = React.useState('');
  const [ confirmPassword, setConfirmPassword ] = React.useState('');

  const { push } = useRouter();

  const isEmailInvalid = React.useMemo(() => {
    return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null;
  }, [email])

  const isPasswordConfirmed = React.useMemo(() => {
    if (confirmPassword === "") 
      return true;

    return confirmPassword === password ? false : true;
  }, [confirmPassword, password]);

  function handleStateChange(state: IFormState) {
    if (state.error) {
      if(Array.isArray(state.error))
        state.error.forEach((error) => toast.error(error.message))
      else
        toast.error(state.error.message)
      return
    } 
    if(!state.data) 
      return
    
    toast.success('Account created successfully')
    push('/verify-email');
  }
  async function handleSignup(state: IFormState, formdata: FormData) {
    return new Promise<IFormState>(async (resolve) => {
    
      const name = formdata.get('name');
      const email = formdata.get('email');
      const password = formdata.get('password');

      if (email === null || password === null || name === null){
        return {
          error: 'Invalid form data',
          data: null
        }
      }
      

      return {
        error: null,
        data: null
      }
    });
  }

  return (
    <div className='w-full h-full flex items-center justify-center dark text-silver'>
      <Form
        action={handleSignup}
        initialState={initialState}
        onStateChange={handleStateChange}
        submitButtonText="signup"
        secondaryButton={
          <Button variant='ghost' color='primary' as={Link} href="/login">
            already have an account?
          </Button>
        }
      >
        <Input
          variant='underlined'
          label="email"
          name="email"
          type="email"
          value={email}
          onValueChange={setEmail}
          isInvalid={isEmailInvalid}
          color={isEmailInvalid ? "danger": "default"}
        />
        <ValidatedPasswordInput
          variant='underlined'
          label="password"
          name="password"
          value={password}
          onValueChange={setPassword}
        />
        <PasswordInput
          variant='underlined'
          label="confirm password"
          name="confirmPassword"
          value={confirmPassword}
          onValueChange={setConfirmPassword}
          isInvalid={isPasswordConfirmed}
          color={isPasswordConfirmed ? "danger": "default"}
        />
      </Form>
    </div>
  )
}
