import { User } from '@app/app/entities'
import { userService } from '@app/app/services/userService'
import { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type TUseUserFormModalControllerParams = {
  userEdit?: User
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

export function useUserFormModalController({ userEdit, onClose, onFormSubmited }: TUseUserFormModalControllerParams) {
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

      if (!!formData.id) {
        const { error, message } = await userService.edit({
          id: formData.id!,
          name: formData.name!,
          nickname: formData.nickname!
        })

        if (error) throw new Error(message)
      }
      else {
        const { error, message } = await userService.create({
          name: formData.name!,
          email: formData.email!,
          nickname: formData.nickname!,
          password: formData.password!
        })

        if (error) throw new Error(message)
      }

      onFormSubmited()
      onClose()

      toast.success(`Usuário ${formData.id ? 'atualizado' : 'cadastrado'} com sucesso`)
    }
    catch (error) {
      console.error(error)
      toast.error('Ops! Houve um erro')
    }
    finally {
      setIsSubmitLoading(false)
    }
  }

  useEffect(() => {
    setFormData({
      id: userEdit?.id,
      name: userEdit?.name,
      email: userEdit?.email,
      nickname: userEdit?.nickname,
    })
  }, [userEdit, onClose])

  return {
    isSubmitLoading,
    onSubmit,
    formData,
    setFormValue
  }
}