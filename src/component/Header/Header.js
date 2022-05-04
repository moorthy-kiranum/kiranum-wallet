import { AppBar, Toolbar, Typography } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

export const Header = (props) => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Kiranum
				</Typography>
			</Toolbar>
			{props.isLoading && <LinearProgress />}
		</AppBar>
	);
};
