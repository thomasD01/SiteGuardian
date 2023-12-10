"use client"
import React from 'react'
import { useFormState } from 'react-dom'
import { Image, Spacer } from '@nextui-org/react'

import SubmitButton from '../submitButton'
import { type IProps} from './types'
export { type IFormState } from './types';

export default function(props: IProps) {

  const [state, action] = useFormState(props.action, props.initialState);
  const [captchaToken, setCaptchaToken] = React.useState<string>('')

  React.useEffect(() => {
    props.onStateChange(state);
  }, [state]);

  return (
    <form action={action} className='w-[600px] h-fit bg-gray-900 rounded-3xl p-8'>
      <div className='w-full h-1/2 flex flex-col items-center justify-center'>
        <Image src="/SiteGuardianLogo.png" width={100} height={100} />
        <Spacer y={2} />
        <h1 className='text-silver text-4xl font-[logirent]'>siteguardian</h1>
      </div>
      <Spacer y={2} />
      <div className='flex flex-col items-center justify-center gap-2 px-20'>
        {props.children}
        <input type="hidden" name="captchaToken" value={captchaToken} />
      </div>
      <div className='w-full h-fit flex flex-row items-center justify-end'>
        {props.secondaryButton}
        <Spacer x={2} />
        <SubmitButton>
          {props.submitButtonText}
        </SubmitButton>
      </div>
    </form>
  )
}