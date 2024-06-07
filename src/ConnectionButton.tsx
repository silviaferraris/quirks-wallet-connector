import {
  Button,
  Card,
  CardContent,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { useChain, useConnect } from "@quirks/react";
import { getAddress, getSigningCosmWasmClient } from "@quirks/store";
import { useEffect, useState } from "react";
import sendTokens from "./sendTokens";
import { useStyles } from "./style";

export const ConnectionButton = () => {
  const classes = useStyles();
  const { connect, disconnect, connected } = useConnect();
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { chain } = useChain("osmosis");
  const [successMessage, setSuccessMessage] = useState("");
  const [txHash, setTxHash] = useState(""); // Stato per memorizzare la transaction hash

  useEffect(() => {
    if (connected) {
      const chainName = "osmosis";
      const signer = getSigningCosmWasmClient(chainName, "auto");

      setAddress(getAddress(chainName));

      signer.then((client) => {
        client.getBalance(address, "uosmo").then((balance) => {
          setBalance(Number(balance.amount) / 1000000);
        });
      });
    }
  }, [connected, address]);

  const handleSendTokens = async () => {
    const amountInMicro = Number(amount) * 1000000;

    if (amountInMicro > balance * 1000000) {
      setErrorMessage("Insufficient funds.");
      return;
    }

    sendTokens(
      amountInMicro,
      recipient,
      address,
      setSuccessMessage,
      setErrorMessage,
      setTxHash
    );
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          {connected ? (
            <div>
              <Typography variant="h6">Chain ID: {chain.chain_id}</Typography>
              <Typography variant="h6">Address: {address}</Typography>
              <Typography variant="h6">Balance: {balance} OSMO</Typography>
              <div className={classes.progressBarContainer}>
                <div
                  className={classes.progressBar}
                  style={{ width: `${(balance / 100) * 100}%` }}
                ></div>
              </div>
              <TextField
                label="Recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                fullWidth
                className={classes.textField}
              />
              <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                fullWidth
                className={classes.textField}
              />
              {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
              )}
              {txHash && (
                <Typography variant="body1">
                  Transaction Hash: {txHash}
                </Typography>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={disconnect}
                  className={classes.textField}
                >
                  Disconnect
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendTokens}
                  className={classes.textField}
                >
                  Send Tokens
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <Typography variant="h6">
                Please, connect to your wallet to send tokens on the Osmosis
                Testnet!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => connect("keplrextension")}
              >
                Connect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage}
      />
    </div>
  );
};
