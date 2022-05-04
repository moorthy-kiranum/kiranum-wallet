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
// import { createMint } from '@solana/spl-token';

const INT_BAL = 0;
const SEED_PHARSE =
	"water add october bulb siege ozone thunder surge scan auction post ordinary";
const CONST_SECRET_KEY =
	"oSEu38GxfcjeL2Bu3zfWFPYxw5arHM1DRrjoUK5hrZGF5g1ikiFBGS5BSBpA63y84EkJ8TJQCRYma19cnLx9evy";
export const createConnection = async () => {
	return new Connection(clusterApiUrl("devnet"), "confirmed");
};

export const createAccount = async () => {
	const keyPair = Keypair.generate();
	const bal = await getBalance(keyPair.publicKey);
	return {
		keyPair: keyPair,
		publicKey: keyPair.publicKey,
		secretKey: keyPair.secretKey,
		balance: bal,
	};
};

export const addAccountFromSeed = async (seed) => {
	const KPL_SEED = [
		"water",
		"add",
		"october",
		"bulb",
		"siege",
		"ozone",
		"thunder",
		"surge",
		"scan",
		"auction",
		"post",
		"ordinary",
	];

	const keyPair = Keypair.fromSeed(KPL_SEED);
	const bal = await this.getBalance(keyPair.publicKey);
	return {
		keyPair: keyPair,
		publicKey: keyPair.publicKey,
		secretKey: keyPair.secretKey.subarray,
		balance: bal,
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