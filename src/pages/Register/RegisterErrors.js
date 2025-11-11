const registerErrorMessages = {
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/missing-password': 'Please enter a password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid login credentials - please try again.',
    'auth/email-already-in-use': 'Email already in use.',
    'auth/weak-password': 'Password is too weak',
};

export const getRegisterErrorMessage = (code) => {
    return registerErrorMessages[code] || 'An unknown error occured.';
};
