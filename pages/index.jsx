import Head from "next/head";
import Login from "../components/Login";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { getSession, useSession } from "next-auth/react";
import { db } from '@/firebase'

import { collection, orderBy, query, getDocs } from "firebase/firestore";


export default function Home({posts}) {
  const {data: session} = useSession();
  if (!session) return (<Login />);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook - Zaitoun</title>
      </Head>
      <Header />

      <main className="flex">
        <Sidebar />

        <Feed posts={posts} />

        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const posts= await getDocs(query(collection(db, "posts"), orderBy("timestamp", "desc")));


  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session: await getSession(context),
      posts: docs,
    },
  };
}