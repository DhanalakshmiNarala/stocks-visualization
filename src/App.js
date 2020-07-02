import React, { useState, useEffect } from "react";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";
// import { getCompanyNames } from "./inputData";
import LineChart from "./LineChart";

// export default function App() {
//   const [companyNames, setCompanyNames] = useState({});
//
//   useEffect(() => {
//     getCompanyNames().then((names) => {
//       console.log("Company names called");
//       console.log(names);
//       setCompanyNames(names);
//     });
//   }, []);
//
//   return (
//     <div>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">Stocks Visualization</Typography>
//         </Toolbar>
//       </AppBar>
//
//       <h3>Select stock name (company name): </h3>
//       <FormControl>
//         <InputLabel htmlFor="company-name-native-simple">
//           Company Name
//         </InputLabel>
//         <Select
//           native
//           value={10}
//           inputProps={{
//             name: "company-name",
//             id: "company-name-native-simple",
//           }}
//         >
//           <option aria-label="None" value="" />
//           <option value={"AAL"}>AAL</option>
//           <option value={"S & P"}>S&P</option>
//           <option value={"dell"}>dell</option>
//         </Select>
//       </FormControl>
//
//       <h3>Select the time frame: </h3>
//       <Button>Time frame</Button>
//     </div>
//   );
// }

export default function App() {
  return <LineChart />;
}
