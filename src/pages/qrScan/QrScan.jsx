import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader'
import './qrScan.scss';

function QrScan() {
  const containerStyle = {
	};
  const videoContainerStyle = {
		height: 240,
		width: 320,
	};
  const videoStyle = {
		height: 240,
		width: 320,
	};

  const [result, setResult] = useState('No result');

  return (
    <div className="qrPage">
			<QrReader
      constraints={{facingMode: { exact: "user" }}}
      scanDelay={2000}
      containerStyle={{ width: '100%'}}
      onResult={(result, error) => {
        console.log("you got something on as result", result);
        if (!!result) {
          setResult(result?.text);
        }
        if (!!error) {
          // console.info(error);
        }
      }}
			/>
		</div>
  )
}

export default QrScan