import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { IFormState } from "components/form/controlledForm";

export async function handleLogin(state: IFormState, formdata: FormData): Promise<IFormState> {
  try {
    if (state.data !== null)
      return state;

    const supabase = createClientComponentClient();

    const email = formdata.get('email');
    const password = formdata.get('password');
    const captchaToken = formdata.get("captchaToken") as string;

    if (typeof email !== 'string')
      throw new Error('bad email format');

    if (typeof password !== 'string')
      throw new Error('bad password format');

    const token = await supabase.auth.signInWithPassword({ 
      email, 
      password,
      options: {
        captchaToken,
      },
    });

    if (token.error) {
      return {
        error: token.error.message,
        data: null
      };
    };
    return {
      error: null,
      data: JSON.stringify({
        user: token.data.user,
        session: token.data.session
      })
    };
  }
  catch (error: any) {
    return {
      error: error.message,
      data: null
    };
  }
}
