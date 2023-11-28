"use client"
import React from 'react'
import { type InputProps } from '@nextui-org/react'

import PasswordInput from 'components/passwordInput'

type IProps = {
  value: string;
} & InputProps;
export default function (props: IProps) {

  const [ showList, setShowList ] = React.useState(false);

  const hasEightCharacters = React.useMemo(() => {
    return props.value.length >= 8
  }, [props.value]);

  const hasOneNumber = React.useMemo(() => {
    return /\d/.test(props.value)
  }, [props.value]);

  const hasOneLowerCaseLetter = React.useMemo(() => {
    return /[a-z]/.test(props.value)
  }, [props.value]);

  const hasOneUpperCaseLetter = React.useMemo(() => {
    return /[A-Z]/.test(props.value)
  }, [props.value]);

  const hasOneSpecialCharacter = React.useMemo(() => {
    return /[^A-Za-z0-9]/.test(props.value)
  }, [props.value]);

  return (
    <>
      <PasswordInput 
        {...props} 
        onClick={() => setShowList(true)}
        isInvalid={props.isInvalid || !hasEightCharacters || !hasOneNumber || !hasOneLowerCaseLetter || !hasOneUpperCaseLetter || !hasOneSpecialCharacter}
      />
      <ul className={`${!showList ? 'hidden': 'mb-[-16px] mt-2'} list-disc`}>
        <Item isValid={hasEightCharacters}     text="must be at least 8 characters long" />
        <Item isValid={hasOneNumber}           text="must contain at least 1 number" />
        <Item isValid={hasOneLowerCaseLetter}  text="must contain at least 1 lowercase letter" />
        <Item isValid={hasOneUpperCaseLetter}  text="must contain at least 1 uppercase letter" />
        <Item isValid={hasOneSpecialCharacter} text="must contain at least 1 special character" />
      </ul>
    </>
  )
}

type IItemProps = {
  isValid: boolean;
  text: string;
}
function Item(props: IItemProps) {

  return (
    <li className={`${props.isValid ? 'text-green-600': 'text-red-600'} text-xs mx-2`}>
      {props.text}
    </li>
  )
}