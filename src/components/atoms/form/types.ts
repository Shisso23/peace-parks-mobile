import { ReactNode } from 'react';
import { FormikHelpers } from 'formik';
import { FormikProps } from 'formik/dist/types';
import { z } from 'zod';

export type BaseFormProps<Value> = {
  initialValues: Value;
  submitForm: (formData: Value, actions?: FormikHelpers<Value>) => Promise<any>;
  onSuccess?: () => void;
  onFailure?: (error: ErrorObject<Value>) => void;
};

export type ErrorObject<Value> = {
  errors: any | Value;
  statusCode: number;
  message: string;
};

export type FormProps<Value> = {
  initialValues: Value;
  submitForm: (formData: Value, actions?: FormikHelpers<Value>) => Promise<any>;
  onSuccess?: () => void;
  onFailure?: (error: ErrorObject<Value>, actions?: FormikHelpers<Value>) => void;
  validationSchema: z.ZodSchema<Value>;
  render: (props: FormikProps<Value>) => ReactNode;
};
