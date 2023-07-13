import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { Props, FormValues } from './types'
import { getUser } from '@/store/users/selectedUser/selectors'
import { fetchAllUsers } from '@/store/users/allUsers/actions'
import FormTextInput from '../FormTextInput'
import Button from '../Button'
import { isEmailValid } from '@/utils'
import { useAppDispatch } from '@/store/hooks'
import { updateUser, createUser } from '@/store/users/selectedUser/actions'
import { Form, FormInputs, FormButtons } from './styles'

const UserForm = ({ isEditMode }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: userData, loading } = useSelector(getUser)

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
    if (!userData || !isEditMode) return

    reset({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      city: userData.city,
    })
  }, [userData, reset, isEditMode])

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditMode) {
        await dispatch(updateUser({ id: userData!.id, data })).unwrap()
      } else {
        await dispatch(createUser(data)).unwrap()
      }

      dispatch(fetchAllUsers())
      router.push('/home')
    } catch (e) {}
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
