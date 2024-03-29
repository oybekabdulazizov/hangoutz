import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().email('Please provide a valid email'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password cannot be longer that 64 characters'),
});

export const resetPasswordFormSchema = z
  .object({
    email: z.string().trim().email('Please provide a valid email'),
    oldPassword: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
    newPassword: z
      .string()
      .trim()
      .min(8, 'New password must be between 8 and 64 characters')
      .max(64, 'New password must be between 8 and 64 characters'),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, 'New password must be between 8 and 64 characters')
      .max(64, 'New password must be between 8 and 64 characters'),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'New password and its confirmation must match',
  });

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name cannot be longer than 100 characters'),
    lastname: z
      .string()
      .trim()
      .min(2, 'Lastname must be at least 2 characters')
      .max(100, 'Lastname cannot be longer than 100 characters'),
    email: z.string().trim().email('Please provide a valid email'),
    dateOfBirth: z.date(),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password cannot be longer that 64 characters'),
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Password and its confirmation must match',
  })
  .refine(
    (values) => {
      const { dateOfBirth } = values;
      let maxBirthDate = new Date();
      maxBirthDate = new Date(
        maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18)
      );
      const minYear = maxBirthDate.getFullYear();
      const minMonthOnMinYear = maxBirthDate.getMonth() + 1;
      const minDayOnMinMonthOnMinYear = maxBirthDate.getDate();
      if (dateOfBirth.getFullYear() < minYear) return true;
      if (dateOfBirth.getFullYear() == minYear) {
        if (dateOfBirth.getMonth() + 1 < minMonthOnMinYear) return true;
        if (dateOfBirth.getMonth() + 1 == minMonthOnMinYear) {
          if (dateOfBirth.getDate() <= minDayOnMinMonthOnMinYear) return true;
        }
      }
      return false;
    },
    {
      path: ['dateOfBirth'],
      message: 'You need to be 18 or older to sign up to HangoutZ',
    }
  );

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title cannot be longer than 100 characters'),
  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(500, 'Description cannot be longer than 500 characters'),
  thumbnailUrl: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .url()
      .max(255, 'Thumbnail URL cannot be longer than 255 characters'),
  ]),
  location: z
    .string()
    .trim()
    .min(1, 'Location is required')
    .max(120, 'Location cannot be longer than 120 characters'),
  category: z
    .string()
    .trim()
    .min(1, 'Category is required')
    .max(100, 'Category cannot be longer than 100 characters'),
  startDateTime: z.date(),
  finishDateTime: z.date(),
  url: z.union([
    z.literal(''),
    z
      .string()
      .trim()
      .url()
      .max(255, 'URL cannot be longer than 255 characters'),
  ]),
});
