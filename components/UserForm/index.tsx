import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { Props, FormValues } from './types'
import { selectUser } from '@/store/user/selectors'
import { fetchAllUsers } from '@/store/users/actions'
import FormTextInput from '../FormTextInput'
import Button from '../Button'
import { isEmailValid } from '@/utils'
import { useAppDispatch } from '@/store/hooks'
import { updateUser, createUser } from '@/store/user/actions'
import { Form, FormInputs, FormButtons } from './styles'
import { setPageAlert } from '@/store/app/slice'

const UserForm = ({ isEditMode }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, loading } = useSelector(selectUser)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
    },
  })

  useEffect(() => {
    if (!user || !isEditMode) return

    reset({
      name: user.name,
      username: user.username,
      email: user.email,
      city: user.city,
    })
  }, [user, reset, isEditMode])

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditMode) {
        await dispatch(updateUser({ id: user!.id, data })).unwrap()
      } else {
        await dispatch(createUser(data)).unwrap()
      }

      dispatch(fetchAllUsers())
      router.push('/home').then(() =>
        dispatch(
          setPageAlert({
            type: 'success',
            text: isEditMode ? 'User was successfully updated' : 'User was successfully added',
          }),
        ),
      )
    } catch (e) {
      // TODO: add logger
      const message =
        e instanceof Error ? e.message : `Something went wrong when ${isEditMode ? 'updating' : 'creating'} the user`
      console.error(message)
    }
  }

  const nameField = register('name', {
    required: { value: true, message: 'Name is required' },
  })
  const usernameField = register('username', {
    required: { value: true, message: 'Username is required' },
    minLength: { value: 3, message: 'Must be at least 3 characters' },
  })
  const emailField = register('email', {
    required: { value: true, message: 'Email is required' },
    validate: value => isEmailValid(value) || 'Email address must be a valid address',
  })
  const cityField = register('city', {
    required: { value: true, message: 'City is required' },
  })

  const isDisabled = loading || isSubmitting

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h2>{isEditMode ? 'Edit Form' : 'Add Form'}</h2>
      <FormInputs>
        <FormTextInput label="Name" error={errors.name} isDisabled={isDisabled} {...nameField} />
        <FormTextInput label="Username" error={errors.username} isDisabled={isDisabled} {...usernameField} />
        <FormTextInput label="Email" error={errors.email} isDisabled={isDisabled} {...emailField} />
        <FormTextInput label="City" error={errors.city} isDisabled={isDisabled} {...cityField} />
      </FormInputs>
      <FormButtons>
        <Button
          text="Cancel"
          variant="danger"
          variantType="outline"
          onClick={() => router.push('/home')}
          isDisabled={isDisabled}
        />
        <Button type="submit" variant="success" text="Submit" isDisabled={isDisabled || !isDirty} />
      </FormButtons>
    </Form>
  )
}

export default UserForm
