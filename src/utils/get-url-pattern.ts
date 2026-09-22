
export const getUrlPattern = (pageName: string) => {
    return String.raw`${pageName}\.htm(\?.*)?$`
}