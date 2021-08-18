interface ICode {
    [key: string]: string
}

const CODES: ICode = {
    auth: 'Сначала авторизуйтесь в системе',
    notAuthorized: 'Пройдите авторизацию',
};

export const CodeMessages = (code: string) => CODES[code];