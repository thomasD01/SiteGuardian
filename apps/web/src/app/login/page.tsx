"use client"
import { Button, Input, Link, Spacer } from '@nextui-org/react';

import Form, { type IFormState } from 'components/form/controlledForm';
import PasswordInput from 'components/passwordInput';
import { handleLogin } from './helpers';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';


const initialState: IFormState = {
  error: null,
  data: null
}

export default async function () {

  function handleStateChange(state: IFormState) {
    if (state.error) {
      toast.error(state.error)
      return
    } 
    if(!state.data) 
      return
    
    toast.success(JSON.parse(state.data).user.email + ' logged in successfully')
    redirect('/dashboard');
  }

  return (
    <div className='w-full h-full flex items-center justify-center dark'>
      <Form
        action={handleLogin}
        initialState={initialState}
        onStateChange={handleStateChange}
        submitButtonText="login"
        secondaryButton={
          <Button variant='ghost' color='primary' as={Link} href="/login">
            don't have an account?
          </Button>
        }
      >
        <Input
          variant="underlined"
          label="email"
          name="email"
          type="text"
        />
        <PasswordInput
          variant="underlined"
          label="password"
          name="password"
        />
        <Spacer y={2} />
        <div className='w-full h-fit flex flex-row items-center justify-start px-2'>
          <Link href='/forgot' className='text-silver text-xs'>Forgot Password?</Link>
        </div>
      </Form>
    </div>
  )
}
