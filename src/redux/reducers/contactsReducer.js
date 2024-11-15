import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Endpoint-ul mockapi
const API_URL = `https://6737290eaafa2ef22232df13.mockapi.io/contacts`;

// Operații asincrone
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await axios.get(API_URL);
    return response.data;  // Returnează datele din răspunsul API
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact) => {
    const response = await axios.post(API_URL, newContact);
    return response.data;  // Returnează datele nou create
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await axios.delete(`${API_URL}/${contactId}`);
    return contactId;  // Returnează id-ul contactului șters
  }
);

// State-ul inițial
const initialState = {
  items: [],     // Asigură-te că items începe ca un array gol
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
      // Cazul în care fetchContacts este în curs
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      // Cazul în care fetchContacts s-a realizat cu succes
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload || []; // Dacă răspunsul este undefined, asigură-te că items este un array gol
      })
      // Cazul în care fetchContacts a eșuat
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Cazul în care adăugarea unui contact a fost realizată cu succes
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Cazul în care ștergerea unui contact a fost realizată cu succes
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;

export default contactsSlice.reducer;