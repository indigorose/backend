import { supabase } from '../../../lib/supabaseClient';

export async function GET() {
	try {
		const { data, error } = await supabase
			.from('messages')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) throw error;
		return Response.json(data);
	} catch (err) {
		console.error('GET /api/messages error:', err.message);
		return Response.json({ error: err.message }, { status: 500 });
	}
}

export async function POST(req) {
	try {
		const body = await req.json();
		const { text } = body;

		if (!text) {
			return Response.json(
				{ error: 'Text is required' },
				{ status: 400 }
			);
		}

		const { data, error } = await supabase
			.from('messages')
			.insert([{ text }])
			.select();

		if (error) throw error;
		return Response.json(data[0]);
	} catch (err) {
		console.error('POST /api/messages error:', err);
		return Response.json(
			{ error: err.message || 'Unknown error' },
			{ status: 500 }
		);
	}
}
