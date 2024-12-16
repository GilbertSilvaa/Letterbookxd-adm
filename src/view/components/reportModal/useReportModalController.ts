import { EReportStatus } from '@app/app/enums'
import { reportService } from '@app/app/services/reportService'
import { useState } from 'react'
import toast from 'react-hot-toast'

type TSubmitParams = {
  reportId: number
  status: EReportStatus
}

type TUseReportModalControllerParams = {
  onCloseCallback: () => void
}

export function useReportModalController({ onCloseCallback }: TUseReportModalControllerParams) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  
  async function onSubmit(params: TSubmitParams) {
    try {
      setIsSubmitLoading(true)
      const { value } = await reportService.handle(params)
      onCloseCallback()
      toast.success('Denúncia tratada com sucesso')
      console.log(value)
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
    onSubmit
  }
}