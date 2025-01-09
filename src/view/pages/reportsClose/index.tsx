import { LuRefreshCcw, LuSearchCheck } from 'react-icons/lu'
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useReportsCloseController } from './useReportsCloseController'
import { ReportClosedModal } from '@app/view/components/reportClosedModal'
import { EReportStatus } from '@app/app/enums'

const COLLUNS = [
  '#',
  'USUÁRIO',
  'DENÚNCIA',
  'USUÁRIO ACUSADO',
  'STATUS',
  'MODERADOR',
  'TRATADO EM',
  ''
]

export function ReportsClosePage() {
  const {
    isLoading,
    isOpenReportModal,
    setIsOpenReportModal,
    reportClosedList,
    reportSelected,
    handleSelectReport,
    handleReportResolved,
    pageCount,
    setCurrentPage,
    refresh
  } = useReportsCloseController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Denúncias Fechadas</h1>

      <div className="w-full flex items-center justify-end mb-4">
        <button className="mr-4 text-orange-400 text-[20px]" onClick={refresh}>
          <LuRefreshCcw />
        </button>
      </div>

      <Table>
        <TableHeader>
          {COLLUNS.map((coll, index) => <TableColumn key={index}>{coll}</TableColumn>)}
        </TableHeader>
        <TableBody
          emptyContent="Sem registros"
          isLoading={isLoading}
          loadingContent={<Spinner label="Carregando..." />}>
          {reportClosedList.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.user.nickname}</TableCell>
              <TableCell className="max-w-[300px]">
                <span className="line-clamp-1">{report.reason}</span>
              </TableCell>
              <TableCell>{report.review.user.nickname}</TableCell>
              <TableCell>
                {report.status === EReportStatus.ACCEPTED
                  ? <span className="py-1 px-2 rounded-lg bg-green-700 font-semibold text-[12px]">ACEITO</span>
                  : <span className="py-1 px-2 rounded-lg bg-red-700 font-semibold text-[12px]">REJEITADO</span>
                }
              </TableCell>
              <TableCell>{report.moderator?.nickname}</TableCell>
              <TableCell>{new Date(report.updateDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <button className="text-[1rem]" onClick={() => handleSelectReport(report)}>
                  <LuSearchCheck />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pageCount > 1 &&
        <div className="flex justify-center items-center mt-2">
          <Pagination
            isCompact
            initialPage={1}
            total={pageCount}
            onChange={page => setCurrentPage(page - 1)} />
        </div>
      }

      <ReportClosedModal
        onResolved={handleReportResolved}
        data={reportSelected}
        isOpen={isOpenReportModal}
        onClose={() => setIsOpenReportModal(false)} />
    </div>
  )
}