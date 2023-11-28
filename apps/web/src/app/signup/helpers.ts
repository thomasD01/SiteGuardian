
import type { IFormState } from 'components/form/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function validateEmail(email: string) {


  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;  

  return email.match(regex);
}

//FIXME - this is not working
export async function handleSignup(state: IFormState, formdata: FormData) {
  const password = formdata.get("password") as string
  const confirmPassword = formdata.get("confirmPassword") as string
  const email = formdata.get("email") as string
  const captchaToken = formdata.get("captchaToken") as string

  if (!email || !password || !confirmPassword)
    return {
      error: "Please fill all fields",
      data: null,
    }

  if (password !== confirmPassword)
    return {
      error: "Passwords do not match",
      data: null,
    }
  

  const supabase = createClientComponentClient();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      captchaToken,
      emailRedirectTo: 'http://localhost:3000/api/auth/callback',
    },
  });

  if (error) {
    console.error(error.message);
    return {
      error: error.message,
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}

// FIXME - this neither
export async function resendVerificationEmail(email: string) {
  const supabase = createClientComponentClient();

  const { error, data } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: 'http://localhost:3000/api/auth/callback',
    }
  });

  if (error) {
    console.error(error.message);
    return {
      error: error.message,
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}
