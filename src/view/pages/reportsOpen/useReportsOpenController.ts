import { useState } from 'react'

export function useReportsOpenController() {
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)

  return {
    isOpenReportModal,
    setIsOpenReportModal
  }
}