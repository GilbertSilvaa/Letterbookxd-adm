import { reportService } from '@app/app/services/reportService'
import { useState } from 'react'
import toast from 'react-hot-toast'

type TUseReportModalControllerParams = {
  onClose: () => void
  onResolved: (id: number) => void
}

export function useReportClosedModalController({ onClose, onResolved }: TUseReportModalControllerParams) {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  async function unbanSubmit(reportId: number) {
    try {
      setIsSubmitLoading(true)
      await reportService.unban({ reportId })
      toast.success('Denúncia desbanida com sucesso')
      onResolved(reportId)
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
    unbanSubmit
  }
}