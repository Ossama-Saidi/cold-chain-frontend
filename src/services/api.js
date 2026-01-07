import axios from "axios";

// Base URL du backend Django
// const API_BASE_URL = "https://cold-chain-monitoring.onrender.com/api";
const API_BASE_URL = "http://127.0.0.1:8000/api";

// export const API_BASE_URL = import.meta.env.VITE_API_URL;


export const registerUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/auth/register/`, userData, {
    headers: { 'Content-Type': 'application/json' }
  });
  return res.data;
};

export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login/`, 
    { username, password }, 
    { headers: { 'Content-Type': 'application/json' } }
  );
  return res.data;
};


export const getUserProfile = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/auth/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
// ------------------------
// MESURES
// ------------------------
export const fetchMesures = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/mesures/list/`);
    return res.data;
  } catch (err) {
    console.error("Erreur fetchMesures:", err);
    return [];
  }
};

// ------------------------
// TICKETS
// ------------------------
export const fetchTickets = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/tickets/`);
    return res.data;
  } catch (err) {
    console.error("Erreur fetchTickets:", err);
    return [];
  }
};

export const updateTicket = async (ticketId, data) => {
  try {
    const res = await axios.patch(`${API_BASE_URL}/tickets/${ticketId}/`, data);
    return res.data;
  } catch (err) {
    console.error("Erreur updateTicket:", err);
    return null;
  }
};

export const closeTicket = async (ticketId) => {
  return updateTicket(ticketId, {
    statut: "clos",
    closed_at: new Date().toISOString()
  });
};

// ------------------------
// AUDIT
// ------------------------
export const fetchAuditLogs = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auditlogs/`);
    return res.data;
  } catch (err) {
    console.error("Erreur fetchAuditLogs:", err);
    return [];
  }
};

// ------------------------
// INCIDENTS
// ------------------------
export const fetchIncidents = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/incidents/list/`);
    return res.data;
  } catch (err) {
    console.error("Erreur fetchIncidents:", err);
    return [];
  }
};



