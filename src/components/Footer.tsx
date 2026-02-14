export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--glass-bg)', 
      borderTop: '1px solid var(--glass-border)',
      padding: '2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Smart Cart. All rights reserved.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms of Service</a>
          <a href="#" className="hover:text-primary">Contact</a>
        </div>
      </div>
    </footer>
  );
}
