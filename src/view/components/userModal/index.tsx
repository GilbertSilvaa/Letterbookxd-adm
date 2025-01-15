import { FaAnglesUp, FaAnglesDown } from 'react-icons/fa6'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useUserModalController } from './useUserModalController'
import { EReportStatus } from '@app/app/enums'
import { TGetUsersDTO } from '@app/app/services/userService/getByNickname'

type TUserModalProps = {
  user: TGetUsersDTO
  isOpen: boolean
  onClose: () => void
}

export function UserModal({ user, isOpen, onClose }: TUserModalProps) {

  const {
    reportList,
    isLoading,
    pageCount,
    setCurrentPage
  } = useUserModalController({ user })

  return (
    <Modal
      size="5xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
      }}>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex gap-6">
              <img
                src={`${import.meta.env.VITE_API_URL}/user/image/profile/${user?.id}`}
                style={{
                  width: '8rem',
                  height: '8rem',
                  border: '2px solid #aaa'
                }}
                className="rounded-full" />

              <div className="flex flex-col gap-2">
                <h1 className="text-[20px] font-semibold">{user?.name}</h1>
                <span className="text-[#bbb]">@{user?.nickname}</span>
                <span className="text-[#bbb]">{user?.email}</span>

                <div className="mt-4 flex gap-5">
                  <span className="text-red-400 flex items-center gap-2 font-semibold">
                    <FaAnglesDown/> {user?.reportsReceivedCount} Denúncias Recebidas 
                  </span>
                  <span className="text-green-400 flex items-center gap-2 font-semibold">
                    <FaAnglesUp/> {user?.reportsDoneCount} Denúncias Enviadas 
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <span>Denúncias Recebidas</span>

              <Table>
                <TableHeader>
                  <TableColumn>#</TableColumn>
                  <TableColumn>Denunciante</TableColumn>
                  <TableColumn>Denúncia</TableColumn>
                  <TableColumn>Status</TableColumn>
                </TableHeader>

                <TableBody
                  emptyContent="Sem registros"
                  isLoading={isLoading}
                  loadingContent={<Spinner label="Carregando..." />}>
                  {reportList?.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.user.nickname}</TableCell>
                      <TableCell className="max-w-[300px]">
                        <span className="line-clamp-1">{report.reason}</span>
                      </TableCell>
                      <TableCell>
                        {report.status === EReportStatus.ACCEPTED &&
                          <span className="py-1 px-2 rounded-lg bg-green-700 font-semibold text-[12px]">ACEITO</span>}

                        {report.status === EReportStatus.DENIED &&
                          <span className="py-1 px-2 rounded-lg bg-red-700 font-semibold text-[12px]">REJEITADO</span>}

                        {report.status === EReportStatus.OPENED &&
                          <span className="py-1 px-2 rounded-lg bg-gray-600 font-semibold text-[12px]">EM ABERTO</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {pageCount > 1 &&
                <div className="flex justify-center items-center mt-2">
                  <Pagination
                    isCompact
                    variant="bordered"
                    initialPage={1}
                    total={pageCount}
                    onChange={page => setCurrentPage(page - 1)} />
                </div>
              }
            </div>

          </div>
        </ModalBody>
        <ModalFooter className="mt-4">
          <Button
            type="submit"
            color="danger"
            isLoading={false}>
            Desativar Usuário
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}