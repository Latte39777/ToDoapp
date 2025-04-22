// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { auth, db } from "../../lib/firebase";

// const addTodo = () => {
//   const user = auth.currentUser;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "todos"), {
//         title,
//         description,
//         completed: false,
//         userid: user.uid,
//         createAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });
//       setTitle("");
//       setDescription("");
//     } catch (error) {
//       console.error("登録失敗", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="タイトル"
//         className="rounded-md border-2 border-black p-2"
//       />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="説明"
//         className="rounded-md border-2 border-black p-2"
//       />
//       <button type="submit" className="rounded-md border-2 border-black p-2">
//         追加
//       </button>
//     </form>
//   );
// };

// export default addTodo;
