import type { FC, PropsWithChildren } from 'react'

export const PageRoot: FC<PropsWithChildren> = ({ children }) => <div className='flex flex-col gap-px'>{children}</div>
