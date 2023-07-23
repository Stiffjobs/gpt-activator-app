'use client';

import { Dispatch, SetStateAction } from 'react';

export default function LineIntegration({
	setLineAccessToken,
	setLineChannelId,
}: {
	setLineAccessToken: Dispatch<SetStateAction<string | null | undefined>>;
	setLineChannelId: Dispatch<SetStateAction<string | null | undefined>>;
}) {
	return (
		<div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Line Channel ID</span>
				</label>
				<input
					onChange={e => setLineChannelId(e.target.value)}
					type="text"
					placeholder="Your Line Channel ID"
					className="input-bordered input w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Line Access Token </span>
				</label>
				<input
					type="text"
					onChange={e => setLineAccessToken(e.target.value)}
					placeholder="Your Line Access Token"
					className="input-bordered input w-full max-w-xs"
				/>
			</div>
		</div>
	);
}
