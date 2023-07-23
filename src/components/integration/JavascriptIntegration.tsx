import { Dispatch, SetStateAction } from 'react';

export default function JavaScriptIntegration({
	setOrigin,
}: {
	setOrigin: Dispatch<SetStateAction<string | null | undefined>>;
}) {
	return (
		<div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Origin Name</span>
				</label>
				<input
					onChange={e => setOrigin(e.target.value)}
					type="text"
					placeholder="Your Website Origin Name"
					className="input-bordered input w-full max-w-xs"
				/>
			</div>
		</div>
	);
}
