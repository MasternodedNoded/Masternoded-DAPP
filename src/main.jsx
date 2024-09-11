import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Buffer } from "buffer";
import process from "process";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import { mainnet } from "wagmi/chains";

const projectId = "2a2a5978a58aad734d13a2d194ec469a";

// Add more chains to support a broader range of Ethereum-based networks
const chains = [mainnet];

const wagmiConfig = defaultWagmiConfig({
	projectId,
	chains,
	metadata: {
		name: "test",
	},
});

createWeb3Modal({
	chains,
	projectId,
	wagmiConfig,
});
window.Buffer = Buffer;
window.process = process;
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WagmiConfig config={wagmiConfig}>
			<App />
		</WagmiConfig>
	</React.StrictMode>
);
