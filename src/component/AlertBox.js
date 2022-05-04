import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertBox(props) {
	const [open, setOpen] = useState(true);
	const [data] = useState(props.message);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div>
			<Snackbar
				open={open}
				TransitionComponent={Transition}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={data.severnity}
					sx={{ width: "100%" }}
				>
					{data.message}
				</Alert>
			</Snackbar>
		</div>
	);
}
