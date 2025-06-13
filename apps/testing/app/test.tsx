"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("@codesfromshad/trpc-explorer/App"), { ssr: false });

export default App;
