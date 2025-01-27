import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const handleFormSubmit = ({
  data,
  model,
  instance = null,
  actions, // { post, patch, delete } methods from useForm
  reset,
  clearErrors,
  setAlert,
  onSuccess,
  onError,
}) => {
  if (!actions) {
    throw new Error("Actions (post, patch, delete) are required.");
  }

  const { post, patch, delete: destroy } = actions; // Destructure delete method

  // DELETE action
  if (data.action === "delete" && instance) {
    const deleteUrl = route(`${model}.destroy`, { [model]: instance.id });

    if (!destroy) {
      console.error("Delete method is missing in actions.");
      if (setAlert) {
        setAlert({
          type: "destructive",
          message: "Unable to delete. Delete method not provided.",
        });
      }
      return;
    }

    destroy(deleteUrl, {
      preserveScroll: true,
      onSuccess: (response) => {
        if (setAlert) {
          setAlert({
            type: "success",
            message: `${model.charAt(0).toUpperCase() + model.slice(1)} deleted successfully!`,
          });
        }
        if (reset) reset(); // Optional: Reset the form
        if (clearErrors) clearErrors(); // Optional: Clear errors
        if (onSuccess) onSuccess(response); // Execute onSuccess callback
      },
      onError: (errors) => {
        if (setAlert) {
          setAlert({
            type: "destructive",
            message: "Failed to delete. Please try again.",
          });
        }
        if (onError) onError(errors); // Execute onError callback
      },
    });

    return; // Exit function after delete
  }

  // Determine route URL and HTTP method for create or update actions
  const isUpdate = !!instance; // True if updating, false if creating
  const routeUrl = isUpdate
    ? route(`${model}.update`, { [model]: instance.id }) // Ensure instance.id exists
    : route(`${model}.store`);
  const action = isUpdate ? post : post;

  // Prepare form data for file uploads
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });

  // For PUT/PATCH requests, include _method in formData
  if (isUpdate) {
    formData.append("_method", "PUT"); // Laravel will interpret this as a PUT request
  }

  // POST/PUT action
  action(routeUrl, {
    data: formData,
    preserveScroll: false,
    headers: {
      "Content-Type": "multipart/form-data",
      ...(isUpdate && { "X-HTTP-Method-Override": "PATCH" }),
    },
    onSuccess: (response) => {
      if (reset) reset();
      if (clearErrors) clearErrors();
      if (setAlert) {
        setAlert({
          type: "success",
          message:
            response?.message ||
            `${model.charAt(0).toUpperCase() + model.slice(1)} ${
              isUpdate ? "updated" : "created"
            } successfully!`,
        });
      }
      if (onSuccess) onSuccess(response);
    },
    onError: (errors) => {
      if (setAlert) {
        setAlert({
          type: "destructive",
          message: "Failed to submit the form. Please check the errors and try again.",
        });
      }
      if (onError) onError(errors);
    },
  });
};
