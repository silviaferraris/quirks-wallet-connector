import { useConnect } from "@quirks/react";
import { getAddress, getSigningCosmWasmClient } from "@quirks/store";
import { useEffect, useState } from "react";
import {SendToken} from "./SendToken";

export const ConnectionButton = () => {
  const { connect, disconnect, connected, wallet} = useConnect();
  const [balance, setBalance] = useState("");

  /* const recipientAddress = ""; */

  useEffect(() => {

    console.log(connected);

    if (connected) {
      const chainName = "osmosis";
      const signer = getSigningCosmWasmClient(chainName, "auto");
      const address = getAddress(chainName);
      signer.then(client => {
        client.getBalance(address, "uosmo").then(balance => {
          setBalance(balance.amount);
        })
      })

/*       const sent = SendToken(recipientAddress.toUpperCase(), 1);
      sent.then(res => console.log(res)); */

    }

  }, [connected])
  
  if (connected) {
    
    return <button onClick={disconnect}>{balance}</button>;
  }

  return <button onClick={() => connect("keplrextension")}>Connect</button>;
};