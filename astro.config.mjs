import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: d1({ 
				binding: "DB", 
				session: "auto" // 既存のKVを消していれば、これで新しく作られます
			}),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()],
			
			// 有料プラン機能（Dynamic Workers）を完全に無効化
			// sandboxed: [],
			// sandboxRunner: null,
			// marketplace: null,
		}),
	],
	devToolbar: { enabled: false },
});
