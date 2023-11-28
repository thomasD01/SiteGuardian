
type IErrorState = {
  error: string;
  data: null;
}
type IPendingState = {
  error: null;
  data: null;
}
type ISuccessState = {
  error: null;
  data: any
}
export type IFormState = IErrorState | IPendingState | ISuccessState;

export type IProps = {
  // actions
  action: (state: IFormState, formdata: FormData) => Promise<IFormState>;
  //handlers
  onStateChange: (state: IFormState) => void;
  // values
  children?: React.ReactNode;
  initialState: IFormState<Data>;
  secondaryButton: React.ReactNode;
  submitButtonText: string;
}
