export const copyTextToClipBoard = (text) => {
	navigator.clipboard.writeText(text);
	console.log(text);
};

export const downloadFile = (secretKey) => {
    let string ="[";
    secretKey.u.forEach(element => {
        string+=element;
        string+=",";
    });
	var file = new Blob(string, { type: ".txt" });
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(file, "secret-key");
	} else {
		const elem = window.document.createElement("a");
		elem.href = window.URL.createObjectURL(file);
		elem.download = "secret-key";
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
};
