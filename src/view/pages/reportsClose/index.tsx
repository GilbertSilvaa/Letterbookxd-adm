import { FaSearch } from 'react-icons/fa'
import { LuSearchCheck } from 'react-icons/lu'
import {
  Input,
  Select,
  SelectItem,
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

const FILTERS = ['#', 'usuário']

export function ReportsClose() {
  const {
    isLoading,
    isOpenReportModal,
    setIsOpenReportModal,
    reportClosedList,
    reportSelected,
    handleSelectReport
  } = useReportsCloseController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Denúncias Fechadas</h1>

      <div className="w-full flex items-center gap-4 mb-4">
        <Select
          className="w-full sm:w-[10%]"
          disableSelectorIconRotation
          defaultSelectedKeys={"0"}>
          {FILTERS.map((filter, index) => (<SelectItem key={index}>{filter}</SelectItem>))}
        </Select>

        <Input
          isClearable
          className="w-full sm:max-w-[30%]"
          placeholder="Digite aqui..."
          startContent={<FaSearch />} />
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
                  ? <span className="py-1 px-2 rounded-lg bg-green-700 font-semibold">ACEITO</span>
                  : <span className="py-1 px-2 rounded-lg bg-red-700 font-semibold">REJEITADO</span>
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

      <ReportClosedModal
        data={reportSelected}
        isOpen={isOpenReportModal}
        onClose={() => setIsOpenReportModal(false)} />
    </div>
  )
}