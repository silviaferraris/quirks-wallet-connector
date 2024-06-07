import { broadcast, sign } from "@quirks/store";

const sendTokens = async (amountInMicro, recipient, address, setSuccessMessage, setErrorMessage, setTxHash) => {
    const cosmos = (await import('osmojs')).cosmos;
    const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;
  
    const msg = send({
      amount: [
        {
          denom: 'uosmo',
          amount: amountInMicro.toString(),
        },
      ],
      toAddress: recipient,
      fromAddress: address,
    });
  
    try {
      const txRaw = await sign('osmosis', [msg]);
      const res = await broadcast('osmosis', txRaw);
      console.log(res);
      setSuccessMessage("Transaction successful!");
      setErrorMessage("");
      setTxHash(res.transactionHash);
    } catch (error) {
      setErrorMessage("Transaction failed. Please try again.");
      console.error(error);
    }
  };
  
  export default sendTokens;
  