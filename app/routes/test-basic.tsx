export default function TestBasic() {
  return (
    <div>
      <h1 style={{ color: 'white', fontSize: '48px', padding: '50px' }}>
        Basic Test - Can you see this?
      </h1>
      <div style={{ background: 'white', color: 'black', padding: '20px', margin: '20px' }}>
        <h2>White box with black text</h2>
        <p>If you can see this, routing works but there's a CSS issue with the main page.</p>
      </div>
      <div style={{ background: 'blue', color: 'white', padding: '20px', margin: '20px' }}>
        <h2>Blue box with white text</h2>
        <p>Testing different color combinations.</p>
      </div>
    </div>
  );
}