import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { Props, FormInputs } from './types'
import { getUser } from '@/store/users/selectedUser/selectors'
import { getAllUsers } from '@/store/users/allUsers/selectors'
import FormTextInput from '../FormTextInput'
import Button from '../Button'
import { isEmailValid } from '@/utils'

const UserForm = ({ isEditMode }: Props) => {
  const { data: userData, loading } = useSelector(getUser)
  const { data: allUsers } = useSelector(getAllUsers)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
    },
  })

  useEffect(() => {
    if (!userData) return

    reset({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      city: userData.city,
    })
  }, [userData, reset])

  const onSubmit = (data: FormInputs) => console.log(data)

  const nameField = register('name', {
    required: { value: true, message: 'Name is required' },
  })
  const usernameField = register('username', {
    required: { value: true, message: 'Username is required' },
    validate: value =>
      !allUsers.find(user => user.username.toLowerCase() === value.toLowerCase().trim()) ||
      'This name is already taken',
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{isEditMode ? 'Edit Form' : 'Add Form'}</h2>
      <FormTextInput label="Name" error={errors.name} isDisabled={isDisabled} {...nameField} />
      <FormTextInput label="Username" error={errors.username} isDisabled={isDisabled} {...usernameField} />
      <FormTextInput label="Email" error={errors.email} isDisabled={isDisabled} {...emailField} />
      <FormTextInput label="City" error={errors.city} isDisabled={isDisabled} {...cityField} />
      <Button type="submit" text="Submit" isDisabled={isDisabled} />
    </form>
  )
}

export default UserForm
