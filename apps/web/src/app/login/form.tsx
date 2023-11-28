"use client"

import React from 'react'
import { useFormState } from 'react-dom'
import { Button, Image, Input, Link, Spacer } from '@nextui-org/react'
import { type Session, type User } from '@supabase/auth-helpers-nextjs'

import SubmitButton from 'components/submitButton'
import PasswordInput from 'components/passwordInput'

type IErrorState = {
  error: Error;
  data: null;
}
type IPendingState = {
  error: null;
  data: null;
}
type ISuccessState = {
  error: null;
  data: {
    user: User;
    session: Session;
  }
}
export type IFormState = IErrorState | IPendingState | ISuccessState;

type IProps = {
  action: (state: IFormState, formdata: FormData) => Promise<IFormState>;
  children?: React.ReactNode;
}

const initialState: IFormState = {
  error: null,
  data: null
}

export default function (props: IProps) {

  const [state, action] = useFormState(props.action, initialState);

  console.log('login state: ', state);

  return (
    <form action={action} className='w-[600px] h-[450px] bg-gray-900 rounded-3xl p-4'>
      <div className='w-full h-1/2 flex flex-col items-center justify-center'>
        <Image src="/SiteGuardianLogo.png" width={100} height={100} />
        <Spacer y={2} />
        <h1 className='text-silver text-4xl font-[logirent]'>siteguardian</h1>
      </div>
      <div className='w-full h-1/4 flex flex-col items-center justify-center px-20'>
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
      </div>
      <div className='w-full h-1/4 flex flex-row items-end justify-end'>
        <Button
          variant='ghost'
          color='primary'
          as={Link}
          href='/signup'
        >
          create account
        </Button>
        <Spacer x={2} />
        <SubmitButton>
          Login
        </SubmitButton>
      </div>
    </form>
  )
}