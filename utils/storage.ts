import { createAsyncStorage } from '@react-native-async-storage/async-storage';

const userStorage = createAsyncStorage('user')

export const storeData = async (key: string, value: string) => {
    try {
        await userStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

export const getData = async (key: string) => {
    try {
        const value = await userStorage.getItem(key);
        if (typeof value !== undefined)
            return value;
    } catch (error) {
        console.log(error);
    }
}

export const removeData = async (key: string) => {
    try {
        await userStorage.removeItem(key);
    } catch (error) {
        console.log(error);
    }
}