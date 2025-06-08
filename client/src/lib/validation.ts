/**
 * Validation utilities for ShieldNest contact forms
 */

export function validateName(name: string): boolean {
  return !!(name && name.trim().length >= 2);
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateGhanaianPhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return true; // Optional field in some contexts
  
  // Remove all spaces and validate Ghanaian phone number format
  const cleanPhone = phone.replace(/\s+/g, '');
  
  // More flexible regex for Ghana numbers - supports all network prefixes
  const ghanaPhoneRegex = /^(\+233|0)[2-5][0-9]{8}$/;
  
  return ghanaPhoneRegex.test(cleanPhone);
}

export function validateMessage(message: string): boolean {
  return !!(message && message.trim().length >= 10);
}

export function validateConsultationPhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return false; // Required field for consultation
  
  // Remove all spaces and validate Ghanaian phone number format
  const cleanPhone = phone.replace(/\s+/g, '');
  
  // More flexible regex for Ghana numbers - supports all network prefixes
  const ghanaPhoneRegex = /^(\+233|0)[2-5][0-9]{8}$/;
  
  return ghanaPhoneRegex.test(cleanPhone);
}
