import isEmail from 'validator/lib/isEmail';

export function InValidEmail(value) {
  return value && !isEmail(value.trim());
}