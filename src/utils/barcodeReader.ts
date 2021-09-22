import Swal from "sweetalert2";
import { BrowserQRCodeReader } from "@zxing/browser";
import { CameraPreviewWeb } from "@capacitor-community/camera-preview";
import { api } from "@/utils/api";

export const barcodeReaderHandler = (
  playPromise: Promise<void>,
  videoElement: HTMLVideoElement,
  CameraPreview: CameraPreviewWeb,
  setShowScanBtn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  playPromise.then(() => {
    const codeReader = new BrowserQRCodeReader();
    codeReader
      .decodeFromVideoDevice(
        undefined,
        videoElement,
        async (result, error, controls) => {
          // Not found
          if (error) return;

          // Scan barcode
          if (result) {
            const res = await api.post("/decoded", {
              text: result.getText(),
            });

            if (res.status === 200) {
              Swal.fire({
                title: "Decoded Text",
                text: res.data.decodedMsg,
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error Decoded",
                text: "Something wrong!",
                icon: "error",
              });
            }

            // Stop camera preview
            CameraPreview.stop();

            // Stop scan
            controls.stop();

            // Set Show Scan State
            setShowScanBtn(true);
          }
        }
      )
      .catch((err) => console.log("Error barcodeReaderHandler: ", err));
  });
};
