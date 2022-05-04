import {
	Grid,
	TextField
} from "@mui/material";

export const Transaction = (props) => {
	let signature = props.signature;
    console.log(props)
	return (
		<Grid variant="outlined" m={1} sx={{ p: 2,overflowY:"scroll", }}>
			<Grid direction="row" sx={{
                overflowY:"hidden"
            }}>
				{signature.map((e, i) => {
					return (
						<TextField
							id="outlined-basic"
							fullWidth
							size="small"
							variant="outlined"
							sx={{ mr: 1, mt: 1 }}
							value={e}
							disabled
						/>
					);
				})}
			</Grid>
		</Grid>
	);
};
