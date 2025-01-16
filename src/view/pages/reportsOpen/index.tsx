import { ReportOpenModal } from '@app/view/components/reportOpenModal'
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
import { LuRefreshCcw, LuSearchCheck } from 'react-icons/lu'
import { useReportsOpenController } from './useReportsOpenController'

const COLLUNS = [
  '#',
  'USUÁRIO',
  'DENÚNCIA',
  'USUÁRIO ACUSADO',
  'CRIADO EM',
  ''
]

export function ReportsOpenPage() {
  const {
    isLoading,
    isOpenReportModal,
    setIsOpenReportModal,
    reportOpenList,
    reportSelected,
    handleSelectReport,
    handleReportResolved,
    pageCount,
    setCurrentPage,
    refresh
  } = useReportsOpenController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Denúncias em Aberto</h1>

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
          {reportOpenList.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.user?.nickname}</TableCell>
              <TableCell className="max-w-[300px]">
                <span className="line-clamp-1">{report.reason}</span>
              </TableCell>
              <TableCell>{report.review?.user?.nickname}</TableCell>
              <TableCell>{new Date(report.creationDate).toLocaleDateString()}</TableCell>
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

      <ReportOpenModal
        data={reportSelected}
        isOpen={isOpenReportModal}
        onResolved={handleReportResolved}
        onClose={() => setIsOpenReportModal(false)} />
    </div>
  )
}