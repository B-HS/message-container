const pad = (value: number) => String(value).padStart(2, '0')

export const formatDateTime = (iso: string | null) => {
    if (!iso) return '-'
    const date = new Date(iso)
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export const formatCount = (value: number) => value.toLocaleString('ko-KR')
