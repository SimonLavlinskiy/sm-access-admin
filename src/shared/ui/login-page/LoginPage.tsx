import * as React from 'react'
import { useState } from 'react'
import { useLogin, useNotify } from 'react-admin'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const login = useLogin()
  const notify = useNotify()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login({ username, password }).catch(() => notify('Неверный логин/пароль'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='password'
        type='text'
        placeholder='Почта'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        name='password'
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type='submit'>Войти</button>
    </form>
  )
}
