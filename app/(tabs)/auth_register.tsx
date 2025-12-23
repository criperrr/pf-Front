import { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { storeData } from "../../utils/storage";
import { isStringEmpty } from "../../utils/func";

import { User, LoginCredentials, authRegister, authLogin } from "../../utils/api_fetch";

import styles from "../../styles/styles";

export default function Register() {
    const [disabled, setDisabled] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        vrfPass: "",
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
        let isPassDiff = form.password !== form.vrfPass;

        setDisabled(isEmpty || !isEmailCorrect || isPassTooShort || isPassDiff);
    }, [form]);

    const handleSubmit = async () => {
        const { vrfPass, ...register } = form;
        const { name, ...login } = register;
        console.log(JSON.stringify(login));

        try {
            await authRegister(register as User);
            const APIToken = await authLogin(login as LoginCredentials);
            if (!isStringEmpty(APIToken)) {
                //@ts-ignore
                await storeData('TOKEN', APIToken);
                router.replace('/(tabs)/nsac_login')
                return;
            }
            else
                throw new Error('Token is null')
        } catch (error) {
            Alert.alert('Erro ao autenticar');
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={styles.title}>
                    Crie a Conta na API
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.form}>
                <ThemedView style={styles.fieldset}>
                    <ThemedText style={styles.label}>Nome:</ThemedText>
                    <TextInput
                        style={styles.input}
                        autoComplete="name"
                        placeholder="Insira seu nome"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.name}
                        onChangeText={(value) => handleChange("name", value)}
                    />
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
                        placeholder="Insira uma senha (mínimo 8 caracteres)"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.password}
                        onChangeText={(value) => handleChange("password", value)}
                    />
                    <ThemedText style={styles.label}>Confimar Senha:</ThemedText>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Confirma a senha"
                        placeholderTextColor={"#8f8f8fff"}
                        value={form.vrfPass}
                        onChangeText={(value) => handleChange("vrfPass", value)}
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