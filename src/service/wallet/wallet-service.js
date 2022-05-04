import {
	clusterApiUrl,
	Connection,
	Transaction,
	Keypair,
	LAMPORTS_PER_SOL,
	SystemProgram,
	sendAndConfirmTransaction,
	PublicKey,

} from "@solana/web3.js";

import {TOKEN_PROGRAM_ID} from "@solana/spl-token";

const CONST_SECRET_KEY =
	"oSEu38GxfcjeL2Bu3zfWFPYxw5arHM1DRrjoUK5hrZGF5g1ikiFBGS5BSBpA63y84EkJ8TJQCRYma19cnLx9evy";
export const createConnection = async () => {
	return new Connection(clusterApiUrl("devnet"), "confirmed");
};

export const createAccount = async () => {
	const keyPair = Keypair.generate();
	const bal = await getBalance(keyPair.publicKey);
	console.log(keyPair.publicKey);
	return {
		keyPair: keyPair,
		publicKey: keyPair.publicKey,
		secretKey: keyPair.secretKey,
		balance: bal,
	};
};

export const getTokensByAccount = async (publicKey) => {
	const connection = await createConnection();
	const tokenAcc = await connection.getParsedTokenAccountsByOwner(new PublicKey(publicKey), { programId: TOKEN_PROGRAM_ID });
	//const tokenAccounts = await connection.getTokenAccountsByOwner(new web3.PublicKey(address));
	console.log('token accounts');
	console.log(tokenAcc);
	const tokenAccount = tokenAcc.value[0].pubkey;
	const tokenAccountBalance = await connection.getTokenAccountBalance(new PublicKey(tokenAccount));
	console.log("tokenAccountBalance");
	console.log(tokenAccountBalance);
	return tokenAcc;
 }

export const addAccountFromSeed = async () => {

	const key = [142,239,100,185,37,125,157,136,42,222,49,116,27,242,61,61,156,176,191,186,66,36,156,32,117,115,164,118,87,210,248,26,210,140,210,161,149,252,179,45,156,239,28,53,91,120,241,5,9,213,82,236,63,174,226,203,104,244,245,90,133,249,93,181];
	const keyPair = Keypair.fromSecretKey(Uint8Array.from(key));
	console.log(keyPair.publicKey);
	console.log("new PublicKey(keyPair.publicKey)");
	console.log(new PublicKey(keyPair.publicKey));
	const addressKeyPair = new PublicKey(keyPair.publicKey)
	const address = addressKeyPair.toBase58();
	console.log("address", address);
	// const bal = await this.getBalance(keyPair.publicKey);
	return {
	   keyPair: keyPair,
	   publicKey: keyPair.publicKey,
	   secretKey: keyPair.secretKey.subarray,
	   balance: 0,
	   address: address
	};
 };

export const makeAirdrop = async (publicKey) => {
	const connection = await createConnection();
	const airdropSignature = await connection.requestAirdrop(
		publicKey,
		LAMPORTS_PER_SOL
	);
	let transfer = await connection.confirmTransaction(airdropSignature);
	console.log(transfer);
	return airdropSignature;
};

export const getBalance = async (publicKey) => {
	const connection = await createConnection();
	return connection.getBalance(publicKey, "confirmed");
};

export const sendSol = async (keyPair, toPublicKey, lamports) => {
	try {
		const connection = await createConnection();
		const to = Keypair.generate();
		console.log(to);
		const transaction = await new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: keyPair.publicKey,
				toPubkey: new PublicKey(toPublicKey),
				lamports: lamports,
			})
		);
		console.log(transaction);
		var signature = await sendAndConfirmTransaction(connection, transaction, [
			keyPair,
		]);
		console.log(signature);
		return signature;
	} catch (err) {
		console.log(err);
		throw err;
	}
};
 
export const getTransactionDetails= async(signature)=>{
	try{
		const connection = await createConnection();
		const transaction = await connection.getTransaction(signature);
		return transaction;
	} catch (err){
		throw err;
	}
}