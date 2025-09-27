import { supabase } from '../../../lib/supabaseClient';

// GET all messages
export async function GET() {
	const { data, error } = await supabase
		.from('messages')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data);
}

// POST new message
export async function POST(req) {
	const body = await req.json();
	const { text } = body;

	if (!text) {
		return Response.json({ error: 'Text is required' }, { status: 400 });
	}

	const { data, error } = await supabase
		.from('messages')
		.insert([{ text }])
		.select();

	if (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}

	return Response.json(data[0]);
}
