import redact from 'fast-redact';

export const redactor = redact({
  paths: [
    'body.password',
    'instance.password',
    'body.email',
    'body.phone_no',
    'headers.authorization',
    'password',
    'email',
    'phone_no',
  ],
  censor: '**********',
  serialize: false,
});
