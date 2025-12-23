import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { LoginCredentials, authLogin } from "../../utils/api_fetch";
import { storeData } from "../../utils/storage";
import { isStringEmpty } from "../../utils/func";

import styles from "../../styles/styles";

export default function Login() {
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
        let isPassTooShort = form.password.length < 8;

        setDisabled(isEmpty || !isEmailCorrect || isPassTooShort);
    }, [form]);

    const handleSubmit = async () => {
        try {
            const APIToken = await authLogin(form as LoginCredentials);
            if (!isStringEmpty(APIToken)) {
                //@ts-ignore
                await storeData('TOKEN', APIToken);
                router.replace('/(tabs)/nsac_login')
                return;
            }
            else
                throw new Error('Token is null')
        } catch (error) {
            Alert.alert('Erro ao autenticar')
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Faça login na API lindo bb
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.fieldset}>
                    <ThemedText style={styles.label}>Email:</ThemedText>
                    <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        autoComplete="email"
                        placeholder="e.g.: nome@exemplo.com"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.email}
                        onChangeText={(value) => handleChange("email", value)}
                    />
                    <ThemedText style={styles.label}>Senha:</ThemedText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="e.g.: senha_forte_da_api"
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
                    <ThemedText type="link" style={{ textAlign: 'center' }}>
                        <Link href='/(tabs)/auth_register' style={{ textDecorationLine: 'underline' }}>
                            Crie uma Conta
                        </Link>
                    </ThemedText>
                </ThemedView>
            </ThemedView>
        </SafeAreaView>
    );
}