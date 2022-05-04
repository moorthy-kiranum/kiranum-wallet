import { useState, useEffect } from "react";
import { Grid, Card } from "@mui/material";
import {
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import "./Home.css";

import { Header } from "./Header/Header";
import { Navbar } from "./Navbar/Navbar";
import { Account } from "./Account/Account";
import { Transaction } from "./Transaction/Transaction";

import * as tokenService from "../service/wallet/wallet-service";
import { Settings } from "./Settings/Settings";

export function Home() {

	const navigate = useNavigate();

	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(0);
	const [signature, setSignature] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const createAccount = async () => {
		console.log("Creating Account...");
		const acc = await tokenService.addAccountFromSeed();
		setAccount(acc);
		console.log("Account Created...");
	};

	const getBalance = async () => {
		console.log("Fetching Balance...");
		let lamports = await tokenService.getBalance(account?.publicKey);
		const sol = lamports / LAMPORTS_PER_SOL;
		setBalance(sol.toFixed(4));
		console.log("Fetched Balance...");
	};

	const addAccount = async () =>{
		console.log("Creating Account...");
		const acc = await tokenService.addAccountFromSeed();
		setAccount(acc);
		console.log(acc);
		console.log("Account Created...");
	}

	useEffect(() => {
		createAccount();
	}, []);

	useEffect(() => {
		if (account?.publicKey) {
			navigate("/account");
			setIsLoading(false);
		}
	}, [account]);
	return (
		<div class="home">
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				sx={{ m: 1 }}
			>
				<Header isLoading={isLoading} />
					<Card
						container
						sx={{
							minWidth: 700,
							minHeight: 300,
						}}
					>
						<Routes>
							<Route
								exact
								path="/account"
								element={
									<Account data={{account:account}} func={{setSignature, getBalance , setIsLoading}} />
								}
							/>
							<Route
								exact
								path="/transaction"
								element={<Transaction signature={signature} />}
							/>
							<Route
								exact
								path="/settings"
								element={<Settings signature={signature} />}
							/>
						</Routes>
					</Card>
				<Navbar />
			</Grid>
		</div>
	);
}
