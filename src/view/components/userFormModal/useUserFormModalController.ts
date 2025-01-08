import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

type TUseUserFormModalControllerParams = {
  onClose: () => void
  onFormSubmited: () => void
}

type TFomData = {
  id?: number
  name?: string
  email?: string
  nickname?: string
  password?: string
}

export function useUserFormModalController({ onClose, onFormSubmited }: TUseUserFormModalControllerParams) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [formData, setFormData] = useState<TFomData>({})

  const setFormValue = (
    field: keyof typeof formData,
    value: string
  ) => setFormData(prev => ({ ...prev, [field]: value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      setIsSubmitLoading(true)

      console.log('formData', formData)
      onFormSubmited()
      onClose()

      toast.success(`Usuário ${formData.id ? 'atualizado' : 'cadastrado'} com sucesso`)
    }
    catch {
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsSubmitLoading(false)
    }
  }

  return {
    isSubmitLoading,
    onSubmit,
    setFormValue
  }
}