/* @refresh reload */
import { lazy } from "solid-js";
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Home from "./App";

const root = document.getElementById("root");

const Alkane = lazy(() => import("./pages/Alkane"));
const Block = lazy(() => import("./pages/Block"));
const Txn = lazy(() => import("./pages/Txn"));
const Wallet = lazy(() => import("./pages/Wallet"));

render(
  () => (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/alkane/:alkaneId" component={Alkane} />
      <Route path="/block/:blockNumber" component={Block} />
      <Route path="/txn/:txnId" component={Txn} />
      <Route path="/wallet/:address" component={Wallet} />
    </Router>
  ),
  root!
);
