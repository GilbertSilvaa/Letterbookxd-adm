import { UserModal } from '@app/view/components/userModal'
import {
  Input,
  Pagination,
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
import { FaSearch } from 'react-icons/fa'
import { LuSearch } from 'react-icons/lu'
import { useUsersController } from './useUsersController'

const COLLUNS = [
  'USUÁRIO',
  'EMAIL',
  'QTDE DENÚNCIAS ENVIADAS',
  'QTDE DENÚNCIAS RECEBIDAS',
  'STATUS',
  ''
]

const FILTERS = ['usuário']

export function UsersPage() {

  const {
    isLoading,
    userList,
    pageCount,
    setCurrentPage,
    handleSearchForm,
    isOpenUserModal,
    userSelected,
    handleSelectUser,
    handleCloseModal
  } = useUsersController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Usuários</h1>

      <div className="w-full flex justify-between items-center mb-4">
        <div className="flex gap-2 w-full">
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
            startContent={<FaSearch />}
            onChange={e => handleSearchForm(e.target.value)} />
        </div>
      </div>

      <Table>
        <TableHeader>
          {COLLUNS.map((coll, index) => <TableColumn key={index}>{coll}</TableColumn>)}
        </TableHeader>
        <TableBody
          emptyContent="Sem registros"
          isLoading={isLoading}
          loadingContent={<Spinner label="Carregando..." />}>
          {userList.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.reportsDoneCount}</TableCell>
              <TableCell>{user.reportsReceivedCount}</TableCell>
              <TableCell>{user.status === 'ACTIVE' 
                  ? <span className="py-1 px-2 rounded-lg bg-green-700 font-semibold text-[12px]">ATIVO</span>
                  : <span className="py-1 px-2 rounded-lg bg-red-700 font-semibold text-[12px]">INATIVO</span>}
              </TableCell>
              <TableCell>
                <button className="text-[1rem]" onClick={() => handleSelectUser(user)}>
                  <LuSearch />
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

      <UserModal
        isOpen={isOpenUserModal}
        onClose={handleCloseModal} 
        user={userSelected!}/>
    </div>
  )
}