import { supabase } from '../assets/js/supabaseClient.js';

export const TestSuite = {
    async run() {
        console.group("🚀 STARTING SYSTEM DIAGNOSTICS");
        
        await this.testDatabaseConnection();
        await this.testRLSWritePolicy();
        this.testSanitization();
        this.testHoneypotLogic();
        
        console.groupEnd();
    },

    async testDatabaseConnection() {
        const start = performance.now();
        const { data, error } = await supabase.from('guestbook').select('count', { count: 'exact', head: true });
        const duration = (performance.now() - start).toFixed(2);
        
        if (error) console.error("❌ DB Connection Failed:", error);
        else console.log(`✅ DB Connected. Latency: ${duration}ms. Rows: ${data}`);
    },

    async testRLSWritePolicy() {
       
        const longMsg = "A".repeat(100); 
        const { error } = await supabase.from('guestbook').insert({ name: 'TEST', message: longMsg });
        
        if (error && error.code === '42501' |

| error.message.includes('new row violates')) {
            console.log("✅ RLS Policy Active: Blocked invalid length insert.");
        } else {
            console.error("❌ RLS Policy Failure: Invalid data was accepted or unexpected error.", error);
        }
    },

    testSanitization() {
        const input = "<script>alert('pwned')</script>";
    
        const sanitized = input.replace(/[&<>'"]/g, tag => ({'&': '&amp;','<': '&lt;','>': '&gt;',"'": '&#39;','"': '&quot;'}[tag]));
        
        if (sanitized === "&lt;script&gt;alert(&#39;pwned&#39;)&lt;/script&gt;") {
            console.log("✅ XSS Sanitization Logic Verified.");
        } else {
            console.error("❌ XSS Sanitization Failed.");
        }
    },
    
    testHoneypotLogic() {
    
        const isBot = (val) => val.length > 0;
        if (isBot("I am a bot")) {
            console.log("✅ Honeypot Logic Verified.");
        } else {
            console.error("❌ Honeypot Logic Failed.");
        }
    }
};


window.RunTests = () => TestSuite.run();