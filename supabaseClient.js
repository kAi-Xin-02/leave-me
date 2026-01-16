import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://pbrbmjpsynpmshmysmzq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zwl7FMC26oSvybJ5ALfd1Q_2rOM6mLe';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const MessageDAO = {
    async fetchAll() {
        const { data, error } = await supabase
           .from('guestbook')
           .select('*')
           .order('created_at', { ascending: false })
           .limit(50);
        return { data, error };
    },

    async insert(name, message) {
        const { data, error } = await supabase
           .from('guestbook')
           .insert([{ name, message }])
           .select();
        return { data, error };
    },

    subscribe(callback) {
        return supabase
           .channel('public:guestbook')
           .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guestbook' }, (payload) => {
                callback(payload.new);
            })
           .subscribe();
    }
};