import { useState } from 'react';

function NewTicketModal({ onCreate, onClose }) {
  const [form, setForm] = useState({
    title: '', description: '', requester: '',
    category: 'Hardware', priority: 'Medium'
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const valid = form.title.trim() && form.requester.trim();

  const inputStyle = {
    width: '100%', background: '#0a0f1a', border: '1px solid #1e2d45',
    borderRadius: '6px', padding: '10px 12px', color: '#e2e8f0',
    fontSize: '14px', boxSizing: 'border-box'
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0f1624', border: '1px solid #1e2d45', borderRadius: '10px',
        width: '100%', maxWidth: '560px', padding: '28px'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>+ New Ticket</h2>
        <div style={{ display: 'grid', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>REQUESTER *</label>
            <input style={inputStyle} value={form.requester} onChange={set('requester')} placeholder="Full name" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>TITLE *</label>
            <input style={inputStyle} value={form.title} onChange={set('title')} placeholder="Brief description of the issue" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>DESCRIPTION</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={form.description} onChange={set('description')} placeholder="Detailed explanation..." />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>CATEGORY</label>
              <select style={inputStyle} value={form.category} onChange={set('category')}>
                {['Hardware','Software','Network','Security','Account/Access','Email','Printer','Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>PRIORITY</label>
              <select style={inputStyle} value={form.priority} onChange={set('priority')}>
                {['Low','Medium','High','Critical'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button onClick={onClose} style={{ padding: '9px 18px', background: 'transparent', border: '1px solid #1e2d45', borderRadius: '6px', color: '#94a3b8', cursor: 'pointer' }}>Cancel</button>
          <button disabled={!valid} onClick={() => valid && onCreate(form)} style={{ padding: '9px 18px', background: valid ? '#1d4ed8' : '#1e2d45', border: 'none', borderRadius: '6px', color: '#fff', cursor: valid ? 'pointer' : 'not-allowed' }}>Submit Ticket</button>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;