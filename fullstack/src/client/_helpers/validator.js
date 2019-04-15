import validator from "validator";
import PasswordValidator from "password-validator";

const schema = new PasswordValidator();
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(20); // Maximum length 100
// .has().uppercase()                              // Must have uppercase letters
// .has().lowercase()                              // Must have lowercase letters
// .has().digits()                                 // Must have digits
// .has().not().spaces()                           // Should not have spaces

/**
 *
 *
 * @export ValidateEmail
 * @param {*} email
 * @returns a boolean
 */
export function ValidateEmail(email) {
  validator.normalizeEmail(email, { all_lowercase: true, gmail_remove_dots: true });
  if (!email.trim().length) {
    return false;
  }
  if (!validator.isEmail(email)) {
    return false;
  }
  return true;
}

/**
 *
 *
 * @export ValidatePassword
 * @param {*} password
 * @param {*} verifyPassword if !null, check if === to password first
 * @returns a boolean
 */
export function ValidatePassword(password, verifyPassword) {
  if (verifyPassword) {
    if (verifyPassword !== password) {
      return false;
    }
    if (!schema.validate(password) || !schema.validate(password)) {
      return false;
    }
  }
  if (!verifyPassword && !schema.validate(password)) {
    return false;
  }
  return true;
}
