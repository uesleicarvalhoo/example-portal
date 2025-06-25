import React, { ReactNode } from 'react'
import UserAvatar from '.'
import { useAuthContext } from '../../context'

type Props = {
  className?: string
  children?: ReactNode
}

export default function UserAvatarCurrentUser({ className = '', children }: Props) {
  const { user } = useAuthContext()

  return (
    <UserAvatar username={user ? user.email : 'anonimo'} className={className}>
      {children}
    </UserAvatar>
  )
}
