import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  // Disabling form for test user
  const { user, isLoading } = useUser();
  if (isLoading) return <Spinner />;
  const isNotAllowed = user?.email === "testuser@generic.com";

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type={isNotAllowed ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          disabled={isUpdating || isNotAllowed}
          value={
            isNotAllowed ? "You cannot change this account's password" : ""
          }
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm new password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type={isNotAllowed ? "text" : "password"}
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating || isNotAllowed}
          value={
            isNotAllowed ? "You cannot change this account's password" : ""
          }
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating || isNotAllowed}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
