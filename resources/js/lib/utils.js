import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const handleFormSubmit = ({
  data,
  model,
  instance = null,
  actions, // { post, put, delete } methods from useForm
  reset,
  clearErrors,
  setAlert, // Function to set alert message and type
  onSuccess,
  onError,
}) => {
  if (!actions) {
      throw new Error("Actions (post, put, delete) are required.");
  }

  const { post, put } = actions;
  const routeUrl = instance
      ? route(`${model}.update`, { [model.slice(0, -1)]: instance.id }) // e.g., cars.update
      : route(`${model}.store`); // e.g., cars.store

  const action = instance ? put : post;

  action(routeUrl, {
      preserveScroll: true,
      onSuccess: (response) => {
          reset && reset(); // Reset form on success
          clearErrors && clearErrors(); // Clear errors on success
          if (setAlert) {
              setAlert({
                  type: 'success',
                  message: response?.message || `${model.charAt(0).toUpperCase() + model.slice(1)} ${instance ? 'updated' : 'created'} successfully!`,
              });
          }
          if (onSuccess) onSuccess(response);
      },
      onError: (errors) => {
          if (setAlert) {
              setAlert({
                  type: 'destructive',
                  message: 'Failed to submit the form. Please check the errors and try again.',
              });
          }
          if (onError) onError(errors);
      },
  });
};
