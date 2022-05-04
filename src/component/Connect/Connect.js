import { useState, useEffect } from "react";
import {
	Card,
	Grid,
	Typography,
	TextField,
	List,
	ListSubheader,
	ListItemText,
	Modal,
	Button,
	CardHeader,
	CardContent,
	Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import NavigateNextSharpIcon from "@mui/icons-material/NavigateNextSharp";
import ContentPasteTwoToneIcon from "@mui/icons-material/ContentPasteTwoTone";
import * as tokenService from "../service/wallet/wallet-service";
import * as util from "../utils/util";
import { AlertBox } from "./AlertBox";
export function Connect() {
	const LAMPORTS_PER_SOL = 1000000000;

	//handling user info
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(0);
	//handling button state
	const [isReqAirdrop, setIsReqAirdrop] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);
	const [signature, setSignature] = useState([]);
	const [alert, setAlert] = useState(null);
	const [isNewAlert, setIsNewAlert] = useState(false);

	const  successAlert = (msg) => {
		// setIsNewAlert(false);
		setAlert({
			severnity:"success",
            message:msg
		});
		setIsNewAlert(true);
	}

	// handle sol transfer
	const [reciptentKey, setReciptentKey] = useState(null);
	const [lamToSend, setLamToSend] = useState(0);

	const createAccount = async () => {
		console.log("Creating Account...");
		const acc = await tokenService.createAccount();
		setAccount(acc);
		handleOpenModal();
		console.log("Account Created...");
	};

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};



	const handleClipBoard = () => {
		util.copyTextToClipBoard(account?.publicKey.toString());
		successAlert("Public key copied to clipboard");
	};


    const handleSecretKeySave = () =>{
        console.log(account?.secretKey);
        util.downloadFile(account?.secretkey);
    }

	useEffect(() => {
		// createAccount();
	}, []);

	useEffect(() => {
		setTimeout(() => setIsReqAirdrop(false), 5000);
	}, [balance]);

	return (
		<div>
            {isNewAlert && <AlertBox message={alert}/>}
			<Modal open={isModalOpen} onClose={handleCloseModal}>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "100vh" }}
				>
					<Card
						sx={{
							minWidth: 385,
							bgcolor: "background.default",
						}}
					>
						<CardHeader  title="New Wallet" />
						<CardContent>
							<Stack spacing={1} sx={{ mt: 1 }} direction="column">
								<Grid>
									PUBLIC KEY
									<Typography sx={{ overflow: "scroll", border: 1 }}>
										{account?.publicKey.toString()}
										<Button
											startIcon={<ContentPasteTwoToneIcon />}
											onClick={handleClipBoard}
										/>
									</Typography>
								</Grid>
								<Grid container spacing={0} sx={{ "& button": { m: 1 } }}>
									<Button endIcon={<DownloadSharpIcon />} variant="outlined" onClick={handleSecretKeySave}>
										Secret Key
									</Button>
									<Button
										endIcon={<NavigateNextSharpIcon />}
										variant="outlined"
									>
										Continue
									</Button>
									<Button
										endIcon={<CloseSharpIcon />}
										variant="outlined"
										onClick={handleCloseModal}
									>
										close
									</Button>
								</Grid>
							</Stack>
						</CardContent>
					</Card>
				</Grid>
			</Modal>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ mt: 1 }}
			>
				<Grid
					container
					spacing={0}
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: 1,
						minWidth: 300,
						minHeight: 300,
						"& Button": { m: 1, width: 100 },
					}}
				>
					<Button variant="contained"> Connect</Button>
					<Button variant="contained" onClick={createAccount}>
						{" "}
						Create{" "}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
