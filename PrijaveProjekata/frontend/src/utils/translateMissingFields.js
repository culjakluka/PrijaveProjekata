import { missingFieldsDescriptions } from "./missingFieldsDescriptions";

const translateMissingFields = (fields) => {
  const translatedFields = [];

  fields.forEach((field) => {
    if (missingFieldsDescriptions[field]) {
      translatedFields.push(missingFieldsDescriptions[field]);
    }
  });
  return translatedFields;
};

export default translateMissingFields;
