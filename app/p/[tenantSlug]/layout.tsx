import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function TenantLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ tenantSlug: string }>; // In Next.js 15+, params is a Promise
}) {
	// 1. Extract the dynamic route parameter
	const resolvedParams = await params;
	const { tenantSlug } = resolvedParams;

	// 2. Initialize the Supabase server client
	const supabase = await createClient();

	// 3. Query the tenant by slug
	const { data: tenant, error } = await supabase
		.from("tenants")
		.select("business_name, brand_config")
		.eq("slug", tenantSlug)
		.single();

	// 4. Handle invalid slugs
	if (error || !tenant) {
		notFound();
	}

	// 5. Extract the primary color from the JSONB config (with a fallback)
	// Ensure your JSONB type matching works; supabase returns it as any/unknown depending on setup
	const brandConfig = tenant.brand_config as {
		primary_color?: string;
		logo_url?: string;
	};
	const primaryColor = brandConfig?.primary_color || "#2563eb"; // Default to a standard blue

	return (
		// We inject the CSS variable at the top-level wrapper of this layout
		<div
			style={{ "--brand-color": primaryColor } as React.CSSProperties}
			className="min-h-screen bg-gray-50 flex flex-col"
		>
			{/* White-labeled Header */}
			<header className="bg-brand text-white p-4 shadow-sm">
				<div className="max-w-5xl mx-auto flex justify-between items-center">
					<h1 className="text-xl font-bold">{tenant.business_name}</h1>
					{/* We will add the logo and user dropdown here later */}
				</div>
			</header>

			{/* Page Content injected here */}
			<main className="flex-grow max-w-5xl mx-auto w-full p-4">{children}</main>
		</div>
	);
}
