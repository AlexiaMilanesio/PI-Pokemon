const whitespace = /\S+/;
const validString = /^[a-z]+$/i;
const validNumber = /^\d+$/;
const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;

export default function validateForm (formData) {
  let errors = {};

  // Name validation
  if (
    !whitespace.test(formData.name) ||                // Si contiene espacio en blanco
    !validString.test(formData.name) ||               // Si contiene characteres que no sean letras
    formData.name.length < 3                          // Si contiene menos de 3 characteres
  ) errors.name = "Name is required. Must be longer than two characters and cannot contain numbers or special characters.";

  // Hp validation 
  if (
    !validNumber.test(formData.hp) ||                 // Si no es un número (0-9)
    parseInt(formData.hp) < 1      ||                 // Si es un número menor a 1
    parseInt(formData.hp) > 200                       // Si es un número mayor a 200
  ) errors.hp = "Hp is required. Must be higher than 1 and less than 200.";

  // Attack validation 
  if (
    !validNumber.test(formData.attack) || 
    parseInt(formData.attack) < 1 ||
    parseInt(formData.attack) > 200
  ) errors.attack = "Attack is required. Must be higher than 1 and less than 200.";
  
  // Defense validation 
  if (
    !validNumber.test(formData.defense) || 
    parseInt(formData.defense) < 1 ||
    parseInt(formData.defense) > 200
  ) errors.defense = "Defense is required. Must be higher than 1 and less than 200.";
  
  // Speed validation 
  if (
    !validNumber.test(formData.speed) || 
    parseInt(formData.speed) < 1 ||
    parseInt(formData.speed) > 200
  ) errors.speed = "Speed is required. Must be higher than 1 and less than 200.";

  // Height validation 
  if (
    !validNumber.test(formData.height) || 
    parseInt(formData.height) < 1 ||
    parseInt(formData.height) > 200
  ) errors.height = "Height is required. Must be higher than 1 and less than 200.";

  // Weight validation 
  if (
    !validNumber.test(formData.weight) || 
    parseInt(formData.weight) < 1 ||
    parseInt(formData.weight) > 1000
  ) errors.weight = "Weight is required. Must be higher than 1 and less than 1000.";
  
  // Image validation 
  if (
    !validUrl.test(formData.image)                    // Si no es una URL válida
  ) errors.image = "Image is required. Must be a valid URL.";

  // Types validation 
  if (
    formData.types.length === 0 ||                    // Si no hay ningún type seleccionado
    formData.types.length > 2                         // Si hay más de 2 tipos seleccionados
  ) errors.types = "Type is required. You can select up to 2 types.";

  return errors;
}
