export function objectToFormData<
  T extends Record<
    string,
    string | number | boolean | File | object | null | undefined
  >,
>(obj: T): FormData {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value instanceof FileList) {
        Array.from(value).forEach((file) => formData.append(key, file));
      } else if (
        Array.isArray(value) &&
        value.every((v) => v instanceof File)
      ) {
        (value as File[]).forEach((file) => formData.append(key, file));
      } else if (Array.isArray(value)) {
        // Handle arrays like tagIds or localizations
        value.forEach((item, index) => {
          if (typeof item === "object" && item !== null) {
            // Handle object arrays like localizations
            Object.entries(item).forEach(([subKey, subValue]) => {
              if (subValue !== null && subValue !== undefined && String(subValue) !== "") {
                formData.append(`${key}[${index}].${subKey}`, String(subValue));
              }
            });
          } else {
            // Handle simple arrays
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        if (String(value) !== "") {
          formData.append(key, String(value));
        }
      }
    }
  });

  return formData;
}
