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
import { ReportOpenModal } from '@app/view/components/reportOpenModal'
import { useReportsOpenController } from './useReportsOpenController'

const COLLUNS = [
  '#',
  'USUÁRIO',
  'DENÚNCIA',
  'USUÁRIO ACUSADO',
  'CRIADO EM',
  ''
]

const FILTERS = ['#', 'usuário']

export function ReportsOpen() {
  const {
    isLoading,
    isOpenReportModal,
    setIsOpenReportModal,
    reportOpenList,
    reportSelected,
    handleSelectReport,
    handleReportResolved
  } = useReportsOpenController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Denúncias em Aberto</h1>

      <div className="w-full flex items-center gap-4 mb-4">
        <Select
          className="w-full sm:w-[10%]"
          disableSelectorIconRotation
          defaultSelectedKeys={"0"}>
          {FILTERS.map((filter, index) => (
            <SelectItem key={index}>
              {filter}
            </SelectItem>
          ))}
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
          {reportOpenList.map((report, index) => (
            <TableRow key={index}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.user.nickname}</TableCell>
              <TableCell className="max-w-[300px]">
                <span className="line-clamp-1">{report.reason}</span>
              </TableCell>
              <TableCell>{report.review.user.nickname}</TableCell>
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

      <ReportOpenModal
        data={reportSelected}
        isOpen={isOpenReportModal}
        onResolved={handleReportResolved}
        onClose={() => setIsOpenReportModal(false)} />
    </div>
  )
}