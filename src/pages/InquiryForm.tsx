import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../src/components/ui/card";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";
import { Button } from "../../src/components/ui/button";
import { Checkbox } from "../../src/components/ui/checkbox";
import { useToast } from "../../src/components/ui/use-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const InquiryForm = () => {
  const { toast } = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    organization: Yup.string().required("Organization is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    city: Yup.string().required("City is required"),
    province: Yup.string().required("Province is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    console.log("values:", values);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/inquiryForm`, values);

      toast({
        title: "Form Submitted",
        description: "Your inquiry has been received successfully.",
        // status: "success",
        duration: 5000,
        // isClosable: true,
      });

      console.log("INQUIRY FORM CREATED", response.data);
      resetForm();
    } catch (error) {
      console.error("Submission Error:", error);
      const errorMessage = error.response?.data?.error || "Failed to submit the form. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        // status: "error",
        duration: 5000,
        // isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="text-[#190428] mt-8">
      <CardHeader>
        <CardTitle className="text-lg text-[#321e3f]">
          Inquiry Form
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            name: "",
            organization: "",
            email: "",
            phone: "",
            city: "",
            province: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#190428]">
                  Name
                </Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-[#190428]">
                  Organization
                </Label>
                <Field
                  as={Input}
                  id="organization"
                  name="organization"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="organization"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#190428]">
                  Email
                </Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#190428]">
                  Phone
                </Label>
                <Field
                  as={Input}
                  id="phone"
                  name="phone"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-[#190428]">
                  City
                </Label>
                <Field
                  as={Input}
                  id="city"
                  name="city"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province" className="text-[#190428]">
                  Province
                </Label>
                <Field
                  as={Input}
                  id="province"
                  name="province"
                  className="border-gray-300 bg-white text-[#190428]"
                />
                <ErrorMessage
                  name="province"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#190428] hover:bg-[#190428]/90 text-white mt-6"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default InquiryForm;