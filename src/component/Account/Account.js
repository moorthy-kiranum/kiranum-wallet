import { useState, useEffect } from "react";
import { LAMPORTS_PER_SOL ,PublicKey} from "@solana/web3.js";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import * as tokenService from "../../service/wallet/wallet-service";
import * as util from "../../utils/util";

import ContentPasteTwoToneIcon from "@mui/icons-material/ContentPasteTwoTone";

import { AlertBox } from "../AlertBox";

export const Account = (props) => {
	console.log(props);
	//handling user info
	const [account, setAccount] = useState(props.data.account);
	const [balance, setBalance] = useState(props.data.balance);

	//handling button state
	const [isReqAirdrop, setIsReqAirdrop] = useState(false);
	const [isTransfering, setIsTransfering] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);

	const [alert, setAlert] = useState(null);
	const [isNewAlert, setIsNewAlert] = useState(false);

	// handle sol transfer
	const [reciptentKey, setReciptentKey] = useState(null);
	const [lamToSend, setLamToSend] = useState(0);

	useEffect(() => {
		setTimeout(() => setIsReqAirdrop(false), 5000);
	}, [balance]);

	const addAccountFromSeed = async () => {
		// console.log("Creating Account...");
		// const acc = await tokenService.addAccountFromSeed([]);
		// setAccount(acc);
		// getBalance(account?.publicKey);
		// console.log("Account Created...");
	};

	const airDrop = async () => {
		setIsReqAirdrop(true);
		const signature = await tokenService.makeAirdrop(account.publicKey);
		props.func.setSignature((e) => [...e, signature]);
		console.log(signature);
		getBalance();
		console.log("Airdroped...");
	};

	const getBalance = async () => {
		console.log("Fetching Balance...");
		props.func.setIsLoading(true);
		let lamports = await tokenService.getBalance(account?.publicKey);
		const sol = lamports / LAMPORTS_PER_SOL;
		setBalance(sol.toFixed(4));
		props.func.setIsLoading(false);
		console.log("Fetched Balance...");
	};

	const sendSol = async () => {
		console.log("Transfering Sol...");
		setIsTransfering(true);
		if (lamToSend) {
			let sign = await tokenService.sendSol(
				account?.keyPair,
				reciptentKey,
				lamToSend
			);
			getBalance();
            getTransactionDetails(sign);
			props.func.setSignature((e) => [...e, sign]);
		}
		setIsTransfering(false);
		console.log("Transfered Sol...");
	};

	const getTransactionDetails = async (signature) => {
		const transaction = await tokenService.getTransactionDetails(signature);
        const fee = transaction.meta.fee / LAMPORTS_PER_SOL;
        console.log(fee);
        console.log(transaction);
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const successAlert = (msg) => {
		// setIsNewAlert(false);
		setAlert({
			severnity: "success",
			message: msg,
		});
		setIsNewAlert(true);
	};

	const handleClipBoard = () => {
		util.copyTextToClipBoard(account?.publicKey.toString());
		successAlert("Public key copied to clipboard");
	};

	const handleSecretKeySave = () => {
		console.log(account?.secretKey);
		util.downloadFile(account?.secretkey);
	};


	let address;

	if(account){
   		const addressKeyPair = new PublicKey(account.publicKey)
			address = addressKeyPair.toBase58();
			console.log("address", address);
			// tokenService.getTokensByAccount(account.publicKey);
	}

	useEffect(() => {
		getBalance();
	}, []);

	return (
		<div>
			{isNewAlert && <AlertBox message={alert} />}
			<Grid variant="outlined" m={1} sx={{ p: 2 }}>
				<Grid container spacing={1} direction="column">
					<Typography sx={{ overflow: "hidden", border: 1 }}>
						{address}
						<Button
							startIcon={<ContentPasteTwoToneIcon />}
							onClick={handleClipBoard}
						/>
					</Typography>
					<Typography>
						Balance: {balance} <b>SOL</b>
					</Typography>
				</Grid>

				<Grid
					container
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={{ "& button": { m: 1 } }}
				>
					<LoadingButton
						spacing={1}
						variant="contained"
						loading={isReqAirdrop}
						disabled={isReqAirdrop}
						onClick={airDrop}
					>
						AirDrop
					</LoadingButton>
				</Grid>
				<Grid>
					<TextField
						id="outlined-basic"
						label="Enter Reciptent Wallet Public Key"
						fullWidth
						size="small"
						variant="outlined"
						sx={{ mr: 1, mt: 1 }}
						onChange={(e) => {
							setReciptentKey(e.target.value);
						}}
					/>
					<TextField
						id="outlined-basic"
						label="Enter sols to send"
						fullWidth
						size="small"
						variant="outlined"
						sx={{ mr: 1, mt: 1 }}
						onChange={(e) => {
							let sol = e.target.value;
							setLamToSend(sol * LAMPORTS_PER_SOL);
						}}
					/>
					<LoadingButton
						spacing={1}
						variant="contained"
						disabled={isTransfering}
						loading={isTransfering}
						onClick={sendSol}
						sx={{ m: 1 }}
					>
						Send
					</LoadingButton>
					{/* <LoadingButton
						spacing={1}
						variant="contained"
						disabled={isTransfering}
						onClick={addAccountFromSeed()}
						sx={{ m: 1 }}
					>
						Add
					</LoadingButton> */}
				</Grid>
			</Grid>
		</div>
	);
};
