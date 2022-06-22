export const STEPPER_FORM_DATA_KEY = "stepper-form-data";

export let removeFormData = () => {
   sessionStorage.removeItem(STEPPER_FORM_DATA_KEY);
};

export let getFormData = (): Record<string, string> => {
   const rawFormData = sessionStorage.getItem(STEPPER_FORM_DATA_KEY);

   if (!rawFormData) {
      return {};
   }

   return JSON.parse(rawFormData);
};

export let setFormData = (formData: object) => {
   sessionStorage.setItem(STEPPER_FORM_DATA_KEY, JSON.stringify(formData));
};