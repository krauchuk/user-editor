import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('allUsers/fetch', async () => {
  return [
    {
      id: 1,
      name: 'Jon Snow',
      userName: 'Wolf',
      email: 'jon@snow.com',
      city: 'Winterfell',
    },
    {
      id: 2,
      name: 'Darth Vader',
      userName: 'Vader',
      email: 'darth@vader.com',
      city: 'Death Start',
    },
    {
      id: 3,
      name: 'Frodo Baggins',
      userName: 'Frodo',
      email: 'frodo@baggins.com',
      city: 'Shire',
    },
    {
      id: 4,
      name: 'Indiana Jones',
      userName: 'Indy',
      email: 'indiana@jones.com',
      city: 'Venice',
    },
    {
      id: 5,
      name: 'Luke Skywalker',
      userName: 'Luke',
      email: 'luke@skywalker.com',
      city: 'Tatooine',
    },
  ]
})
