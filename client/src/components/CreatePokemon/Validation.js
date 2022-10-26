const whitespace = /\S+/;
const validString = /^[a-z]+$/i;
const validNumber = /^\d+$/;
const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;

export default function validateForm (formData) {
  let errors = {};

  // Name validation
  if (
    !whitespace.test(formData.name) ||                
    !validString.test(formData.name) ||               
    formData.name.length < 3                          
  ) errors.name = "Name is required. Must be longer than two characters and cannot contain numbers or special characters.";


  // Hp validation 
  if (
    !validNumber.test(formData.hp) ||                
    parseInt(formData.hp) < 0      ||                 
    parseInt(formData.hp) > 200                      
  ) errors.hp = "Hp is required. Must be between 0-200.";


  // Attack validation 
  if (
    !validNumber.test(formData.attack) || 
    parseInt(formData.attack) < 0 ||
    parseInt(formData.attack) > 200
  ) errors.attack = "Attack is required. Must be between 0-200.";
  

  // Defense validation 
  if (
    !validNumber.test(formData.defense) || 
    parseInt(formData.defense) < 0 ||
    parseInt(formData.defense) > 200
  ) errors.defense = "Defense is required. Must be between 0-200.";
  

  // Speed validation 
  if (
    !validNumber.test(formData.speed) || 
    parseInt(formData.speed) < 0 ||
    parseInt(formData.speed) > 200
  ) errors.speed = "Speed is required. Must be between 0-200.";


  // Height validation 
  if (
    !validNumber.test(formData.height) || 
    parseInt(formData.height) < 0 ||
    parseInt(formData.height) > 200
  ) errors.height = "Height is required. Must be between 0-200.";


  // Weight validation 
  if (
    !validNumber.test(formData.weight) || 
    parseInt(formData.weight) < 0 ||
    parseInt(formData.weight) > 1000
  ) errors.weight = "Weight is required. Must be between 0-1000.";
  

  // Image validation 
  if (
    !validUrl.test(formData.image)                    
  ) errors.image = "Image is required. Must be a valid URL.";


  // Types validation 
  if (
    formData.types.length === 0 ||                    
    formData.types.length > 2                         
  ) errors.types = "Type is required. You can select up to 2 types.";

  
  return errors;
}
