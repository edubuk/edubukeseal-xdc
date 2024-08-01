import * as csv from '@fast-csv/parse';
import fs from 'fs';
import yauzl from 'yauzl';
import { s3 } from '../server';

const unzipAll = async (zipFileName) => {
	yauzl.open(
		`uploads/${zipFileName}`,
		{ lazyEntries: true },
		function (err, zipfile) {
			if (err) {
				throw err;
			}

			zipfile.readEntry();
			zipfile.on('entry', function (entry) {
				if (
					/\/$/.test(entry.fileName) ||
					String(entry.fileName).includes('/')
				) {
					// console.log('Wrong File Name: ' + entry.fileName);
					zipfile.readEntry();
					// Directory file names end with '/'.
					// Note that entries for directories themselves are optional.
					// An entry's fileName implicitly requires its parent directories to exist.
					// throw new Error('Directory found, expected file');
				} else {
					zipfile.openReadStream(entry, async function (err, readStream) {
						if (err) throw err;
						readStream.on('end', function () {
							zipfile.readEntry();
						});
						// const newF = fs.writeFileSync(`uploads/unzip/${Date.UTC(Date.now())}.pdf`);
						// if (!/\W/.test(entry.fileName)) {
						const name = entry.fileName;
						console.log(entry.fileName);
						const newFile = fs.createWriteStream(`uploads/unzip/${name}`);
						readStream.pipe(newFile);
						// }
					});
				}
			});
		},
	);
};

const getCSVData = (csvFileName) => {
	let data = [];
	let totalRows = 0;
	const datafile = csv.parseFile(`uploads/${csvFileName}`, {
		headers: true,
	});

	datafile.on('data', function (row) {
		console.log(row);
		data = [...data, row];
	});

	datafile.on('end', function (rowCount) {
		console.log('Total rows: ' + rowCount);
		totalRows = rowCount;
		return { data, totalRows };
	});

	datafile.on('error', function (err) {
		console.log(err.message);
	});
};

const uploadData = (data, witness) => {
	console.log('Data Upload : ' + JSON.stringify(data));
	
};

export const bulkUploadProcess = async (req, res) => {};
