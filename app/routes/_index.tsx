import { Header } from "~/components/header";

export default function Index() {
  return (
    <div>
      <Header />
      
      <div style={{ padding: '50px' }}>
        <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '20px' }}>
          Typography Intelligence for Modern Enterprises
        </h1>
        
        <p style={{ color: '#999', fontSize: '20px', marginBottom: '40px' }}>
          Transform your font data into actionable insights.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '20px',
          marginTop: '60px' 
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '30px', 
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{ color: 'white', fontSize: '24px' }}>Hormel Foods</h2>
            <p style={{ color: '#999', fontSize: '36px', fontWeight: 'bold' }}>263</p>
            <p style={{ color: '#666' }}>font instances</p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '30px', 
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{ color: 'white', fontSize: '24px' }}>Polaris</h2>
            <p style={{ color: '#999', fontSize: '36px', fontWeight: 'bold' }}>2,134</p>
            <p style={{ color: '#666' }}>font instances</p>
          </div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '30px', 
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h2 style={{ color: 'white', fontSize: '24px' }}>RPM International</h2>
            <p style={{ color: '#999', fontSize: '36px', fontWeight: 'bold' }}>588</p>
            <p style={{ color: '#666' }}>font instances</p>
          </div>
        </div>
      </div>
    </div>
  );
}