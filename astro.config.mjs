import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 /* sandbox */ } from "@emdash-cms/cloudflare"; // sandboxをコメントアウト
import { formsPlugin } from "@emdash-cms/plugin-forms";
// import { webhookNotifierPlugin } from "@emdash-cms/plugin-webhook-notifier"; // これを止める
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
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
			plugins: [formsPlugin()], // これは通常のプラグインなのでOK
			/* 以下の sandbox 関連が有料プラン機能を必要とするためコメントアウト
			   sandboxed: [webhookNotifierPlugin()],
			   sandboxRunner: sandbox(),
			*/
			marketplace: "https://marketplace.emdashcms.com",
		}),
	],
	devToolbar: { enabled: false },
});
