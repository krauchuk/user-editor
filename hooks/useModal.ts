import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectModals } from '@/store/modals/selectors'
import { State, changeModalVisibility } from '@/store/modals/slice'

type Params<T> = {
  name: keyof State
  metadata?: T
}

const useModal = <T>({ name, metadata }: Params<T>) => {
  const dispatch = useAppDispatch()
  const modalData = useAppSelector(selectModals)

  return {
    setVisibility: (value: boolean, metadata?: T) =>
      dispatch(changeModalVisibility({ modal: name, isOpen: value, metadata: metadata || {} })),
    isOpen: modalData[name].isOpen,
    metadata: modalData[name].metadata as T,
  }
}

export default useModal
