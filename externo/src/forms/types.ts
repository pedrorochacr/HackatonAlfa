import { CandidateForm } from "../../schemas/candidate";

export type FormElement = 'input' | 'select';
export type InputType =
  | 'text'
  | 'number'
  | 'date'
  | 'email'
  | 'password'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'inputarea';
export type FormInput = {
  name: keyof CandidateForm;
  element: FormElement;
  inputType?: InputType;
  label: string;
  placeholder: string;
  options?: string[];
  inline?: boolean;
};
