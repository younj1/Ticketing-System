function TicketCard({ ticket, onSelect }) {
  const priorityColors = {
    Low: '#22c55e', Medium: '#f59e0b', High: '#f97316', Critical: '#ef4444'
  };
  const statusColors = {
    'Open': '#60a5fa', 'In Progress': '#a78bfa', 'Resolved': '#34d399', 'Closed': '#94a3b8'
  };

  return (
    <div onClick={() => onSelect(ticket)} style={{
      background: '#080d19', border: '1px solid #1e2d45', borderRadius: '8px',
      padding: '14px 16px', cursor: 'pointer', marginBottom: '8px',
      display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '16px', alignItems: 'center'
    }}>
      <div style={{ fontSize: '11px', color: '#475569', minWidth: '80px' }}>{ticket.ticketId}</div>
      <div>
        <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>{ticket.title}</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', color: statusColors[ticket.status] }}>{ticket.status}</span>
          <span style={{ fontSize: '11px', color: priorityColors[ticket.priority] }}>{ticket.priority}</span>
          <span style={{ fontSize: '11px', color: '#475569' }}>{ticket.category}</span>
          <span style={{ fontSize: '11px', color: '#334155' }}>· {ticket.requester}</span>
        </div>
      </div>
      <div style={{ fontSize: '11px', color: '#334155', textAlign: 'right' }}>
        {new Date(ticket.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

function TicketList({ tickets, onSelect }) {
  if (tickets.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#334155' }}>
        No tickets found.
      </div>
    );
  }

  return (
    <div>
      {tickets.map(t => (
        <TicketCard key={t._id} ticket={t} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default TicketList;