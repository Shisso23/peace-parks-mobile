import { Button } from "@rneui/themed";
import { useMutation } from "@tanstack/react-query";
import { FormikProps } from "formik";
import React from "react";
import Toast from "react-native-toast-message";
import tw from 'twrnc';

import contactUsService from "../../../services/sub-services/contact-us-service/contact-us.service";
import { ErrorObject, Form, StyledTextField } from "../../atoms";
import { contactUsSchema } from "./schemas";
import { ContactUsValueProps } from "./types";

export const ContactUsForm: React.FC = () => {
    const { mutateAsync } = useMutation(contactUsService.contactUs, {
        onError: (error) => {
          const { message } = error as ErrorObject<ContactUsValueProps>;
          Toast.show({ type: 'error', text1: message });
        },
      });

    const submitForm = (formData: ContactUsValueProps) => mutateAsync(formData);

    const FormComponents = ({values, isSubmitting, handleSubmit}: FormikProps<ContactUsValueProps>) => {
        return (
            <>
              <StyledTextField name="name" label="Name" placeholder="Name" required keyboardType="default" mode="outlined" height={45}/>
              <StyledTextField name="email" label="Email" placeholder="email@mail.com" required keyboardType="email-address" mode="outlined" height={45}/>
              <StyledTextField name="description" label="Description" placeholder="Description" required keyboardType="default" mode="outlined" multiline={true} height={130} style={tw`border-2 rounded-xl mb-8 border-gray-200 h-40`} inputStyle={tw`rounded-lg bg-white mx-1 mb-1 mt-25`}/>
              <Button title="SEND" style={tw`mt-8 mb-6`} onPress={handleSubmit} loading={isSubmitting}/>
            </>
        )
    }

    return (
        <Form
          initialValues={{
            name: '',
            email: '',
            description: '',
          }}
          submitForm={submitForm}
          validationSchema={contactUsSchema}
          render={FormComponents}
        />
    )
}