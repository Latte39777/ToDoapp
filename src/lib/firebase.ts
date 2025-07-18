import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

interface firebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const initializeFirebaseApp = async () => {
  if (getApps().length) {
    return getApp();
  }

  try {
    // デプロイ環境では、このURLから自動で設定を読み込む
    const response = await fetch("/__/firebase/init.json");
    const firebaseConfigProd = await response.json();
    return initializeApp(firebaseConfigProd);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    console.log("本番環境用の設定読み込みに失敗。ローカル環境で起動します。");
    return initializeApp(firebaseConfig);
  }
};

const app = await initializeFirebaseApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
