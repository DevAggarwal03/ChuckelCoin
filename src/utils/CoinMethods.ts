import { Account, AccountAddress, AccountAddressInput, Aptos, AptosConfig, Ed25519PrivateKey, GetOwnedTokensResponse, Network } from "@aptos-labs/ts-sdk";
import { useWallet, InputTransactionData } from "@aptos-labs/wallet-adapter-react";


const APTOS_NETWORK: Network =  Network.DEVNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);
const privateKey = import.meta.env.VITE_ACC_PRIVATE_KEY
const edPrivateKey = new Ed25519PrivateKey(privateKey);
const CoinTypeAddress = AccountAddress.from(import.meta.env.VITE_ACC_ADDRESS)
const accFromPrivateKey = Account.fromPrivateKey({privateKey: edPrivateKey, address: CoinTypeAddress})


export const getBalance = async (accountAddress: AccountAddress) => {
    aptos.getAccountCoinAmount({
        accountAddress: accountAddress,
        coinType: `${CoinTypeAddress.toString()}::chuckel::Chuckel`,
    })
}


// used to register the receiever account to recieve new coin (siner req to be the owner of the module to which the contract is deployed)
export const registerCoin = async () : Promise<string> => {
    const transaction = await aptos.transaction.build.simple({
        sender: accFromPrivateKey.accountAddress,
        data: {
            function: "0x1::managed_coin::register",
            typeArguments: [`${CoinTypeAddress.toString()}::chuckel::Chuckel`],
            functionArguments: []
        }
    })

    const signedMsg = aptos.sign({signer: accFromPrivateKey, transaction});
    const pendingTxn = await aptos.transaction.submit.simple({transaction, senderAuthenticator: signedMsg})

    return pendingTxn.hash
}

export const mint = async (recieverAddress: AccountAddress, noOfTokens: number) : Promise<string> => {
    const rawTxn = await aptos.transaction.build.simple({
        sender: accFromPrivateKey.accountAddress,
        data: {
            function: "0x1::managed_coin::mint",
            typeArguments: [`${CoinTypeAddress.toString()}::chuckel::Chuckel`],
            functionArguments: [recieverAddress, noOfTokens],
        }
    })

    const signTxn = aptos.sign({signer: accFromPrivateKey, transaction: rawTxn});
    const pendingtxn = await aptos.transaction.submit.simple({transaction: rawTxn, senderAuthenticator: signTxn});

    return pendingtxn.hash
}

export const transferCoins = async (wallet: any, recieverAddress: string, noOfTokens: number) : Promise<any> => {
    // const rawTxn = await aptos.transaction.build.simple({
    //     sender: CoinTypeAddress,
    //     data: {
    //         function: "0x1::aptos_account::transfer_coins",
    //         typeArguments: [`${CoinTypeAddress.toString()}::chuckel::Chuckel`],
    //         functionArguments: [recieverAddress, noOfTokens]
    //     }
    // })

    // const signedTxn = aptos.sign({signer: accFromPrivateKey, transaction: rawTxn})
    // const pendingTxn = await aptos.transaction.submit.simple({transaction: rawTxn, senderAuthenticator: signedTxn})

    // return  pendingTxn.hash
    const txdata: InputTransactionData = {
        data: {
            function: "0x1::aptos_account::transfer_coins",
            typeArguments: [`${CoinTypeAddress.toString()}::chuckel::Chuckel`],
            functionArguments: [recieverAddress, noOfTokens],
        }
    }

    const response = await wallet.signAndSubmitTransaction(txdata);
    return response
}
