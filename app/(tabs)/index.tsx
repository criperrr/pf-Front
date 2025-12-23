import { useEffect, useState } from "react";
import { Platform, TouchableOpacity, FlatList } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getSACGrades } from "../../utils/api_fetch";
import { getData } from "../../utils/storage";
import { isStringEmpty } from "../../utils/func";

import styles from "../../styles/styles";

export default function Home() {
  async function verifyLogin() {
    if (await getData('TOKEN') === null) {
      router.replace('/(tabs)/auth_register')
    }
  }

  const [data, setData] = useState([]);

  async function fetchGrades() {
    const jwtToken = await getData('TOKEN');
    const apiToken = await getData('APITOKEN')

    if ((!isStringEmpty(jwtToken)) && (!isStringEmpty(apiToken))) {
      //@ts-ignore
      const gradesJSON = await getSACGrades(jwtToken, apiToken, 1);
      setData(gradesJSON);
    }
  }

  useEffect(() => {
    verifyLogin();
    fetchGrades();
  }, []);

  const rederItem = ({ item }) => {

  }

  const TableHeader = () => (
    <ThemedView style={[styles.row, styles.header]}>
      <ThemedText style={[styles.cell, styles.headerText]}>Matéria</ThemedText>
      <ThemedText style={[styles.cell, styles.headerText]}>Nota</ThemedText>
    </ThemedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          Notas
        </ThemedText>
        <TableHeader />
        <FlatList
          data={data}
          renderItem={rederItem}
          keyExtractor={item => item.id.toSring()}
        />
      </ThemedView>
      <ThemedView>

      </ThemedView>
    </SafeAreaView>
  );
}