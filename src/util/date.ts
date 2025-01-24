export const formatBanckendTime = (date: string): string =>  {
    const temp1 = date.split('T')
    const temp2 = temp1[1].split('.')
    return temp1[0] + ' ' + temp2[0]
}