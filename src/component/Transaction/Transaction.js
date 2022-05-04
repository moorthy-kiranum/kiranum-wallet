import {
	Grid,
	TextField
} from "@mui/material";

export const Transaction = (props) => {
	let signature = props.signature;
	return (
		<Grid variant="outlined" m={1} sx={{ p: 2,overflowY:"scroll", }}>
			<Grid direction="row" sx={{
                overflowY:"hidden"
            }}>
				{
					signature.length===0 && <div>No Recent Transaction</div>
				}
				{signature.length>0 && signature.map((e, i) => {
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
