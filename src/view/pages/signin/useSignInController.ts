import { FormEvent, useState } from 'react'

export function useSignInController() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const setFormValue = (
    field: keyof typeof formData,
    value: string
  ) =>  setFormData(prev => ({ ...prev, [field]: value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    console.table(formData)
  }

  return {
    setFormValue,
    onSubmit,
    isLoading
  } 
}