import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Router from "./routes";
import { getAlluserData } from "./action/userActions";
import {getAllArtistData} from "./action/artistActions"
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";

// ----------------------------------------------------------------------

export default function App() {
 

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
