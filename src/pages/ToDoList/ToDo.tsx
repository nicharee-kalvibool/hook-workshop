import WordBox from "@components/WordBox";
// import WordBoxV2 from "@/components/WordBoxV2";
import { useCallback, useState } from "react";
import data_json from "@data/word.json";

export type DataStuct = {
    lang: string;
    word: string;
};

const ToDo = () => {
    const [data, setData] = useState<DataStuct[]>(data_json);

    const [data_word_th, setDataWordTH] = useState<DataStuct[]>([]);
    const [data_word_en, setDataWordEN] = useState<DataStuct[]>([]);

    const fnHandleClickAddItem = (word: string) => {
        let temp = [...data];

        let index = temp.findIndex((item) => item.word == word);
        let temp_item = temp[index];

        temp.splice(index, 1);

        if (temp_item?.lang == "TH") {
            setDataWordTH([...data_word_th, temp_item]);
        } else {
            setDataWordEN([...data_word_en, temp_item]);
        }
        setData(temp);
    };

    const fnHandleClickRemoveTHItem = useCallback(
        (selected: DataStuct) => {
            setDataWordTH((state) => state.filter((item) => item.word != selected.word));
            setData([...data, selected]);
        },
        [data]
    );

    const fnHandleClickRemoveENItem = useCallback(
        (selected: DataStuct) => {
            setDataWordEN((state) => state.filter((item) => item.word != selected.word));
            setData([...data, selected]);
        },
        [data]
    );

    return (
        <div className="flex w-full justify-center min-h-[100vh] p-10 bg-slate-400">
            <div className="flex container max-w-[1024px]">
                <div className="flex w-full flex-col px-5">
                    <WordBox
                        head
                        text="คำศัพท์"
                    />
                    <div className="flex flex-col bg-white bg-opacity-30 rounded-lg p-5 h-full">
                        {data.map((item, key) => (
                            <WordBox
                                key={key}
                                text={item.word}
                                onClick={() => fnHandleClickAddItem(item.word)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex w-full flex-col px-5">
                    <WordBox
                        head
                        text="ภาษาไทย"
                    />
                    <div className="flex flex-col bg-white bg-opacity-30 rounded-lg p-5 h-full">
                        {data_word_th.map((item) => (
                            <WordBox
                                key={`data_word_th_${item.word}`}
                                showLock
                                autoRemove
                                data={item}
                                onClick={() => fnHandleClickRemoveTHItem(item)}
                                // setData={setData}
                                // setDataWord={setDataWordTH}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex w-full flex-col px-5">
                    <WordBox
                        head
                        text="ภาษาอังกฤษ"
                    />
                    <div className="flex flex-col bg-white bg-opacity-30 rounded-lg p-5 h-full">
                        {data_word_en.map((item) => (
                            <WordBox
                                key={`data_word_en_${item.word}`}
                                showLock
                                autoRemove
                                data={item}
                                onClick={() => fnHandleClickRemoveENItem(item)}
                                // setData={setData}
                                // setDataWord={setDataWordEN}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDo;
