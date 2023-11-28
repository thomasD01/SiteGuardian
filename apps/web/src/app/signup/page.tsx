"use client"
import React from 'react'
import { Button, Input, Link, Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { toast } from 'react-toastify'

import Form, { type IFormState } from 'components/form/controlledForm'
import PasswordInput from 'components/passwordInput'
import ValidatedPasswordInput from 'components/validatedPasswordInput'
import { handleSignup, resendVerificationEmail, validateEmail } from './helpers'

const initialState: IFormState = {
  error: null,
  data: null
}

export default function() {

  const [ email, setEmail ]                     = React.useState('');
  const [ password, setPassword ]               = React.useState('');
  const [ confirmPassword, setConfirmPassword ] = React.useState('');
  const [ isModalOpen, setIsModalOpen ]         = React.useState(false);

  const isEmailInvalid = React.useMemo(() => {
    return validateEmail(email) ? false : true;
  }, [email])

  const isPasswordConfirmed = React.useMemo(() => {
    if (confirmPassword === "") 
      return true;

    return confirmPassword === password ? false : true;
  }, [confirmPassword, password]);

  function handleStateChange(state: IFormState) {
    if (state.error) {
      toast.error(state.error)
      return
    } 
    if(!state.data) 
      return
    
    toast.success('Account created successfully')
    setIsModalOpen(true);
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
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        backdrop='blur'
      >
        <ModalContent>
          <ModalBody className='bg-gray-900 text-silver p-8'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
              <p>Account created successfully</p>
              <a 
                className='cursor-pointer text-red-500'
                onClick={() => resendVerificationEmail(email)}  
              >
                resend verification link?
              </a>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
