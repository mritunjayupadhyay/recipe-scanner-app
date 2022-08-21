import React, { useState, useEffect, useRef} from 'react';
import QrScanner from 'qr-scanner';
import './qrScan.scss';
import { navigationRouter } from '../../helpers/navigation-router';


function BasicQrScan() {
    const videoRef = useRef();
    const overlayRef = useRef();

	const [scanner, setScanner] = useState(null);
	const [hasScan, setHasScan] = useState(false);
    const handleScanData = (data) => {
        if (!data) return;
        if (data.includes('/')) {
            const dataArr = data.split('/');
            const recipeId = dataArr[dataArr.length-1];
            navigationRouter.navigate(`/recipe/${recipeId}`);
        }
    }
	useEffect(() => {
		const scan = new QrScanner(videoRef.current, (result) => {
			setHasScan(true);
            console.log("it have scanned the result", result);
			if (result?.data) {
                handleScanData(result.data);
            }
			scanner.pause();
		}, {
            maxScansPerSecond: 1,
            highlightScanRegion: true
        });
		if (!hasScan) {
			setScanner(scanner);
			scan.start();
		}

		return () => {
			scanner && scanner.destroy();
		};
	}, [scanner, hasScan]);

	return (
		<div className="scanner__wrapper">
            <p>Scan Here to Get Details</p>
			<video
				className={'scanner' + (hasScan ? ' scanner__scanned' : '')}
				ref={videoRef}
			></video>
		</div>
	);
}

export default BasicQrScan