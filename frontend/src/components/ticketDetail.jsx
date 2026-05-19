import { useState } from 'react';

function TicketDetail({ ticket, onClose, onUpdate, onDelete }) {
  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [noteText, setNoteText] = useState('');
  const [noteAuthor, setNoteAuthor] = useState('');

  const inputStyle = {
    width: '100%', background: '#0a0f1a', border: '1px solid #1e2d45',
    borderRadius: '6px', padding: '10px 12px', color: '#e2e8f0',
    fontSize: '14px', boxSizing: 'border-box'
  };

  const handleUpdate = () => {
    onUpdate(ticket._id, { status, priority });
  };

  const handleAddNote = () => {
    if (!noteText.trim() || !noteAuthor.trim()) return;
    onUpdate(ticket._id, {
      note: { text: noteText, author: noteAuthor }
    });
    setNoteText('');
    setNoteAuthor('');
  };

  const handleDelete = () => {
    if (window.confirm('Delete this ticket?')) {
      onDelete(ticket._id);
    }
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0f1624', border: '1px solid #1e2d45', borderRadius: '10px',
        width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', padding: '28px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>{ticket.ticketId}</div>
            <h2 style={{ fontSize: '18px' }}>{ticket.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', padding: '14px', background: '#080d19', borderRadius: '8px', border: '1px solid #1e2d45' }}>
          {[['Requester', ticket.requester], ['Category', ticket.category], ['Created', new Date(ticket.createdAt).toLocaleString()]].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: '10px', color: '#475569', textTransform: 'uppercase', marginBottom: '2px' }}>{k}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{v}</div>
            </div>
          ))}
        </div>

        {ticket.description && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#475569', marginBottom: '6px' }}>DESCRIPTION</div>
            <div style={{ background: '#080d19', border: '1px solid #1e2d45', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#94a3b8' }}>
              {ticket.description}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px' }}>UPDATE TICKET</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
            <select style={inputStyle} value={status} onChange={e => setStatus(e.target.value)}>
              {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => <option key={s}>{s}</option>)}
            </select>
            <select style={inputStyle} value={priority} onChange={e => setPriority(e.target.value)}>
              {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button onClick={handleUpdate} style={{ padding: '8px 16px', background: '#065f46', border: 'none', borderRadius: '6px', color: '#6ee7b7', cursor: 'pointer', fontSize: '13px' }}>
            Save Changes
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px' }}>ADD NOTE</div>
          <input style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Your name" value={noteAuthor} onChange={e => setNoteAuthor(e.target.value)} />
          <textarea style={{ ...inputStyle, resize: 'vertical', marginBottom: '8px' }} rows={3} placeholder="Note text..." value={noteText} onChange={e => setNoteText(e.target.value)} />
          <button onClick={handleAddNote} style={{ padding: '8px 16px', background: '#1d4ed8', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '13px' }}>
            Add Note
          </button>
        </div>

        {ticket.notes && ticket.notes.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px' }}>NOTES ({ticket.notes.length})</div>
            {ticket.notes.map(n => (
              <div key={n._id} style={{ background: '#080d19', border: '1px solid #1e2d45', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: '700' }}>{n.author}</span>
                  <span style={{ fontSize: '11px', color: '#475569' }}>{new Date(n.createdAt).toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>{n.text}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ borderTop: '1px solid #1e2d45', paddingTop: '16px' }}>
          <button onClick={handleDelete} style={{ padding: '8px 16px', background: '#7f1d1d', border: 'none', borderRadius: '6px', color: '#fca5a5', cursor: 'pointer', fontSize: '13px' }}>
            Delete Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;