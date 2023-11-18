interface GeneratePasswordInputs {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSpecialCharacters: boolean;
  passwordLength: number;
}

export function generatePassword({
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecialCharacters,
      passwordLength
}: GeneratePasswordInputs): string {
  let securePassword = '';
  let characters = '';

  if (hasUppercase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  if (hasLowercase) {
    characters += 'abcdefghijklmnopqrstuvwxyz';
  }

  if (hasNumbers) {
    characters += '0123456789';
  }

  if (hasSpecialCharacters) {
    characters += '!@#$%^&*()_+~`|}{[]:;?><,./-';
  }

  for (let i = 0; i < passwordLength; i++) {
    securePassword += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return securePassword
}