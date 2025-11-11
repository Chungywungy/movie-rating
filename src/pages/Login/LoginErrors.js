const loginErrorMessages = {
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/missing-password': 'Please enter a password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid login credentials - please try again.',
};

export const getLoginErrorMessage = (code) => {
    return loginErrorMessages[code] || 'An unknown error occured.';
};
