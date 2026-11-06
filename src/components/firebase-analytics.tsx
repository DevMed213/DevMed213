"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import { useEffect } from "react";
import { getFirebaseApp } from "@/lib/firebase";

export function FirebaseAnalytics() {
  useEffect(() => {
    isSupported()
      .then((supported) => {
        if (supported) getAnalytics(getFirebaseApp());
      })
      .catch(() => undefined);
  }, []);

  return null;
}
