import { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";

import { Card, BottomNavigation, BottomNavigationAction } from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SettingsIcon from "@mui/icons-material/Settings";

export const Navbar = () => {
	let navigate = useNavigate();
    const [page, setPage] = useState(0);
    const handleNavigation = (index) =>{
        setPage(index);
        switch (index) {
            case 0:
                navigate("/account");
                break;
            case 1:
                navigate("/transaction");
                break;
            case 2:
                navigate("/settings");
                
                break;
            default:
                break;
        }
    }

	return (
		<Card sx={{ width: "100%" }}>
			<BottomNavigation
				color="primary"
                value={page}
				sx={{ border: "1px solid primary" }}
				showLabels
				// value={value}
				// onChange={(event, newValue) => {
				// 	setValue(newValue);
				// }}
				onChange={(event,newValue) => {
					handleNavigation(newValue);
				}}
			>
				<BottomNavigationAction
					color="primary"
					sx={{ color: "primary" }}
					label="Account"
					icon={<MonetizationOnIcon />}
				/>
				<BottomNavigationAction
					color="primary"
					label="Transactions"
					icon={<CurrencyExchangeIcon />}
				/>
				<BottomNavigationAction
					color="primary"
					label="Settings"
					icon={<SettingsIcon />}
				/>
			</BottomNavigation>
		</Card>
	);
};
