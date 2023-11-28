"use client"
import { NextUIProvider } from "@nextui-org/react";
import { TRPCReactProvider } from "trpc/react";
import { type cookies } from "next/headers"

type IProps = {
  children: React.ReactNode
  cookies: ReturnType<typeof cookies>
}
export default function (props: IProps) {

  return (
    <NextUIProvider>
      <TRPCReactProvider cookies={props.cookies.toString()}>
        {props.children}
      </TRPCReactProvider>
    </NextUIProvider>
  )
}
