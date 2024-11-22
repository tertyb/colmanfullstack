import classNames from "classnames";
import React, { useCallback, useMemo } from "react";
import { EneterModes } from "../../../components/utils/enums/login";

interface  IEnterModeOption {
    key: EneterModes
    title: string;
}


interface IProp {
    selected: EneterModes;
    options: IEnterModeOption[];
    onSelect: (mode: string) => void;
}

export const EnterMode: React.FC<IProp> = ({selected, options, onSelect}: IProp) => {
    const onChange = useCallback((option: IEnterModeOption) => onSelect(option.key),[onSelect])
    const tabs = useMemo(() => options.map((option) => <div className={classNames('tab', {'selected':option.key === selected})} onClick={() => onChange(option)}>{option.title}</div>),[options])
    return <div className="enter--mode-tabs">
        {tabs}
    </div>
}