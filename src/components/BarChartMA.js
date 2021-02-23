// import React, {useState, useEffect} from 'react';
// import {BarChart, Bar, Cell, XAxis, YAxis, Tooltip} from 'recharts';
// import {withStyles} from '@material-ui/core/styles';
// import Radio from '@material-ui/core/Radio';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
//
// const COLORS = [
//     "#ff0505", "#ff0a0a", "#ff0f0f", "#ff1414", "#ff1919",
//     "#ff1e1e", "#ff2323", "#ff2828", "#ff2d2d", "#ff3232",
//     "#ff3737", "#ff3c3c", "#ff4141", "#ff4646", "#ff4b4b",
//     "#ff5050", "#ff5555", "#ff5a5a", "#ff5f5f", "#ff6464",
//     "#ff6969", "#ff6e6e", "#ff7373", "#ff7878", "#ff7d7d",
//     "#ff8282", "#ff8787", "#ff8c8c", "#ff9191", "#ff9696",
//     "#ff9b9b", "#ffa0a0", "#ffa5a5", "#ffaaaa", "#ffafaf",
//     "#ffb4b4", "#ffb9b9", "#ffbebe", "#ffc3c3", "#ffc8c8",
//     "#ffcdcd", "#ffd2d2", "#ffd7d7", "#ffdcdc", "#ffe1e1",
//     "#ffe6e6", "#ffebeb", "#fff0f0", "#fff5f5", "#fffafa",
//     "#fafffa", "#f5fff5", "#f0fff0", "#ebffeb", "#e6ffe6",
//     "#e1ffe1", "#dcffdc", "#d7ffd7", "#d2ffd2", "#cdffcd",
//     "#c8ffc8", "#c3ffc3", "#beffbe", "#b9ffb9", "#b4ffb4",
//     "#afffaf", "#aaffaa", "#a5ffa5", "#a0ffa0", "#9bff9b",
//     "#96ff96", "#91ff91", "#8cff8c", "#87ff87", "#82ff82",
//     "#7dff7d", "#78ff78", "#73ff73", "#6eff6e", "#69ff69",
//     "#64ff64", "#5fff5f", "#5aff5a", "#55ff55", "#50ff50",
//     "#4bff4b", "#46ff46", "#41ff41", "#3cff3c", "#37ff37",
//     "#32ff32", "#2dff2d", "#28ff28", "#23ff23", "#1eff1e",
//     "#19ff19", "#14ff14", "#0fff0f", "#0aff0a", "#05ff05", "#00ff00"];
// COLORS.reverse();
// const ORDER = ['電子零組件業', '電機機械', '電器電纜', '電腦及週邊設備業', '半導體業', '其他電子業', '通信網路業', '光電業', '電子通路業', '資訊服務業', '水泥工業', '食品工業', '塑膠工業', '建材營造業', '汽車工業', '其他業', '紡織纖維', '貿易百貨業', '生技醫療業', '化學工業', '玻璃陶瓷', '造紙工業', '鋼鐵工業', '橡膠工業', '航運業', '油電燃氣業', '觀光事業', '金融保險業']
//
//
// const CustomRadio = withStyles({
//     root: {
//         color: '#FFFFFF',
//         '&$checked': {
//             color: '#FFFFFF',
//         },
//     },
//     checked: {},
// })((props) => <Radio size="small" color="default" {...props} />);
//
// function RadioButtons(props) {
//     const [selectedValue, setSelectedValue] = React.useState('ma5');
//
//     const handleChange = (event) => {
//         setSelectedValue(event.target.value);
//         props.setSelectedMA(event.target.value);
//     };
//     return (
//         <div>
//             <FormControlLabel
//                 control={<CustomRadio
//                     checked={selectedValue === 'ma5'}
//                     onChange={handleChange}
//                     value="ma5"
//                     inputProps={{'aria-label': 'A'}}
//                 />
//                 }
//                 label="MA5"
//                 labelPlacement="top"
//             />
//             <FormControlLabel
//                 control={
//                     <CustomRadio
//                         checked={selectedValue === 'ma10'}
//                         onChange={handleChange}
//                         value="ma10"
//                         inputProps={{'aria-label': 'C'}}
//                     />
//                 }
//                 label="MA10"
//                 labelPlacement="top"
//             />
//             <FormControlLabel
//                 control={
//                     <CustomRadio
//                         checked={selectedValue === 'ma20'}
//                         onChange={handleChange}
//                         value="ma20"
//                         inputProps={{'aria-label': 'D'}}
//                     />
//                 }
//                 label="MA20"
//                 labelPlacement="top"
//             />
//             <FormControlLabel
//                 control={
//                     <CustomRadio
//                         checked={selectedValue === 'ma60'}
//                         onChange={handleChange}
//                         value="ma60"
//                         inputProps={{'aria-label': 'E'}}
//                     />
//                 }
//                 label="MA60"
//                 labelPlacement="top"
//             />
//         </div>
//     );
// }
//
//
// const CustomBarLabel = ({payload, x, y, value}) => {
//     return <text x={x} y={y} fill="#FFFFFF" textAnchor="middle" dx={375} dy={14}> {value + '%'}</text>;
// }
// export default function MyComponent(props) {
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [data_tech, setTechData] = useState([]);
//     const [data_trad, setTradData] = useState([]);
//     useEffect(() => {
//
//         fetch("http://127.0.0.1:5000/20210105")
//             .then(res =>
//                 res.json()
//             )
//             .then((result) => {
//                     console.log(result);
//                     // let arr = Object.entries(result).map((e) => ({[e[0]]: e[1]}));
//                     // let arr = Object.keys(result).map(key => {
//                     //     return {
//                     //         "category": key,
//                     //         "breadth": Math.round(result[key]['summary'][props.selectedMA] * 100) / 100
//                     //     };
//                     // });
//                     let arr = ORDER.slice(0, 10).map(key => {
//                         return {
//                             "category": key,
//                             // "breadth": Math.round(result[key]['summary'][props.selectedMA] * 100) / 100
//                             "breadth": parseFloat(result[key]['summary'][props.selectedMA].toFixed(2))
//                         };
//                     });
//                     let arr2 = ORDER.slice(10, -1).map(key => {
//                         return {
//                             "category": key,
//                             // "breadth": Math.round(result[key]['summary'][props.selectedMA] * 100) / 100
//                             "breadth": parseFloat(result[key]['summary'][props.selectedMA].toFixed(2))
//                         };
//                     });
//                     console.log(arr);
//                     setIsLoaded(true);
//                     setTechData(arr);
//                     setTradData(arr2);
//                 },
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             )
//     }, [props.selectedMA]);
//
//     if (error) {
//         return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//         return <div>Loading...</div>;
//     } else {
//         return (
//             <div>
//                 <BarChart
//                     maxBarSize={100}
//                     width={500}
//                     height={300}
//                     data={data_tech}
//                     layout="vertical"
//                     margin={{top: 10, right: 20, left: 20, bottom: 10}}
//                 >
//                     <XAxis type="number" dataKey="breadth" stroke={"white"}
//                            hide={true}
//                            domain={[0, 100]}
//                         // tick={{fontSize: 14, stroke: "white"}}
//                     />
//                     <YAxis type="category" dataKey="category" stroke={"white"}
//                         // tick={{fontSize: 12, stroke: "white", width: 0.01}}
//                     />
//                     <Tooltip/>
//                     {/*<Legend/>*/}
//                     {/*<Bar dataKey="breadth" fill={"#8884d8"} background={{fill: '#dddddd'}}/>*/}
//                     <Bar dataKey="breadth"
//                          fill="#8884d8"
//                          background={{fill: '#333333'}}
//                          label={CustomBarLabel}>
//                         {
//                             data_tech.map((entry, index) => {
//                                 const color = COLORS[Math.round(entry.breadth)];
//                                 return <Cell key={entry} fill={color}/>;
//                             })
//                         }
//                     </Bar>
//                 </BarChart>
//                 <BarChart
//                     width={500}
//                     height={500}
//                     data={data_trad}
//                     layout="vertical"
//                     margin={{top: 10, right: 20, left: 20, bottom: 10}}
//                 >
//                     <XAxis type="number" dataKey="breadth" stroke={"white"}
//                            hide={true}
//                            domain={[0, 100]}
//                         // tick={{fontSize: 14, stroke: "white"}}
//                     />
//                     <YAxis type="category" dataKey="category" stroke={"white"}
//                         // tick={{fontSize: 12, stroke: "white", width: 0.01}}
//                     />
//                     <Tooltip/>
//                     {/*<Legend/>*/}
//                     {/*<Bar dataKey="breadth" fill={"#8884d8"} background={{fill: '#dddddd'}}/>*/}
//                     <Bar
//                         name="category"
//                         dataKey="breadth"
//                         fill="#8884d8"
//                         background={{fill: '#333333'}}
//                         label={CustomBarLabel}>
//                         {
//                             data_trad.map((entry, index) => {
//                                 const color = COLORS[Math.round(entry.breadth)];
//                                 return <Cell key={entry} fill={color}/>;
//                             })
//                         }
//                     </Bar>
//                 </BarChart>
//             </div>
//         );
//     }
// }
//
//
