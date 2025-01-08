import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useUsersController } from './useUsersController'
import { FaSearch } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { BsFillTrashFill } from 'react-icons/bs'
import { UserFormModal } from '@app/view/components/userFormModal'

const COLLUNS = [
  'USUÁRIO',
  'EMAIL',
  'CARGO',
  ''
]

const FILTERS = ['usuário']

export function UsersPage() {

  const {
    isLoading,
    pageCount,
    setCurrentPage,
    isOpenUserFormModal,
    setIsOpenUserFormModal,
    userList,
    userSelected,
    onOPenEditForm,
    handleUserFormSubmited
  } = useUsersController()

  return (
    <div>
      <h1 className="text-[20px] font-semibold mb-6">Moderadores</h1>

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
            startContent={<FaSearch />} />
        </div>

        <Button color="primary" onClick={() => setIsOpenUserFormModal(true)}>Cadastrar</Button>
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
              <TableCell>{user.privilege}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <button className="text-[1rem]" onClick={() => onOPenEditForm(user)}>
                    <MdEdit />
                  </button>
                  <button className="text-[1rem]" onClick={() => { }}>
                    <BsFillTrashFill color="#f35555" />
                  </button>
                </div>
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

      <UserFormModal
        data={userSelected}
        isOpen={isOpenUserFormModal}
        onClose={() => setIsOpenUserFormModal(false)}
        onFormSubmited={handleUserFormSubmited} />
    </div>
  )
}