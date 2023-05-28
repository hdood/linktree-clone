export default (
	name: string,
	email: string,
	phone: string,
	address: string
) => {
	const makeVCardVersion = () => `VERSION:3.0`;

	let vcard = `BEGIN:VCARD
${makeVCardVersion()}
${makeVCardName(name)}
${makeVCardEmail(email)}
${makeVCardTel(phone)}
${makeVCardAdr(address)}
${makeVCardTimeStamp()}
END:VCARD`;
	downloadToFile(vcard, "vcard.vcf", "text/vcard");
};

function downloadToFile(
	content: string,
	filename: string,
	contentType: string
) {
	const a = document.createElement("a");
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}

const makeVCardName = (name: string) => `FN:${name}`;
const makeVCardTel = (phone: string) => `TEL;TYPE=WORK,VOICE:${phone}`;
const makeVCardAdr = (address: string) => `ADR;TYPE=WORK,PREF:;;${address}`;
const makeVCardEmail = (email: string) => `EMAIL:${email}`;
const makeVCardTimeStamp = () => `REV:${new Date().toISOString()}`;
