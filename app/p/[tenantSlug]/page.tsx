import React from "react";

export default async function TenantPortalPage({
	params,
}: {
	params: Promise<{ tenantSlug: string }>;
}) {
	const { tenantSlug } = await params;

	return (
		<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mt-6">
			<h2 className="text-2xl font-semibold mb-2 text-gray-800">
				Welcome to your Portal
			</h2>
			<p className="text-gray-600 mb-6">
				You are currently viewing the environment for:{" "}
				<span className="font-mono bg-gray-100 px-2 py-1 rounded">
					{tenantSlug}
				</span>
			</p>

			{/* Notice how we use 'bg-brand' here! Tailwind maps it to the CSS variable set in layout.tsx */}
			<button className="bg-brand text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
				Test Brand Color
			</button>
		</div>
	);
}
