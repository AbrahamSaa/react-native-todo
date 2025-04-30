import AsyncStorage from "@react-native-async-storage/async-storage";
import { Todo } from "../presentation/store/todo";

export const storeData = async (value: Todo[], key: string ) => {

    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(`[Error on saving storage]: ${e}`);
    }
}
export const readData = async (key:string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(`[Error on retrieve storage]: ${e}`);
    }
}