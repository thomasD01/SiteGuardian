"use client"
import React from 'react'
import { Input, type InputProps } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { IconType } from 'react-icons'

type IProps = {

} & InputProps;
export default function(props: IProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const Icon: IconType = showPassword ? FaEyeSlash : FaEye;

  return (
    <Input 
      {...props}
      type={showPassword ? 'text' : 'password'}
      endContent={
        <Icon 
          onClick={togglePassword} 
          size={25}
          className='cursor-pointer text-silver'
        />
      }
    />
  )
}
