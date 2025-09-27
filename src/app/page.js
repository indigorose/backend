'use client';

import { useState, useEffect } from 'react';

export default function Home() {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		fetchMessages();
	}, []);

	async function fetchMessages() {
		const res = await fetch('/api/messages');
		const data = await res.json();
		setMessages(data);
	}

	async function addMessage() {
		if (!input.trim()) return;

		await fetch('/api/messages', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ text: input }),
		});

		setInput('');
		fetchMessages();
	}

	return (
		<main
			style={{
				maxWidth: '600px',
				margin: '50px auto',
				textAlign: 'center',
			}}
		>
			<h1>Mini Fullstack with Supabase 🚀</h1>

			<div style={{ margin: '20px 0' }}>
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Write a message..."
					style={{ padding: '10px', width: '70%' }}
				/>
				<button
					onClick={addMessage}
					style={{
						padding: '10px 20px',
						marginLeft: '10px',
						cursor: 'pointer',
					}}
				>
					Send
				</button>
			</div>

			<ul style={{ textAlign: 'left', marginTop: '30px' }}>
				{messages.map((msg) => (
					<li key={msg.id}>
						{msg.text}{' '}
						<small>
							({new Date(msg.created_at).toLocaleString()})
						</small>
					</li>
				))}
			</ul>
		</main>
	);
}
