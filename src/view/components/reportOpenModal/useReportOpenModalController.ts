import { EReportStatus } from '@app/app/enums'
import { reportService } from '@app/app/services/reportService'
import { useState } from 'react'
import toast from 'react-hot-toast'

type TSubmitParams = {
  reportId: number
  status: EReportStatus
}

type TUseReportModalControllerParams = {
  onClose: () => void
  onResolved: (id: number) => void
}

export function useReportOpenModalController({ onClose, onResolved }: TUseReportModalControllerParams) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  
  async function onSubmit(params: TSubmitParams) {
    try {
      setIsSubmitLoading(true)
      await reportService.handle(params)
      toast.success('Denúncia tratada com sucesso')
      onResolved(params.reportId)
      onClose()
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