export const getFullname = (firstName: string, lastName: string) => {
    const fullname = `${firstName} ${lastName}`.trim();
    return fullname.length > 0 ? fullname : "N/A";
}