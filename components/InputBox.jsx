import { useSession } from "next-auth/react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { collection, addDoc, updateDoc, setDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { query } from "firebase/firestore";
import firebase from "firebase/compat/app";
import firestore from "firebase/compat/firestore";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadString,
} from "firebase/storage";
const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    addDoc(collection(db, "posts"), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then((docRef) => {
      if (imageToPost) {
        const storageRef = ref(storage, `posts/${docRef.id}`);
        uploadString(storageRef, imageToPost, "data_url").then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            setDoc(doc(db, "posts", docRef.id), { postImage: url }, { merge: true });
          });
        });

        inputRef.current.value = "";
        setImageToPost(null);
      }
    });
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />

        <form className="flex flex-1">
          <input
            ref={inputRef}
            className=" rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`what is on your mind, ${session.user.name}?`}
          />
          <button className="hidden" type="submit" onClick={sendPost}>
            submit
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105"
            onClick={removeImage}>
            <img
              src={imageToPost}
              className="h-10 object-contain"
              alt="selected image"
            />
            <p className="text-xs text-red-500 text-center cursor-pointer">
              Remove
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filePickerRef.current.click()}>
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            type="file"
            hidden
            onChange={addImageToPost}
            ref={filePickerRef}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
