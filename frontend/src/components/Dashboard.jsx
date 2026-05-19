function Dashboard({ tickets }) {
  const open = tickets.filter(t => t.status === 'Open').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress').length;
  const critical = tickets.filter(t => t.priority === 'Critical' && t.status !== 'Resolved' && t.status !== 'Closed').length;
  const resolved = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;

  const stats = [
    { label: 'Open', value: open, color: '#60a5fa' },
    { label: 'In Progress', value: inProgress, color: '#a78bfa' },
    { label: 'Critical', value: critical, color: '#ef4444' },
    { label: 'Resolved', value: resolved, color: '#34d399' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
      {stats.map(s => (
        <div key={s.label} style={{
          background: '#080d19', border: '1px solid #1e2d45',
          borderRadius: '8px', padding: '16px'
        }}>
          <div style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
            {s.label}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: s.color }}>
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;