import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint-ul mockapi
const API_URL = `https://6737290eaafa2ef22232df13.mockapi.io/contacts`; // Înlocuiește cu endpoint-ul tău mockapi

// Operații asincrone
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact) => {
    const response = await axios.post(API_URL, newContact);
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId;
  }
);

// State-ul inițial
const initialState = {
  items: [],
  isLoading: false,
  error: null,
  filter: ''
};

// Slice-ul Redux
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;