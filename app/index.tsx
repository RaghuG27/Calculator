import React,{useEffect, useState} from "react";
import {View,Text, TouchableOpacity, StyleSheet, StatusBar,SafeAreaView} from "react-native";

import * as NavigationBar from "expo-navigation-bar";

export default function calculator() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000000");
    NavigationBar.setButtonStyleAsync("light");
  }, []);

  const [input,setInput] = useState("");

 const calculate = () => {
  try {
    const expression = input
      .replace(/÷/g, "/")
      .replace(/×/g, "*");

    if (/\/0(\D|$)/.test(expression.replace(/\s/g, ""))) {
      setInput("Undefined");
      return;
    }

    const result = eval(expression);

    if (!isFinite(result)) {
      setInput("Undefined");
      return;
    }

    setInput(result.toString());
  } catch {
    setInput("Error");
  }
};

  const handleButtonPress = (item:any) => {
  switch (item) {
    case "AC":
      setInput("");
      break;

    case "⌫":
      setInput((prev) => prev.slice(0, -1));
      break;

    case "%":
      try {
        setInput((Number(input) / 100).toString());
      } catch {
        setInput("Error");
      }
      break;

    case "±":
      try {
        setInput((Number(input) * -1).toString());
      } catch {
        setInput("Error");
      }
      break;

    case "=":
      calculate();
      break;

    case "÷":
      handlePress("÷");
      break;

    case "×":
      handlePress("×");
      break;

    default:
      handlePress(item);
  }
};

  const handlePress = (value:any) =>{

    setInput((prev)=>prev+value)

  }
  const buttons = [
    ["⌫","AC","%","÷"],
    ["7","8","9","×"],
    ["4","5","6","-"],
    ["1","2","3","+"],
    ["±","0",".","="],
  ];

  const clear = ()=>{
    setInput("")
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
      <StatusBar barStyle="light-content"  />

      <View style={styles.display}>
        <Text
  style={[
    styles.displayText,
    input === "Undefined" && styles.smallDisplayText,
  ]}
>
  {input || "0"}
</Text>
      </View>

      

    {buttons.map((row,rowIndex)=>(

      <View key={rowIndex} style={styles.row}>
        {row.map((item,colIndex)=>(

        <TouchableOpacity key={item} style={[styles.button,
          rowIndex === 0 && styles.topButton,
          colIndex === 3 && styles.operatorButton,
        ]} onPress={()=>handleButtonPress(item)}>
          <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
        ))}
      </View>
      ))}


</View>
    </SafeAreaView>
  )

  
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    backgroundColor:'black',
    justifyContent:"flex-end",
    padding:20,
 
    
    
  },
  display: {
    marginBottom:20,
    alignItems:'flex-end'

    
  },
  displayText: {
    fontSize:80,
    color:'#fff',
    fontWeight:400
   
  },
  smallDisplayText: {
  fontSize: 60,
},
  row: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
     
   
  },
  button: {
    width:85,
    height:85,
    backgroundColor: "#333",
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  
    
  },
  topButton: {
  backgroundColor: "#A5A5A5",
},

operatorButton: {
  backgroundColor: "#FF9500",
},
  clearButton: {
    alignSelf:'flex-end',
    marginBottom:10,
    backgroundColor:'orange'
   
  },
  buttonText: {
    color:'white',
    fontSize:32,
    fontWeight: 400

  },
});