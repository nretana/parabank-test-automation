

export const getRandomSSN = () => {
    const digits = String(Math.floor(Math.random() * 1e9)).padStart(9, '0');
    return digits.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
}