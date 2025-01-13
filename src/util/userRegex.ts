export const passwordRegex = (password: string) => {
    const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return pwdRegex.test(password)
}

