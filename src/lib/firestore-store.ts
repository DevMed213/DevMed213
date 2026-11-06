import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export async function readCollection<T>(name: string): Promise<T[]> {
  const snapshot = await getDocs(collection(getDb(), name));
  return snapshot.docs.map((item) => item.data() as T);
}

export async function syncCollection<T extends { id?: string; slug?: string }>(name: string, items: T[]) {
  const database = getDb();
  const snapshot = await getDocs(collection(database, name));
  const ids = new Set(items.map((item) => item.id || item.slug).filter(Boolean));

  await Promise.all([
    ...items.map((item) => {
      const id = item.id || item.slug;
      if (!id) return Promise.resolve();
      return setDoc(doc(database, name, id), item);
    }),
    ...snapshot.docs.filter((item) => !ids.has(item.id)).map((item) => deleteDoc(item.ref)),
  ]);
}
