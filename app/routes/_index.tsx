export default function Index() {
  return (
    <div>
      <div style={{ 
        backgroundColor: '#1a1a1a', 
        color: 'white', 
        padding: '20px',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>BrandFontsIQ</h1>
      </div>
      
      <div style={{ padding: '50px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '20px' }}>
          Can you see this text?
        </h1>
        
        <div style={{ 
          backgroundColor: 'red', 
          color: 'white', 
          padding: '20px',
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          RED BOX - This should be visible
        </div>
        
        <div style={{ 
          backgroundColor: 'blue', 
          color: 'white', 
          padding: '20px',
          fontSize: '24px',
          marginBottom: '20px'
        }}>
          BLUE BOX - This should be visible
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          color: 'black', 
          padding: '20px',
          fontSize: '24px'
        }}>
          WHITE BOX - Black text on white background
        </div>
      </div>
    </div>
  );
}