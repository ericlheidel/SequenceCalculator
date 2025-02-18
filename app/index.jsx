import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native"
import { KeyboardAwareScrollView, TextField } from "react-native-ui-lib"
import { Button } from "react-native-paper"
import { useEffect, useState } from "react"
import { Colors } from "./constants/Colors"

export default function Index() {
  const colorScheme = useColorScheme()
  const styles = createStyles(colorScheme)

  const [startingNumber, setStartingNumber] = useState(0)
  const [numberOfTerms, setNumberOfTerms] = useState(0)
  const [commonDifference, setCommonDifference] = useState(0)
  const [total, setTotal] = useState(0)
  const [mathProblem, setMathProblem] = useState("")

  useEffect(() => {
    if (
      startingNumber === 0 ||
      startingNumber === "0" ||
      startingNumber === "" ||
      numberOfTerms === 0 ||
      numberOfTerms === "0" ||
      numberOfTerms === "" ||
      commonDifference === 0 ||
      commonDifference === "0" ||
      commonDifference === ""
    ) {
      setTotal(0)
    } else {
      const start = Number(startingNumber)
      const terms = Number(numberOfTerms)
      const diff = Number(commonDifference)

      if (!isNaN(start) && !isNaN(terms) && !isNaN(diff) && terms > 0) {
        const sum = (terms / 2) * (2 * start + (terms - 1) * diff)
        setTotal(sum)
      } else {
        setTotal(0)
      }
    }
  }, [startingNumber, commonDifference, numberOfTerms])

  const handleMathProblem = () => {
    let text = ""
    for (let i = 0; i < numberOfTerms; i++) {
      const term = startingNumber + i * commonDifference
      text += term
      if (i < numberOfTerms - 1) {
        text += " + "
      }
    }
    setMathProblem(text)
  }

  useEffect(() => {
    handleMathProblem()
  }, [total])

  useEffect(() => {
    Keyboard.dismiss()
  }, [total])

  const clearState = () => {
    setStartingNumber(0)
    setNumberOfTerms(0)
    setCommonDifference(0)
    setTotal(0)
  }

  return (
    <SafeAreaView style={styles.calculatorContainer}>
      <KeyboardAwareScrollView>
        <View style={styles.textFieldView}>
          <TextField
            style={styles.textField}
            containerStyle={{ width: "40%" }}
            placeholder={"Starting #"}
            floatingPlaceholder
            floatingPlaceholderColor={Colors[colorScheme].text}
            floatingPlaceholderStyle={{
              fontSize: 20,
              paddingLeft: 3,
              paddingTop: 2,
              color: "grey",
            }}
            floatOnFocus
            contextMenuHidden
            color={Colors[colorScheme].text}
            keyboardType="decimal-pad"
            returnKeyType={"done"}
            value={startingNumber === 0 ? "" : String(startingNumber)}
            onChangeText={(value) => {
              if (/^(\d+(\.\d*)?)?$/.test(value)) {
                setStartingNumber(value === "" ? 0 : Number(value))
              }
            }}
          />
          <TextField
            style={styles.textField}
            containerStyle={{ width: "40%" }}
            placeholder={"# of Terms"}
            floatingPlaceholder
            floatingPlaceholderColor={Colors[colorScheme].text}
            floatingPlaceholderStyle={{
              fontSize: 20,
              paddingLeft: 3,
              paddingTop: 2,
              color: "grey",
            }}
            floatOnFocus
            contextMenuHidden
            color={Colors[colorScheme].text}
            keyboardType="decimal-pad"
            returnKeyType={"done"}
            value={numberOfTerms === 0 ? "" : String(numberOfTerms)}
            onChangeText={(value) => {
              if (/^(\d+(\.\d*)?)?$/.test(value)) {
                setNumberOfTerms(value === "" ? 0 : Number(value))
              }
            }}
          />
          <TextField
            style={styles.textField}
            containerStyle={{ width: "40%" }}
            placeholder={"Common Diff."}
            floatingPlaceholder
            floatingPlaceholderColor={Colors[colorScheme].text}
            floatingPlaceholderStyle={{
              fontSize: 20,
              paddingLeft: 3,
              paddingTop: 2,
              color: "grey",
            }}
            floatOnFocus
            contextMenuHidden
            color={Colors[colorScheme].text}
            keyboardType="decimal-pad"
            returnKeyType={"done"}
            value={commonDifference === 0 ? "" : String(commonDifference)}
            onChangeText={(value) => {
              if (/^(\d+(\.\d*)?)?$/.test(value)) {
                setCommonDifference(value === "" ? 0 : Number(value))
              }
            }}
          />
          <TextField
            style={styles.textField}
            containerStyle={{ width: "40%" }}
            placeholder={"Total"}
            floatingPlaceholder
            floatingPlaceholderColor={Colors[colorScheme].text}
            floatingPlaceholderStyle={{
              fontSize: 20,
              paddingLeft: 3,
              paddingTop: 2,
              color: "grey",
            }}
            floatOnFocus
            contextMenuHidden
            color={Colors[colorScheme].text}
            keyboardType="decimal-pad"
            returnKeyType={"done"}
            editable={false}
            value={total === 0 ? "" : String(total)}
          />
        </View>
        <View>
          <Button
            style={styles.buttonStyle}
            contentStyle={styles.contentStyle}
            labelStyle={styles.labelStyle}
            buttonColor="#007AFF"
            textColor="#ECEDEE"
            onPress={() => {
              clearState()
            }}
          >
            Clear
          </Button>
        </View>
        <View>
          <Text style={styles.mathProblemText}>{mathProblem}</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const createStyles = (colorScheme) =>
  StyleSheet.create({
    calculatorContainer: {
      flex: 1,
    },
    textFieldView: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      marginTop: 36,
    },
    textField: {
      marginBottom: 30,
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "gray",
      height: 40,
      padding: 8,
      textAlign: "right",
      ...Platform.select({
        ios: {
          fontSize: 26,
        },
        android: {
          fontSize: 20,
        },
      }),
    },
    buttonStyle: {
      width: "25%",
      alignSelf: "center",
      borderRadius: 12,
    },
    contentStyle: {
      height: 44,
    },
    labelStyle: {
      fontSize: 20,
    },
    mathProblemText: {
      marginHorizontal: "auto",
      marginTop: 24,
      fontSize: 24,
    },
  })
