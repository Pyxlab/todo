export const firstLastName = (name: string) => {
    const splited = name.trim().split(' ')

    return `${splited[0]} ${splited.at(-1)}`
}