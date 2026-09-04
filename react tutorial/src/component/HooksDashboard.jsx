import React, { 
  useState, 
  useEffect, 
  useContext, 
  useRef, 
  useMemo, 
  useCallback 
} from 'react';

// --- 1. CUSTOM HOOK DEMO (Pehle define kar lete hain) ---
// Hook: Window Size track karne wala magic
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize();
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    // Cleanup function: Component delete hone se pehle listener hata do
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// --- 2. CONTEXT DEMO SETUP ---
const ThemeContext = React.createContext();

const HooksDashboard = () => {
  // --- GLOBAL STYLES (Wahi Jadugar Theme) ---
  const styles = {
    container: { backgroundColor: '#0a0e17', color: '#e8edf5', fontFamily: "'Poppins', sans-serif", minHeight: '100vh', padding: '20px' },
    card: { background: '#151d2e', border: '1px solid #1e3a5f', borderRadius: '14px', padding: '24px', marginBottom: '30px' },
    h2: { marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' },
    codeBlock: { background: '#0d1321', padding: '15px', borderRadius: '8px', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem', color: '#6b7fa3', marginTop: '10px' },
    badge: { background: 'rgba(168,85,247,0.2)', color: '#a855f7', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem' },
    btn: { padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }
  };

  const colors = { accent: '#00ff88', purple: '#a855f7', pink: '#ff6b9d' };

  // ================= SECTION 1: STATE & EFFECT =================
  const [count, setCount] = useState(0);
  
  // useEffect Demo Logic
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const requestTimer = useRef(null);
  
  // Ye function tab chalega jab 'count' change hoga
  useEffect(() => {
    // Document title update karna (Side Effect)
    document.title = `Count: ${count}`;
    console.log("Effect Chala! Count badal gaya.");
  }, [count]);

  // Fake API Call
  const fetchData = () => {
    setLoading(true);
    requestTimer.current = setTimeout(() => {
      setData("✅ Data Server se aa gaya!");
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    return () => clearTimeout(requestTimer.current);
  }, []);

  // ================= SECTION 2: CONTEXT & REF =================
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const inputRef = useRef(null);

  // Input focus karne wala function
  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.style.border = "2px solid #00ff88";
  };

  // ================= SECTION 3: PERFORMANCE (MEMO) =================
  const [number, setNumber] = useState(10);
  const [text, setText] = useState("");

  // Heavy Calculation (Jo hamesha calculate nahi honi chahiye)
  // useMemo use kar rahe hain taaki 'text' change hone par ye wapas na chale
  const expensiveCalculation = useMemo(() => {
    console.log("🔥 Heavy Calculation ho raha hai... (Sirf Number change par)");
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += number;
    }
    return result;
  }, [number]); // Sirf 'number' par depend karega

  // useCallback (Function ko memoize karna)
  // useMemo ki tarah hi hai, bas function ke liye use hota hai
  // React ko re-render hone par naya function banana padta hai, useCallback use karke hum bachte hain
  const handleClick = useCallback(() => {
    console.log("Button Clicked (Optimized Function)");
  }, []); 

  // ================= SECTION 4: CUSTOM HOOK USAGE =================
  const windowSize = useWindowSize();


  return (
    <div style={styles.container}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#00ff88' }}>
          React Hooks ka Jadugar 🪝
        </h1>
        <p style={{ color: '#6b7fa3' }}>
          Hooks wo special functions hain jo React features ko Functional Components mein laate hain.
        </p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* === 1. STATE & EFFECT === */}
        <section style={styles.card}>
          <h2 style={{ ...styles.h2, color: colors.pink }}>
            <i className="fas fa-sync-alt"></i> 1. useState & useEffect
          </h2>
          <p style={{ color: '#6b7fa3' }}>
            <b>useState:</b> UI update karne ke liye.<br/>
            <b>useEffect:</b> "Side Effects" (API calls, subscriptions) handle karne ke liye jo render ke baad hote hain.
          </p>

          <div style={{ display: 'flex', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
            {/* Counter Demo */}
            <div style={{ flex: 1, background: '#0d1321', padding: '15px', borderRadius: '8px' }}>
              <h3 style={{margin:0, color:'#fff'}}>Counter</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00ff88' }}>{count}</p>
              <button style={{...styles.btn, background: '#ff6b9d'}} onClick={() => setCount(c => c - 1)}>-</button>
              <button style={{...styles.btn, background: '#00d4ff'}} onClick={() => setCount(c => c + 1)}>+</button>
              <p style={{fontSize: '0.8rem', marginTop: '10px'}}>Browser Title dekho 👆</p>
            </div>

            {/* Data Fetching Demo */}
            <div style={{ flex: 1, background: '#0d1321', padding: '15px', borderRadius: '8px' }}>
              <h3 style={{margin:0, color:'#fff'}}>Fake API</h3>
              <div style={{ height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading ? <i className="fas fa-spinner fa-spin" style={{fontSize: '1.5rem', color: '#00d4ff'}}></i> : <span style={{color: data ? '#00ff88' : '#666'}}>{data || "No Data"}</span>}
              </div>
              <button style={{...styles.btn, background: '#a855f7'}} onClick={fetchData} disabled={loading}>
                Fetch Data
              </button>
            </div>
          </div>
        </section>

        {/* === 2. CONTEXT (No Prop Drilling) === */}
        <section style={styles.card}>
          <h2 style={{ ...styles.h2, color: '#ffa502' }}>
            <i className="fas fa-network-wired"></i> 2. useContext (Global Data)
          </h2>
          <p style={{ color: '#6b7fa3' }}>
            Bina Props pass kiye data kisi bhi component tak pohanchao. 
            Current Theme: <span style={{color: '#ffa502', fontWeight:'bold'}}>{theme.toUpperCase()}</span>
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button 
              onClick={() => setTheme('dark')}
              style={{...styles.btn, background: theme === 'dark' ? '#00ff88' : '#333', color: '#000'}}
            >
              Dark Mode
            </button>
            <button 
              onClick={() => setTheme('light')}
              style={{...styles.btn, background: theme === 'light' ? '#00ff88' : '#333', color: '#000'}}
            >
              Light Mode
            </button>
          </div>
          
          <ThemeContext.Provider value={theme}>
             <div style={{ marginTop: '15px', padding: '15px', border: '1px dashed #666', borderRadius: '8px' }}>
                <span style={{fontSize: '0.8rem'}}>Nested Component (Yahan props nahi bheja!):</span><br/>
                <DeepChild />
             </div>
          </ThemeContext.Provider>
        </section>

        {/* === 3. useRef (DOM Access) === */}
        <section style={styles.card}>
          <h2 style={{ ...styles.h2, color: '#00d4ff' }}>
            <i className="fas fa-fingerprint"></i> 3. useRef (Direct DOM)
          </h2>
          <p style={{ color: '#6b7fa3' }}>
            DOM element ko direct select karo (Jaise `document.getElementById`) bina re-render kiye.
          </p>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '15px' }}>
            <input 
              ref={inputRef} 
              type="text" 
              placeholder="Click 'Focus' to magic" 
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#0d1321', color: '#fff' }}
            />
            <button style={{...styles.btn, background: '#00ff88', color: '#000'}} onClick={focusInput}>
              Focus Input
            </button>
          </div>
        </section>

        {/* === 4. PERFORMANCE (useMemo) === */}
        <section style={styles.card}>
          <h2 style={{ ...styles.h2, color: '#ff4757' }}>
            <i className="fas fa-tachometer-alt"></i> 4. useMemo & useCallback
          </h2>
          <p style={{ color: '#6b7fa3' }}>
            <b>Optimization:</b> Heavy calculation ko cache karlo. Jab tak input change nahi hota, calculation mat dobara karo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div>
              <label style={{display:'block', marginBottom:'5px', color:'#fff'}}>Heavy Input (Trigger Calc)</label>
              <input 
                type="number" 
                value={number} 
                onChange={(e) => setNumber(Number(e.target.value))} 
                style={{ width: '100%', padding: '10px', background: '#0d1321', border: '1px solid #ff4757', color: '#fff', borderRadius: '5px' }}
              />
            </div>
            <div>
              <label style={{display:'block', marginBottom:'5px', color:'#fff'}}>Light Input (No Calc)</label>
              <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Type anything..." 
                style={{ width: '100%', padding: '10px', background: '#0d1321', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '8px', border: '1px solid #333' }}>
            <p style={{fontSize: '0.8rem', color: '#666'}}>Result of Heavy Calculation:</p>
            <h3 style={{color: '#00ff88', fontSize: '1.5rem'}}>{expensiveCalculation}</h3>
            <p style={{fontSize: '0.8rem', marginTop: '5px', color: '#ff4757'}}>
              *Console kholo dekho! 'Light Input' type karne par calculation nahi hogi.
            </p>
            <button style={{...styles.btn, background: '#00ff88', color: '#000'}} onClick={handleClick}>
              Test memoized callback
            </button>
          </div>
        </section>

        {/* === 5. CUSTOM HOOKS === */}
        <section style={styles.card}>
          <h2 style={{ ...styles.h2, color: '#00ff88' }}>
            <i className="fas fa-cogs"></i> 5. Custom Hooks
          </h2>
          <p style={{ color: '#6b7fa3' }}>
            Apna khud ka Hook banao logic ko reuse karne ke liye. 
            Niche humne <code>useWindowSize</code> banaya hai jo poore app mein use kar sakte hain.
          </p>
          <div style={{ marginTop: '15px', padding: '15px', background: 'linear-gradient(45deg, #1a2540, #151d2e)', borderRadius: '8px' }}>
            <i className="fas fa-expand-arrows-alt" style={{marginRight: '10px', color: '#00ff88'}}></i>
            Current Screen Size: 
            <b style={{marginLeft: '10px', color: '#fff'}}>{windowSize.width}px x {windowSize.height}px</b>
          </div>
        </section>

      </div>
    </div>
  );
};

// Nested Component for Context Demo
const DeepChild = () => {
  const theme = useContext(ThemeContext);
  // Yahan humne props accept nahi kiya, phir bhi theme access kar rahe hain!
  return (
    <div style={{ 
      padding: '10px', 
      background: theme === 'dark' ? '#333' : '#fff', 
      color: theme === 'dark' ? '#fff' : '#000',
      borderRadius: '5px',
      marginTop: '10px'
    }}>
      I am deep inside. I know Theme is: <b>{theme}</b>
    </div>
  );
};

export default HooksDashboard;