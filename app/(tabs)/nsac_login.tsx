import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginCredentials, nSACLogin } from "../../utils/api_fetch";
import { getData } from "../../utils/storage";

import styles from "../../styles/styles";
import { isStringEmpty } from "@/utils/func";

export default function NSACLogin() {
    const [disabled, setDisabled] = useState(true);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const emailRegex = /[^\s@]+@+[^\s@]+\.+[^\s@]/;

    useEffect(() => {
        //VerifyCredentials
        let isEmpty = Object.values(form).some((value) => value === "");
        let isEmailCorrect = emailRegex.test(form.email);

        setDisabled(isEmpty || !isEmailCorrect);
    }, [form]);

    const handleSubmit = async () => {
        const jwtToken = await getData('TOKEN');
        try {
            if (!isStringEmpty(jwtToken)) {
                //@ts-ignore
                await nSACLogin(jwtToken, form as LoginCredentials)
            }
            else
                throw new Error('Token is null');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Faça login no NSAC
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.fieldset}>
                    <ThemedText style={styles.label}>Email:</ThemedText>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        autoComplete="email"
                        placeholder="e.g.: aluno@nsac.unesp.br"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.email}
                        onChangeText={(value) => handleChange("email", value)}
                    />
                    <ThemedText style={styles.label}>Senha:</ThemedText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="e.g.: senha_do_portal_nsac"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.password}
                        onChangeText={(value) => handleChange("password", value)}
                    />
                    <TouchableOpacity
                        style={[
                            styles.button,
                            disabled ? styles.disabledBtn : styles.enabledBtn,
                        ]}
                        disabled={disabled}
                        onPress={handleSubmit}
                    >
                        <ThemedText style={styles.buttonText}>Enviar</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </SafeAreaView>
    );
}