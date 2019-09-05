import * as React from "react";

interface ITab {
    title: string;
    onClick: () => void;
}

interface ITabsProps {
    tabs: ITab[];
}

export const Tabs: React.FC<ITabsProps> = ({ tabs }) => (
    <div className="tabs">
        {
            tabs.map((tab) => (
                <div key={tab.title} className="tab-item" onClick={tab.onClick}><p>{tab.title}</p></div>
            ))
        }
    </div>
);
