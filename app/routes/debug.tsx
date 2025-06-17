export default function Debug() {
  return (
    <html>
      <body style={{ margin: 0, padding: 50, backgroundColor: 'black' }}>
        <h1 style={{ color: 'red', fontSize: 48 }}>DEBUG PAGE</h1>
        <p style={{ color: 'white', fontSize: 24 }}>If you see this, React routing works</p>
        <div style={{ backgroundColor: 'yellow', color: 'black', padding: 20, marginTop: 20 }}>
          This is a yellow box with black text
        </div>
      </body>
    </html>
  );
}