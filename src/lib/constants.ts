export const loginInitialValue = {
  email: '',
  password: '',
};

export const resetPasswordInitialValues = {
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

export const signupInitialValues = {
  name: '',
  lastname: '',
  email: '',
  dateOfBirth: new Date(),
  password: '',
  passwordConfirmation: '',
};

export const newEventInitialValues = {
  title: '',
  description: '',
  location: '',
  category: '',
  startDateTime: new Date(),
  finishDateTime: new Date(),
  url: '',
  thumbnailUrl: '',
};

export const acceptImageTypes = {
  'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
};

export const navLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Events',
    route: '/profile/events',
  },
];
