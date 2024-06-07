import { broadcast, getAddress, sign } from "@quirks/store";

export const SendToken = async (recipientAddress: string, amount: any) => {
  const cosmos = (await import("osmojs")).cosmos;
  const { send } = cosmos.bank.v1beta1.MessageComposer.withTypeUrl;

  const senderAddress = getAddress("osmosis");

  const msg = send({
    amount: [
      {
        denom: "juno",
        amount: amount.toString(),
      },
    ],
    toAddress: recipientAddress,
    fromAddress: senderAddress,
  });

  const txRaw = await sign("osmosis", [msg]);

  const res = await broadcast("osmosis", txRaw);

  return res;
};