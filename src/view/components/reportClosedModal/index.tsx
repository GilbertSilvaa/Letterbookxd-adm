import { Report } from '@app/app/entities'
import { EReportStatus } from '@app/app/enums'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useReportClosedModalController } from './useReportClosedModalController'

type TReportClosedModalProps = {
  data?: Report
  isOpen: boolean,
  onClose: () => void,
  onResolved: (id: number) => void
}

export function ReportClosedModal({ data, isOpen, onClose, onResolved }: TReportClosedModalProps) {
  const { 
    isSubmitLoading, 
    unbanSubmit 
  } = useReportClosedModalController({ onClose, onResolved })

  return (
    <Modal
      size="2xl"
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onClose}
      isDismissable={false}
      classNames={{
        backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
      }}>
      <ModalContent>
        <>
          <ModalHeader className="flex items-center gap-3">
            <span># {data?.id}</span>
            <div className={`w-[18px] h-[18px] rounded-full ${data?.status === EReportStatus.DENIED ? 'bg-red-500' : 'bg-green-500' }`}></div>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <strong>Denúncia (@{data?.user.nickname}): </strong>
                <p className="ml-3 text-[#bbb]">{data?.reason}</p>
              </div>

              <div className="flex flex-col gap-2">
                <strong>Comentário (@{data?.review.user.nickname}): </strong>
                <p className="ml-3 text-[#bbb]">{data?.originalComment}</p>
              </div>

              <span className="text-[#bbb] ml-3">criada em {new Date(data?.creationDate!).toLocaleDateString()}</span>
            </div>
          </ModalBody>
          <ModalFooter>
            {data?.status === EReportStatus.ACCEPTED && 
              <Button 
                color="primary" 
                isLoading={isSubmitLoading}
                onClick={() => unbanSubmit(data.id)}>
                Rejeitar
              </Button>
            }
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  )
}