import TicketDetail from './components/TicketDetail';
import { useState, useEffect } from 'react';
import { getTickets, createTicket, updateTicket, deleteTicket } from './api/tickets';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import NewTicketModal from './components/NewTicketModal';

function App() {
  const [tickets, setTickets] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [search, setSearch] = useState('');

  const fetchTickets = async () => {
    try {
      const res = await getTickets();
      setTickets(res.data);
    } catch (err) {
      console.error('Failed to fetch tickets:', err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await createTicket(formData);
      await fetchTickets();
      setShowNewModal(false);
    } catch (err) {
      console.error('Failed to create ticket:', err);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTicket(id, data);
      await fetchTickets();
    } catch (err) {
      console.error('Failed to update ticket:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      await fetchTickets();
      setSelectedTicket(null);
    } catch (err) {
      console.error('Failed to delete ticket:', err);
    }
  };

  const filtered = tickets.filter(t => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (filterPriority !== 'All' && t.priority !== filterPriority) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) ||
        t.ticketId.toLowerCase().includes(q) ||
        t.requester.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700' }}>IT Helpdesk</h1>
        <button onClick={() => setShowNewModal(true)} style={{
          background: '#1d4ed8', color: '#fff', border: 'none',
          padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px'
        }}>
          + New Ticket
        </button>
      </div>

      <Dashboard tickets={tickets} />

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0', flexWrap: 'wrap' }}>
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, padding: '8px 12px', borderRadius: '6px',
            border: '1px solid #1e2d45', background: '#0a0f1a', color: '#e2e8f0', fontSize: '14px'
          }}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #1e2d45', background: '#0a0f1a', color: '#e2e8f0' }}>
          <option value="All">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #1e2d45', background: '#0a0f1a', color: '#e2e8f0' }}>
          <option value="All">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </div>

      <TicketList
        tickets={filtered}
        onSelect={setSelectedTicket}
        selectedTicket={selectedTicket}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      {showNewModal && (
        <NewTicketModal
          onCreate={handleCreate}
          onClose={() => setShowNewModal(false)}
        />
      )}
      {selectedTicket && (
    <TicketDetail
      ticket={selectedTicket}
      onClose={() => setSelectedTicket(null)}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
)}
    </div>
  );
}

export default App;