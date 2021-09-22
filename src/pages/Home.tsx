import React, { useState, useCallback } from "react";
import { cameraPreviewOptions } from "@/utils/constants";
import { barcodeReaderHandler } from "@/utils/barcodeReader";
import { CameraPreview } from "@capacitor-community/camera-preview";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonFabButton,
  IonIcon,
  IonRow,
  IonCol,
} from "@ionic/react";
import { cameraReverseOutline, closeCircleOutline } from "ionicons/icons";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showScanBtn, setShowScanBtn] = useState(true);

  const onScanHanlder = useCallback(() => {
    setLoading(true);

    CameraPreview.start(cameraPreviewOptions)
      .then(() => {
        const videoElement = document.getElementById(
          "video"
        ) as HTMLVideoElement;

        const playPromise = videoElement.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            setLoading(false);
            setShowScanBtn(false);
            barcodeReaderHandler(
              playPromise,
              videoElement,
              CameraPreview,
              setShowScanBtn
            );
          });
        } else {
          console.log("playPromise is undefined");
        }
      })
      .catch((err) => console.log("Error camera preview: ", err));
  }, []);

  const onCancelHanlder = useCallback(() => {
    CameraPreview.stop();
    setShowScanBtn(true);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Reader Application made by Hiroshi Egawa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-margin">
        {loading ? (
          <IonButton style={{ zIndex: "99999" }} onClick={onScanHanlder}>
            Please give us a sec
          </IonButton>
        ) : (
          <IonRow>
            <IonCol size="6" size-md>
              <IonFabButton
                onClick={showScanBtn ? onScanHanlder : onCancelHanlder}
              >
                <IonIcon
                  icon={showScanBtn ? cameraReverseOutline : closeCircleOutline}
                />
              </IonFabButton>
            </IonCol>
          </IonRow>
        )}
        <IonContent id="content" className="content-camera-preview" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
