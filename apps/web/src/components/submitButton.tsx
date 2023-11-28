"use client"
import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/react'

type IProps = {
  children?: React.ReactNode;
}
export default function(props: IProps) {

  const { pending } = useFormStatus();

  return (
    <Button 
      isDisabled={pending}
      variant='shadow'
      color='primary'
      type='submit'
    >
      {props.children}
    </Button>
  )
}
