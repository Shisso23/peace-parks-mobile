import React from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import _ from 'lodash';

import { FormProps, ErrorObject } from './types';

export const Form = <T extends Record<string, unknown>>({
  initialValues,
  submitForm,
  onSuccess,
  onFailure,
  validationSchema,
  render,
}: FormProps<T>) => {
  const _handleFormSubmitError = (
    error: ErrorObject<typeof initialValues>,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    const apiErrors = error?.errors;
    if (!_.isEmpty(apiErrors)) {
      actions.setErrors(apiErrors);
    }
  };

  const _handleSubmission = (
    formData: typeof initialValues,
    actions: FormikHelpers<typeof initialValues>,
  ) => {
    submitForm(formData, actions)
      .then(() => {
        actions.setSubmitting(false);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error: ErrorObject<typeof initialValues>) => {
        actions.setSubmitting(false);
        if (onFailure) {
          onFailure(error, actions);
        } else {
          _handleFormSubmitError(error, actions);
        }
      });
  };

  const FormikBody = (props: FormikProps<typeof initialValues>) => render(props);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(validationSchema)}
      validateOnBlur
      validateOnChange={true}
      onSubmit={_handleSubmission}
      enableReinitialize
    >
      {FormikBody}
    </Formik>
  );
};
