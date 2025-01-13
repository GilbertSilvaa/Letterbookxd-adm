import { useAuth } from '@app/app/hooks'
import { moderatorService } from '@app/app/services/moderatorService'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export function useSignInController() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { signIn } = useAuth()

  const setFormValue = (
    field: keyof typeof formData,
    value: string
  ) =>  setFormData(prev => ({ ...prev, [field]: value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error, value, message } = await moderatorService.auth(formData)
      
      if (error) {
        toast.error(message)
        return
      }

      signIn(value.token)
      location.reload()
    }
    catch {
      toast.error('email ou senha incorreta')
    }
    finally {
      setIsLoading(false)
    }
  }

  return {
    setFormValue,
    onSubmit,
    isLoading
  } 
}