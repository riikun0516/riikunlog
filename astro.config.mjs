import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 /* sandbox */ } from "@emdash-cms/cloudflare";
import { formsPlugin } from "@emdash-cms/plugin-forms";
// 有料プラン機能のためコメントアウト
// import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier"; 
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
				// "auto"だと名前衝突エラーが起きるため、作成済みのIDを指定します
				// Cloudflareダッシュボードの[KV]から取得したIDをここに貼り付けてください
				session: "2f7eb050080c4d229f94bf97d80aa6cb" 
			}),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()],
			
			/* 以下の「Dynamic Workers」を必要とする項目はコメントアウトして無効化します */
			// sandboxed: [webhookNotifierPlugin()],
			// sandboxRunner: sandbox(),
			// marketplace: "https://marketplace.emdashcms.com",
		}),
	],
	devToolbar: { enabled: false },
});
