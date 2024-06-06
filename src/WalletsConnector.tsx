import { useConfig, useConnect } from "@quirks/react";

export const WalletsConnector = () => {
  // Get the list of wallets
  const { wallets } = useConfig();
  const { connect, disconnect, connected } = useConnect();

  if (connected) {
    return <button onClick={disconnect}>Disconnect</button>;
  }

  return wallets.map((wallet) => (
    <div key={wallet.options.wallet_name}>
      <button
        onClick={() => {
          connect(wallet.options.wallet_name);
        }}
      >
        <img
          src={wallet.logoLight}
          alt={wallet.options.pretty_name}
          height="48px"
          width="48px"
        />
      </button>

      {!wallet.injected ? (
        <a
          href={
            wallet.options.platforms && wallet.options.platforms.length > 0
              ? wallet.options.platforms[0].install_link
              : "#"
          }
          target="_blank"
        >
          Install
        </a>
      ) : null}
    </div>
  ));
};