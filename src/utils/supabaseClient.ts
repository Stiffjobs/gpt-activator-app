import { createClient } from '@supabase/supabase-js';
import { env } from 'stiff-gpt/env.mjs';
import { Database } from 'stiff-gpt/types/database';

export const supabaseClient = (supabaseAccessToken: string) => {
	const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY, {
		global: {
			headers: { Authorization: `Bearer ${supabaseAccessToken}` },
		},
	});

	return supabase;
};
