import * as React from "react";

interface ITab {
    title: string;
    onClick: () => void;
}

interface ITabsProps {
    tabs: ITab[];
}

interface ITabsState { }

export class Tabs extends React.Component<ITabsProps, ITabsState> {

    render() {
        return (
            <div className="tabs">
                {
                    this.props.tabs.map((tab) => (
                        <div key={tab.title} className="tab-item" onClick={tab.onClick}><p>{tab.title}</p></div>
                    ))
                }
            </div>
        );
    }
}